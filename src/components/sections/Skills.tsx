import { useEffect, useRef, useState } from "react";
import { Code2, Server, Database, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

type Skill = { name: string; level: number };

const Skills = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const groups: { icon: typeof Code2; title: string; items: Skill[] }[] = [
    {
      icon: Code2,
      title: t("skills.frontend"),
      items: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Tailwind", level: 90 },
        { name: "Bootstrap 5", level: 85 },
      ],
    },
    {
      icon: Server,
      title: t("skills.backend"),
      items: [
        { name: "PHP", level: 85 },
        { name: "Laravel", level: 85 },
        { name: "ASP.NET", level: 75 },
        { name: "REST APIs", level: 85 },
      ],
    },
    {
      icon: Database,
      title: t("skills.databaseCloud"),
      items: [
        { name: "MySQL", level: 85 },
        { name: "MSSQL", level: 80 },
        { name: "Docker", level: 70 },
        { name: "CI/CD", level: 65 },
        { name: "Docker", level: 80},
      ],
    },
    {
      icon: Palette,
      title: t("skills.toolsDesign"),
      items: [
        { name: "Figma", level: 90 },
        { name: "Postman", level: 70 },
        { name: "Git", level: 90 },
        { name: "GitHub", level: 90 },
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-24 bg-gradient-subtle">
      <div className="container">
        <SectionHeading title={t("skills.title")} number="02" align="center" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {groups.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="group p-5 rounded-xl bg-card border border-border shadow-soft hover:shadow-glow hover:-translate-y-1 transition-smooth"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="inline-flex p-2 rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-smooth">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-semibold">{title}</h3>
              </div>

              <ul className="space-y-3">
                {items.map((skill, i) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-semibold text-muted-foreground tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
                        style={{
                          width: visible ? `${skill.level}%` : "0%",
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
