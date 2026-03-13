import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Send, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const collaborateFormSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Valid email required"),
  organization: z.string().min(1, "Organization required"),
  subject: z.string().min(1, "Please select a collaboration type"),
  message: z.string().min(20, "Please describe your interest in at least 20 characters"),
  website: z.string().optional(), // honeypot — must stay empty
});

const COLLAB_TYPES = [
  "Research Partnership",
  "Curriculum Co-Design",
  "Tool Development",
  "Graduate Research",
  "Community Partnership",
  "Media & Communications",
  "Other",
];

export default function CollaboratePage() {
  const { collaborate } = siteConfig;
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof collaborateFormSchema>>({
    resolver: zodResolver(collaborateFormSchema),
    defaultValues: { name: "", email: "", organization: "", subject: "", message: "", website: "" },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: z.infer<typeof collaborateFormSchema>) => {
      await apiRequest("POST", "/api/submissions", { ...data, type: "collaborate" });
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: err.message.replace(/^\d+:\s*/, ""),
      });
    },
  });

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Get Involved</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {collaborate.headline}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {collaborate.subtext}
        </p>
      </div>

      {/* Pathways */}
      <div className="grid md:grid-cols-2 gap-6 mb-14">
        {collaborate.categories.map((cat, i) => (
          <Card key={i} className="hover-elevate flex flex-col border-card-border" data-testid={`card-collab-${i}`}>
            <CardHeader>
              <CardTitle className="font-serif text-lg">{cat.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed mt-2">{cat.text}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <ul className="space-y-2">
                {cat.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-14 sm:my-16" />

      {/* Collaboration inquiry form */}
      <section data-testid="section-collaborate-form">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Collaboration Inquiry</p>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Start a Conversation</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Tell us about your interest and how you&apos;d like to work together. We respond to all inquiries within one week.
          </p>

          {submitted ? (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center" data-testid="message-collab-success">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <p className="font-serif text-lg font-semibold text-foreground mb-2">Inquiry Received</p>
              <p className="text-sm text-muted-foreground">
                Thank you for your interest in collaborating. A member of our team will be in touch within one week.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-5"
                onClick={() => setSubmitted(false)}
              >
                Submit another inquiry
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit((d) => submitMutation.mutate(d))} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. Jane Smith" data-testid="input-collab-name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@institution.edu" data-testid="input-collab-email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization / Institution</FormLabel>
                      <FormControl>
                        <Input placeholder="University, school, NGO, company..." data-testid="input-collab-org" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collaboration Type</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger data-testid="select-collab-type">
                            <SelectValue placeholder="Select a pathway..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COLLAB_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us about your interest</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Describe your goals, your context, and what you hope to explore together..."
                          data-testid="input-collab-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Honeypot — visually hidden, filled by bots only */}
                <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
                  <label htmlFor="hp-website-collab">Website</label>
                  <input id="hp-website-collab" {...form.register("website")} type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  data-testid="button-collab-submit"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {submitMutation.isPending ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </section>
    </div>
  );
}
