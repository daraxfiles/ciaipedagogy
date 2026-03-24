import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
          Policies
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          At Critical Innovation &amp; AI Pedagogy, we respect your privacy and are committed to
          protecting your personal information.
        </p>

        <Separator className="my-10" />

        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may collect limited personal information when you:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Contact us via forms or email</li>
              <li>Subscribe to updates or newsletters</li>
              <li>Participate in research studies or events</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This information may include your name, email address, institutional affiliation, and
              any information you choose to share.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Respond to inquiries and communicate with you</li>
              <li>Share updates about our research, projects, or events</li>
              <li>Conduct research activities (with appropriate consent)</li>
              <li>Improve our website and resources</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not sell, trade, or rent your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Research Participation
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you participate in a research study:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                You will be provided with clear information about the study's purpose, procedures,
                and data use
              </li>
              <li>Your participation will be voluntary</li>
              <li>
                Data will be handled in accordance with institutional review board (IRB) and ethical
                research guidelines
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take reasonable measures to protect your information from unauthorized access, loss,
              or misuse. However, no online system is completely secure.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Third-Party Tools
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use third-party services (e.g., analytics tools, embedded content).
              These services may collect limited data according to their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You may:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of communications at any time</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this policy or how your data is used, please{" "}
              <a
                href="/contact"
                className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
  );
}
