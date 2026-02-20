import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, GraduationCap, Handshake, Building2 } from "lucide-react";

const categoryIcons = [Users, Handshake, GraduationCap, Building2];

export default function CollaboratePage() {
  const { collaborate } = siteConfig;

  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {collaborate.headline}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {collaborate.subtext}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {collaborate.categories.map((cat, i) => {
          const Icon = categoryIcons[i] || Users;
          return (
            <Card key={i} className="hover-elevate flex flex-col" data-testid={`card-collab-${i}`}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="font-serif text-lg">{cat.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {cat.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <ul className="space-y-2">
                  {cat.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
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
