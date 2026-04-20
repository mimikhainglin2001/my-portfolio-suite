import { Code2, Server, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const Skills = () => {
  const { t } = useLanguage();

  const groups = [
    {
      icon: Code2,
      title: t("skills.frontend"),
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "Framer Motion"],
    },
    {
      icon: Server,
      title: t("skills.backend"),
      items: ["Node.js", "PostgreSQL", "REST APIs", "GraphQL", "Supabase", "Docker"],
    },
    {
      icon: Palette,
      title: t("skills.tools"),
      items: ["Figma", "Git", "Vitest", "CI/CD", "Linear", "Notion"],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-gradient-subtle">
      <div className="container">
        <SectionHeading eyebrow={t("skills.subtitle")} title={t("skills.title")} />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {groups.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="group p-7 rounded-2xl bg-card border border-border shadow-soft hover:shadow-glow hover:-translate-y-1 transition-smooth"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary text-primary-foreground mb-5 group-hover:scale-110 transition-smooth">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
