import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const Experience = () => {
  const { t } = useLanguage();

  const items = [
    {
      role: t("experience.role1"),
      company: t("experience.company1"),
      date: t("experience.date1"),
      desc: t("experience.desc1"),
      tags: ["ASP.NET", "Laravel", "React.js", "REST APIs", "CI/CD"],
    },
    {
      role: t("experience.role2"),
      company: t("experience.company2"),
      date: t("experience.date2"),
      desc: t("experience.desc2"),
      tags: ["PHP", "Laravel", "React.js", "MySQL", "REST APIs"],
    },
    {
      role: t("experience.role3"),
      company: t("experience.company3"),
      date: t("experience.date3"),
      desc: t("experience.desc3"),
      tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    },
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="container max-w-4xl">
        <SectionHeading title={t("experience.title")} number="03" />

        <div className="mt-12">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-[13px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-border to-transparent" />

            <div className="space-y-6">
              {items.map((item, i) => {
                const lines = item.desc.split("\n").map((l) => l.trim()).filter(Boolean);
                const bullets = lines
                  .filter((l) => l.startsWith("▹"))
                  .map((l) => l.replace(/^▹\s*/, ""));

                return (
                  <div key={i} className="relative pl-8 md:pl-10">
                    {/* Timeline node */}
                    <div className="absolute left-0 md:left-[4px] top-5 h-[18px] w-[18px] rounded-full border-2 border-primary bg-background flex items-center justify-center">
                      <Briefcase className="h-2.5 w-2.5 text-primary" />
                    </div>

                    <div className="rounded-xl border border-border bg-card p-5 transition-smooth hover:border-primary/20 hover:shadow-[0_12px_40px_-12px_hsl(var(--glow)/0.08)]">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{item.role}</h3>
                          <p className="text-[14px] text-muted-foreground">{item.company}</p>
                        </div>
                        <span className="font-mono text-[14px] font-medium tracking-wide text-primary shrink-0">
                          {item.date}
                        </span>
                      </div>

                      {bullets.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {bullets.map((b, bi) => (
                            <li key={bi} className="flex gap-2 text-[15px] text-muted-foreground leading-relaxed">
                              <span className="text-primary/60 mt-1 shrink-0">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-border bg-secondary/50 px-2 py-0.5 text-[13px] font-mono text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
