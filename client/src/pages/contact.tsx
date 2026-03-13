import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  const { contact } = siteConfig;

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

      <div className="grid md:grid-cols-3 gap-6">
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
  );
}
