import { Separator } from "@/components/ui/separator";

export default function EthicsPage() {
  return (
    <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
          Policies
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Ethics &amp; Transparency
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          At Critical Innovation &amp; AI Pedagogy, we are committed to advancing research and
          practice in ways that are ethical, responsible, and transparent. Our work is grounded in
          the belief that emerging technologies must be developed and used in ways that prioritize
          human well-being, equity, and accountability.
        </p>

        <Separator className="my-10" />

        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">We strive to:</h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Center human agency and dignity</h3>
            <p className="text-muted-foreground leading-relaxed">
              We design and study AI in ways that support, rather than replace, human judgment,
              creativity, and decision-making.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Promote transparency in AI use</h3>
            <p className="text-muted-foreground leading-relaxed">
              We encourage clear disclosure of when and how AI tools are used in research, teaching,
              and learning. We actively challenge practices such as undisclosed AI use ("AI
              smuggling") that obscure authorship and accountability.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Foster critical AI literacy</h3>
            <p className="text-muted-foreground leading-relaxed">
              We equip learners and educators to question, interpret, and evaluate AI-generated
              content, including its limitations, biases, and potential harms.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Address bias and inequity</h3>
            <p className="text-muted-foreground leading-relaxed">
              We critically examine how AI systems can reproduce or amplify existing inequalities,
              and we prioritize inclusive, accessible, and low-resource approaches to AI education.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Ensure research integrity</h3>
            <p className="text-muted-foreground leading-relaxed">
              All research activities follow established ethical guidelines, including informed
              consent, data protection, and responsible reporting of findings.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Engage in open and reflective practice
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We share our methods, tools, and insights openly whenever possible, and we
              continuously reflect on the ethical implications of our work.
            </p>
          </div>
        </div>

        <Separator className="my-10" />

        <p className="text-muted-foreground leading-relaxed italic">
          Ethics is not an afterthought in our work — it is a central design principle that guides
          how we research, teach, and innovate.
        </p>
      </div>
  );
}
