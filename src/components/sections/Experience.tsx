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
    },
    {
      role: t("experience.role2"),
      company: t("experience.company2"),
      date: t("experience.date2"),
      desc: t("experience.desc2"),
    },
    {
      role: t("experience.role3"),
      company: t("experience.company3"),
      date: t("experience.date3"),
      desc: t("experience.desc3"),
    },
  ];

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container">
        <SectionHeading title={t("experience.title")} number="03" align="center" />

        <div className="mt-16 max-w-4xl mx-auto">
          <ol className="divide-y divide-border border-y border-border">
            {items.map((item, i) => {
              const lines = item.desc.split("\n").map((l) => l.trim()).filter(Boolean);
              const lead = lines[0]?.startsWith("▹") ? null : lines[0];
              const bullets = lines
                .filter((l) => l.startsWith("▹"))
                .map((l) => l.replace(/^▹\s*/, ""));
              return (
                <li key={i} className="group grid md:grid-cols-[180px_1fr] gap-4 md:gap-10 py-8 transition-colors hover:bg-secondary/30 px-2 md:px-4 -mx-2 md:-mx-4 rounded-lg">
                  <div className="md:pt-1">
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary-glow">
                      {item.date}
                    </div>
                    <div className="mt-2 h-px w-10 bg-primary/60 group-hover:w-16 transition-all" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight">
                      {item.role}
                      <span className="text-primary"> @ {item.company}</span>
                    </h3>
                    {lead && (
                      <p className="mt-3 text-muted-foreground leading-relaxed">{lead}</p>
                    )}
                    {bullets.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3 text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
