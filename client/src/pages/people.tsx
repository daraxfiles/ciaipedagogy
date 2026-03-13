import personEducator1 from "@assets/stock_images/person-educator-1.jpg";
import personEducator2 from "@assets/stock_images/person-educator-2.jpg";
import personResearcher1 from "@assets/stock_images/person-researcher-1.jpg";
import personResearcher2 from "@assets/stock_images/person-researcher-2.jpg";
import personStudent1 from "@assets/stock_images/person-student-1.jpg";
import personStudent2 from "@assets/stock_images/person-student-2.jpg";
import personCommunity1 from "@assets/stock_images/person-community-1.jpg";
import personCommunity2 from "@assets/stock_images/person-community-2.jpg";
import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const photoMap: Record<string, string> = {
  "0-0": personEducator1,
  "0-1": personEducator2,
  "1-0": personResearcher1,
  "1-1": personResearcher2,
  "2-0": personStudent1,
  "2-1": personStudent2,
  "2-2": personStudent1,
  "3-0": personCommunity1,
  "3-1": personCommunity2,
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

const categoryAccents = [
  { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  { bg: "bg-accent/15", text: "text-accent-foreground", dot: "bg-accent" },
  { bg: "bg-chart-3/10", text: "text-chart-3", dot: "bg-chart-3" },
  { bg: "bg-chart-4/10", text: "text-chart-4", dot: "bg-chart-4" },
];

export default function PeoplePage() {
  const { people } = siteConfig;

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Network</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {people.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {people.intro}
        </p>
      </div>

      <Separator />

      {/* Categories */}
      <div className="py-14 sm:py-16 space-y-16">
        {people.categories.map((category, ci) => {
          const accent = categoryAccents[ci % categoryAccents.length];
          return (
            <section key={ci} data-testid={`section-people-${ci}`}>
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Category label */}
                <div className="lg:col-span-1">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md ${accent.bg} mb-3`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                    <span className={`text-xs font-semibold tracking-wider uppercase ${accent.text}`}>{category.label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                </div>

                {/* Members */}
                <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
                  {category.members.map((member, mi) => (
                    <div
                      key={mi}
                      className="flex items-start gap-4 p-5 rounded-lg border border-card-border bg-card hover-elevate"
                      data-testid={`card-person-${ci}-${mi}`}
                    >
                      {photoMap[`${ci}-${mi}`] ? (
                        <img
                          src={photoMap[`${ci}-${mi}`]}
                          alt={member.name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover object-top"
                        />
                      ) : (
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accent.bg} text-sm font-bold ${accent.text} font-serif`}>
                          {initials(member.name)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground leading-snug">{member.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{member.focus}</p>
                        {member.affiliation && (
                          <p className="text-xs text-muted-foreground/70 mt-1">{member.affiliation}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Coming soon placeholder */}
                  <div className="flex items-center gap-4 p-5 rounded-lg border border-dashed border-border/60 bg-transparent">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                      <span className="text-muted-foreground text-lg">+</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">More contributors joining</p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">Network expanding in 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {ci < people.categories.length - 1 && <Separator className="mt-16" />}
            </section>
          );
        })}
      </div>

      <Separator />

      {/* Join CTA */}
      <section className="py-14 sm:py-16" data-testid="section-people-cta">
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-10 sm:px-10">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            Join the Network
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-6 max-w-xl">
            We're always looking for researchers, educators, graduate students, and community
            partners who share our commitment to critical, equity-centered work on AI and education.
            Whether you want to collaborate on a study or join a working group, reach out.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/collaborate">
              <Button data-testid="button-people-collaborate">
                Collaborate With Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" data-testid="button-people-contact">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
