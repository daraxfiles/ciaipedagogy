import { siteConfig } from "@/content/site";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Presentation, FileText, Briefcase, Newspaper } from "lucide-react";

const categoryIcons = [BookOpen, Presentation, FileText, Briefcase, Newspaper];

export default function PublicationsPage() {
  const { publications } = siteConfig;

  return (
    <div className="space-y-16 sm:space-y-20">
      {publications.categories.map((category, ci) => {
        const Icon = categoryIcons[ci] || BookOpen;
        return (
          <section key={ci} data-testid={`section-pub-category-${ci}`}>
            {ci > 0 && <Separator className="mb-16 sm:mb-20" />}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                {category.title}
              </h2>
            </div>
            <div className="max-w-3xl space-y-0">
              {category.items.map((pub, i) => (
                <div key={i}>
                  <div className="py-5" data-testid={`publication-${ci}-${i}`}>
                    <h3 className="font-serif text-base font-semibold text-foreground leading-snug">
                      {pub.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-accent-foreground">
                      {pub.venue}
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {pub.description}
                    </p>
                  </div>
                  {i < category.items.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
