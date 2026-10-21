import { useEffect, useRef, useState } from "react";
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

  const groups: { title: string; items: Skill[] }[] = [
    {
      title: t("skills.frontend"),
      items: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 85 },
        { name: "React Native", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Bootstrap 5", level: 85 },
      ],
    },
    {
      title: t("skills.backend"),
      items: [
        { name: "PHP", level: 85 },
        { name: "Laravel", level: 85 },
        { name: "ASP.NET", level: 75 },
        { name: "REST APIs", level: 85 },
        { name: "Microservices", level: 80 },
      ],
    },
    {
      title: t("skills.databaseCloud"),
      items: [
        { name: "MySQL", level: 85 },
        { name: "MSSQL", level: 80 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "Docker", level: 80 },
        { name: "CI/CD", level: 65 },
      ],
    },
    {
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
    <section ref={sectionRef} id="skills" className="section-padding">
      <div className="container">
        <SectionHeading title={t("skills.title")} number="02" />

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {groups.map(({ title, items }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 md:p-7 transition-smooth hover:shadow-soft"
            >
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-foreground mb-6">
                {title}
              </h3>

              <ul className="space-y-4">
                {items.map((skill, i) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-[12px] font-semibold text-muted-foreground tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden bg-secondary rounded-full">
                      <div
                        className="h-full bg-primary rounded-full transition-[width] duration-1000 ease-out"
                        style={{
                          width: visible ? `${skill.level}%` : "0%",
                          transitionDelay: `${i * 80}ms`,
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
