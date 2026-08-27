import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const WhyMe = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      title: t("whyme.r1.title"),
      desc: t("whyme.r1.desc"),
    },
    {
      title: t("whyme.r2.title"),
      desc: t("whyme.r2.desc"),
    },
    {
      title: t("whyme.r3.title"),
      desc: t("whyme.r3.desc"),
    },
  ];

  return (
    <section id="whyme" className="section-padding">
      <div className="container">
        <SectionHeading title={t("whyme.title")} number="04" />

        <p className="mt-6 text-center text-[17px] text-muted-foreground max-w-2xl mx-auto">
          {t("whyme.subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {reasons.map(({ title, desc }, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 transition-smooth hover:border-primary/20 hover:shadow-[0_12px_40px_-12px_hsl(var(--glow)/0.08)]"
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.08] text-primary font-display font-bold text-[15px] mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[17px] font-semibold mb-2">{title}</h3>
              <p className="text-[15px] leading-[1.65] text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMe;
