import { Code2, Server, Database, Layers, Smartphone, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const About = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Code2,
      title: t("about.frontend"),
      desc: "Building responsive, accessible user interfaces with modern frameworks and pixel-perfect design systems.",
    },
    {
      icon: Server,
      title: t("about.backend"),
      desc: "Designing robust APIs, microservices, and server-side applications that scale with business needs.",
    },
    {
      icon: Database,
      title: t("about.database"),
      desc: "Modeling data, optimizing queries, and managing relational and NoSQL databases for peak performance.",
    },
    {
      icon: Smartphone,
      title: "Mobile",
      desc: "Crafting cross-platform mobile experiences with React Native for iOS and Android from a single codebase.",
    },
    {
      icon: Globe,
      title: "DevOps",
      desc: "Containerizing applications with Docker, managing CI/CD pipelines, and deploying to production reliably.",
    },
    {
      icon: Layers,
      title: "Architecture",
      desc: "Designing scalable system architectures, integrating third-party services, and maintaining code quality.",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container max-w-5xl">
        <SectionHeading title={t("about.title")} number="01" />

        <div className="mt-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-5 text-[17px] leading-[1.75] text-muted-foreground">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-xl border border-border bg-card p-5 transition-smooth hover:border-primary/25 hover:shadow-[0_12px_40px_-12px_hsl(var(--glow)/0.1)]"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.08] text-primary mb-4">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <h3 className="text-[17px] font-semibold mb-1.5">{title}</h3>
                <p className="text-[15px] leading-[1.65] text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
