import { siteConfig } from "@/content/site";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Presentation, FileText, Briefcase, Newspaper } from "lucide-react";

const categoryIcons = [BookOpen, Presentation, FileText, Briefcase, Newspaper];

export default function PublicationsPage() {
  const { publications } = siteConfig;

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Scholarship</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {publications.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          Peer-reviewed research, conference presentations, working papers, policy briefs, and
          public scholarship from the Critical Innovation & AI Pedagogy network.
        </p>
      </div>

      <div className="space-y-0">
        {publications.categories.map((category, ci) => {
          const Icon = categoryIcons[ci] || BookOpen;
          return (
            <section key={ci} data-testid={`section-pub-category-${ci}`}>
              {ci > 0 && <Separator className="my-14 sm:my-16" />}
              <div className="grid lg:grid-cols-4 gap-10">
                <div className="lg:col-span-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-foreground">{category.title}</h2>
                </div>
                <div className="lg:col-span-3 divide-y divide-border">
                  {category.items.map((pub, i) => (
                    <div key={i} className="py-5 first:pt-0" data-testid={`publication-${ci}-${i}`}>
                      <h3 className="font-serif text-base font-semibold text-foreground leading-snug mb-1">
                        {pub.title}
                      </h3>
                      <p className="text-xs font-semibold text-accent-foreground mb-2">{pub.venue}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pub.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
}
