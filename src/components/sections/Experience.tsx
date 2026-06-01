import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import { Briefcase } from "lucide-react";

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

        <div className="relative mt-16 max-w-3xl mx-auto">
          <div
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
            aria-hidden
          />
          <ul className="space-y-8">
            {items.map((item, i) => {
              const lines = item.desc.split("\n").map((l) => l.trim()).filter(Boolean);
              const lead = lines[0]?.startsWith("▹") ? null : lines[0];
              const bullets = lines
                .filter((l) => l.startsWith("▹"))
                .map((l) => l.replace(/^▹\s*/, ""));
              return (
                <li key={i} className="relative pl-14">
                  <div className="absolute left-0 top-3 h-9 w-9 rounded-full bg-card border border-primary/40 shadow-soft flex items-center justify-center ring-4 ring-background">
                    <Briefcase className="h-4 w-4 text-primary" aria-hidden />
                  </div>
                  <article className="group p-6 md:p-7 rounded-2xl bg-card border border-border shadow-soft transition-all hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight">
                        {item.role}
                        <span className="text-primary"> @ {item.company}</span>
                      </h3>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-primary-glow px-2.5 py-1 rounded-full border border-border bg-background/50">
                        {item.date}
                      </span>
                    </div>
                    {lead && (
                      <p className="mt-4 text-muted-foreground leading-relaxed">{lead}</p>
                    )}
                    {bullets.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3 text-muted-foreground leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
