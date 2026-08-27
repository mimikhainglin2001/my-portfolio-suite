import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import portrait from "@/assets/portrait.jpg";

const Hero = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-5rem)] flex items-center pt-28 pb-16 overflow-hidden bg-background"
    >
      <div className="container relative grid lg:grid-cols-[1.35fr_0.65fr] gap-10 lg:gap-14 items-center">
        <div className="space-y-7 animate-fade-up">
          <span className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold uppercase text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Available for new projects
          </span>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-primary">{t("hero.greeting")}</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.25rem] font-bold leading-[0.98]">
              {t("hero.name")}
            </h1>
            <p className="font-display text-2xl md:text-4xl font-semibold text-navy dark:text-primary">
              {t("hero.role")}
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("hero.tagline")}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" onClick={() => scrollTo("projects")} className="gap-2 rounded-md shadow-none">
              {t("hero.cta.work")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("contact")} className="gap-2 rounded-md border-navy text-navy hover:bg-navy hover:text-navy-foreground dark:border-foreground dark:text-foreground">
              <Mail className="h-4 w-4" />
              {t("hero.cta.contact")}
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end animate-fade-in">
          <figure className="relative w-full max-w-[16rem] sm:max-w-[18rem] lg:max-w-[19rem] overflow-hidden rounded-lg border border-border bg-card shadow-soft">
            <img
              src={portrait}
              alt="Portrait of Mi Mi Khaing Lin"
              width={960}
              height={1280}
              className="block w-full h-auto object-cover"
            />
          </figure>
        </div>

      </div>
    </section>
  );
};

export default Hero;
