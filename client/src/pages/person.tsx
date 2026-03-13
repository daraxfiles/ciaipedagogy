import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Linkedin, BookOpen, ArrowLeft, Mail } from "lucide-react";
import type { User } from "@shared/schema";

type PublicMember = Omit<User, "passwordHash">;

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function PersonPage() {
  const [, params] = useRoute("/people/:username");
  const username = params?.username ?? "";

  const { data: member, isLoading, isError } = useQuery<PublicMember>({
    queryKey: ["/api/members", username],
    queryFn: async () => {
      const res = await fetch(`/api/members/${username}`);
      if (!res.ok) throw new Error("Member not found");
      return res.json();
    },
    enabled: !!username,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground text-sm">Loading profile...</p>
      </div>
    );
  }

  if (isError || !member) {
    return (
      <div className="max-w-xl">
        <Link href="/people">
          <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back to People
          </Button>
        </Link>
        <p className="font-serif text-2xl font-bold text-foreground mb-3">Profile not found</p>
        <p className="text-muted-foreground text-sm">
          This member profile either doesn't exist or isn't publicly visible.
        </p>
      </div>
    );
  }

  const hasLinks = member.websiteUrl || member.linkedinUrl || member.scholarUrl;

  return (
    <div className="max-w-3xl">
      <Link href="/people">
        <Button variant="ghost" size="sm" className="mb-10 -ml-2 text-muted-foreground" data-testid="button-back-people">
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back to People
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start gap-6 mb-10">
        {member.profileImageUrl ? (
          <img
            src={member.profileImageUrl}
            alt={member.displayName}
            className="h-20 w-20 shrink-0 rounded-full object-cover object-top border border-card-border"
            data-testid="img-profile"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold font-serif text-primary">
            {initials(member.displayName)}
          </div>
        )}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Member Profile</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight" data-testid="text-display-name">
            {member.displayName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1" data-testid="text-username">@{member.username}</p>
          {member.affiliation && (
            <p className="text-sm text-foreground/70 mt-1.5 font-medium" data-testid="text-affiliation">{member.affiliation}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="no-default-active-elevate capitalize">{member.role}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      <div className="py-10 space-y-10">

        {/* Bio */}
        {member.bio && (
          <section data-testid="section-bio">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">About</p>
            <p className="text-base leading-relaxed text-foreground/80">{member.bio}</p>
          </section>
        )}

        {/* Research Interests */}
        {member.researchInterests && (
          <section data-testid="section-research-interests">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Research Interests</p>
            <p className="text-base leading-relaxed text-foreground/80">{member.researchInterests}</p>
          </section>
        )}

        {/* Links */}
        {hasLinks && (
          <section data-testid="section-links">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Links</p>
            <div className="flex flex-wrap gap-3">
              {member.websiteUrl && (
                <a
                  href={member.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-website"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="h-3.5 w-3.5" /> Website
                  </Button>
                </a>
              )}
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-linkedin"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </Button>
                </a>
              )}
              {member.scholarUrl && (
                <a
                  href={member.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-scholar"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <BookOpen className="h-3.5 w-3.5" /> Google Scholar
                  </Button>
                </a>
              )}
            </div>
          </section>
        )}
      </div>

      <Separator />

      <div className="pt-10">
        <Link href="/collaborate">
          <Button data-testid="button-collaborate-profile">
            <Mail className="h-4 w-4 mr-2" /> Get in Touch
          </Button>
        </Link>
      </div>
    </div>
  );
}
