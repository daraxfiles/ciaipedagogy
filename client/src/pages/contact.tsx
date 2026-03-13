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
import { Separator } from "@/components/ui/separator";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(1, "Subject required"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

export default function ContactPage() {
  const { contact } = siteConfig;
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      await apiRequest("POST", "/api/submissions", { ...data, type: "contact" });
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
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Reach Out</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {contact.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {contact.description}
        </p>
      </div>

      {/* Contact form */}
      <section className="mb-14" data-testid="section-contact-form">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Send a Message</p>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Get in Touch</h2>

            {submitted ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center" data-testid="message-contact-success">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <p className="font-serif text-lg font-semibold text-foreground mb-2">Message Received</p>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. We will get back to you within 2&ndash;3 business days.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
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
                            <Input placeholder="Dr. Jane Smith" data-testid="input-contact-name" {...field} />
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
                            <Input type="email" placeholder="you@institution.edu" data-testid="input-contact-email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Research inquiry, partnership, media..." data-testid="input-contact-subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Tell us about your interest or inquiry..."
                            data-testid="input-contact-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    data-testid="button-contact-submit"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {submitMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          <div className="space-y-4">
            {contact.categories.map((cat, i) => (
              <Card key={i} className="hover-elevate flex flex-col border-card-border" data-testid={`card-contact-${i}`}>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">{cat.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">{cat.text}</CardDescription>
                </CardHeader>
                {cat.email && (
                  <CardContent className="mt-auto pt-0">
                    <a
                      href={`mailto:${cat.email}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      data-testid={`link-email-${i}`}
                    >
                      <Mail className="mr-1.5 h-3.5 w-3.5" />
                      {cat.email}
                    </a>
                  </CardContent>
                )}
                {!cat.email && cat.title === "Newsletter Signup" && (
                  <CardContent className="mt-auto pt-0">
                    <Button size="sm" data-testid="button-subscribe">
                      <Send className="mr-2 h-3.5 w-3.5" />
                      Subscribe to Newsletter
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
