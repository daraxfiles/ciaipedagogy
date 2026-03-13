import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, GraduationCap, Handshake, Building2 } from "lucide-react";

const categoryIcons = [Users, Handshake, GraduationCap, Building2];

export default function CollaboratePage() {
  const { collaborate } = siteConfig;

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

      <div className="grid md:grid-cols-2 gap-6">
        {collaborate.categories.map((cat, i) => {
          const Icon = categoryIcons[i] || Users;
          return (
            <Card key={i} className="hover-elevate flex flex-col border-card-border" data-testid={`card-collab-${i}`}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="font-serif text-lg">{cat.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{cat.text}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <ul className="space-y-2">
                  {cat.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
