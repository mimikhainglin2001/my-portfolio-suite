import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const Education = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="section-padding bg-secondary/30">
      <div className="container max-w-4xl">
        <SectionHeading title={t("education.title")} number="05" />

        <div className="mt-12">
          <div className="rounded-xl border border-border bg-card p-6 transition-smooth hover:border-primary/20 hover:shadow-[0_12px_40px_-12px_hsl(var(--glow)/0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/[0.08] text-primary shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <h3 className="text-lg font-semibold">{t("education.degree1")}</h3>
                  <span className="font-mono text-[14px] font-medium text-primary shrink-0">
                    {t("education.date1")}
                  </span>
                </div>
                <p className="text-[14px] text-muted-foreground mb-3">{t("education.school1")}</p>
                <p className="text-[15px] leading-[1.65] text-muted-foreground">{t("education.desc1")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
