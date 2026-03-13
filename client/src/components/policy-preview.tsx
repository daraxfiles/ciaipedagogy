import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Copy } from "lucide-react";

interface PolicyPreviewProps {
  policyText: string;
  onCopy: () => void;
  isComplete: boolean;
}

export default function PolicyPreview({ policyText, onCopy, isComplete }: PolicyPreviewProps) {
  const hasContent = policyText && !policyText.includes("Select policy components");

  return (
    <Card className="sticky top-24 border-card-border" data-testid="card-policy-preview">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base font-semibold">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            Live Preview
          </div>
          <Button
            size="sm"
            onClick={onCopy}
            disabled={!isComplete}
            className="h-7 text-xs"
            data-testid="button-copy-policy"
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          className="bg-muted/40 border border-border rounded-lg p-4 text-xs font-mono whitespace-pre-wrap min-h-80 max-h-96 overflow-y-auto leading-relaxed text-foreground"
          data-testid="text-policy-preview"
        >
          {hasContent ? (
            policyText
          ) : (
            <span className="text-muted-foreground italic leading-loose">
              {`Select policy components to see your AI policy preview here.\n\nYour policy will include:\n• Course information\n• Selected AI use guidelines\n• Academic integrity requirements\n• Privacy protections\n• Consequence frameworks\n\nStart by selecting options above.`}
            </span>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
          <Eye className="h-3 w-3" />
          Policy updates automatically as you make selections
        </p>
      </CardContent>
    </Card>
  );
}
