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
        <SectionHeading title={t("experience.title")} number="03" align="left" />

        <div className="relative mt-14 max-w-3xl mx-auto">
          <div className="absolute left-3 md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-1/2" aria-hidden />
          <ul className="space-y-10">
            {items.map((item, i) => (
              <li
                key={i}
                className={`relative grid md:grid-cols-2 gap-4 md:gap-10 pl-10 md:pl-0 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className="absolute left-0 md:left-1/2 top-2 h-6 w-6 rounded-full bg-background border-2 border-primary md:-translate-x-1/2 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className={`md:text-right ${i % 2 === 0 ? "" : "md:text-left"}`}>
                  <p className="text-sm font-medium text-primary-glow">{item.date}</p>
                  <h3 className="font-display text-xl font-semibold mt-1">{item.role}</h3>
                  <p className="text-muted-foreground">{item.company}</p>
                </div>
                <div className={`p-5 rounded-xl bg-card border border-border shadow-soft ${i % 2 === 0 ? "" : "md:text-right"}`}>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
