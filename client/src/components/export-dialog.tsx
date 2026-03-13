import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, Copy } from "lucide-react";
import { exportToMarkdown, exportToText, copyFormattedPolicy } from "@/lib/export-utils";
import { useToast } from "@/hooks/use-toast";

interface ExportDialogProps {
  policyText: string;
  isDisabled: boolean;
}

export default function ExportDialog({ policyText, isDisabled }: ExportDialogProps) {
  const [courseName, setCourseName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleExportMarkdown = () => {
    exportToMarkdown(policyText, courseName, instructorName);
    toast({ title: "Policy exported!", description: "Downloaded as a Markdown file." });
    setIsOpen(false);
  };

  const handleExportText = () => {
    exportToText(policyText, courseName, instructorName);
    toast({ title: "Policy exported!", description: "Downloaded as a text file." });
    setIsOpen(false);
  };

  const handleCopyFormatted = async () => {
    const formatted = copyFormattedPolicy(policyText, courseName, instructorName);
    try {
      await navigator.clipboard.writeText(formatted);
      toast({ title: "Policy copied!", description: "The formatted policy has been copied to your clipboard." });
    } catch {
      console.error('Failed to copy policy');
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={isDisabled} data-testid="button-export">
          <Download className="h-4 w-4 mr-1.5" />
          Export Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="dialog-export">
        <DialogHeader>
          <DialogTitle className="font-serif">Export AI Policy</DialogTitle>
          <DialogDescription>
            Add optional course details, then download or copy your customized policy.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="course-name">Course Name (optional)</Label>
            <Input
              id="course-name"
              placeholder="e.g., EDUC 501 — Critical AI Pedagogy"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              data-testid="input-course-name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instructor-name">Instructor Name (optional)</Label>
            <Input
              id="instructor-name"
              placeholder="e.g., Dr. Jane Smith"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              data-testid="input-instructor-name"
            />
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Button onClick={handleCopyFormatted} variant="outline" className="w-full" data-testid="button-copy-formatted">
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </Button>
            <Button onClick={handleExportMarkdown} variant="outline" className="w-full" data-testid="button-export-markdown">
              <FileText className="h-4 w-4 mr-2" />
              Download as Markdown
            </Button>
            <Button onClick={handleExportText} variant="outline" className="w-full" data-testid="button-export-text">
              <Download className="h-4 w-4 mr-2" />
              Download as Text
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
