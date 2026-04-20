import { MapPin, Briefcase, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: MapPin, label: t("about.location"), value: t("about.locationValue") },
    { icon: Briefcase, label: t("about.experience"), value: t("about.experienceValue") },
    { icon: Sparkles, label: t("about.projects"), value: t("about.projectsValue") },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <SectionHeading eyebrow={t("about.subtitle")} title={t("about.title")} />

        <div className="grid lg:grid-cols-5 gap-10 mt-12">
          <div className="lg:col-span-3 space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft hover:border-primary/40 transition-smooth"
              >
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    {label}
                  </p>
                  <p className="text-lg font-semibold text-foreground mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
