import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Newspaper, Send } from "lucide-react";

const categoryIcons = [Mail, Newspaper, Send];

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {contact.title}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {contact.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {contact.categories.map((cat, i) => {
          const Icon = categoryIcons[i] || Mail;
          return (
            <Card key={i} className="hover-elevate flex flex-col" data-testid={`card-contact-${i}`}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="font-serif text-lg">{cat.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {cat.text}
                </CardDescription>
              </CardHeader>
              {cat.email && (
                <CardContent className="mt-auto pt-0">
                  <a
                    href={`mailto:${cat.email}`}
                    className="inline-flex items-center text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
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
                    Subscribe
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
