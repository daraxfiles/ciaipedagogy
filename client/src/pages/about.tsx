import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Target, Lightbulb, Compass, Users, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const { about } = siteConfig;

  return (
    <div className="space-y-16 sm:space-y-24">
      <section data-testid="section-mission">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {about.mission.title}
          </h2>
        </div>
        <div className="max-w-3xl space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            {about.mission.text}
          </p>
          <blockquote className="border-l-2 border-accent pl-4 italic text-sm text-muted-foreground">
            {about.mission.vision}
          </blockquote>
        </div>
      </section>

      <Separator />

      <section data-testid="section-why-critical">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20">
            <Lightbulb className="h-5 w-5 text-accent-foreground" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {about.whyCritical.title}
          </h2>
        </div>
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-muted-foreground mb-6">
            {about.whyCritical.text}
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {about.whyCritical.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Separator />

      <section data-testid="section-approach">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {about.approach.title}
          </h2>
        </div>
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-muted-foreground mb-6">
            {about.approach.text}
          </p>
          <div className="flex flex-wrap gap-2">
            {about.approach.methods.map((method, i) => (
              <Badge key={i} variant="secondary" className="no-default-active-elevate">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section data-testid="section-people">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20">
            <Users className="h-5 w-5 text-accent-foreground" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {about.people.title}
          </h2>
        </div>
        <p className="text-base text-muted-foreground mb-8 max-w-3xl">
          {about.people.description}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {about.people.members.map((member, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-person-${i}`}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground mb-2">
                  {member.name.split(" ").map(w => w[0]).join("")}
                </div>
                <CardTitle className="text-base">{member.name}</CardTitle>
                <CardDescription className="text-xs font-medium text-accent-foreground">
                  {member.role}
                </CardDescription>
                <CardDescription className="text-xs mt-1">
                  {member.area}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
