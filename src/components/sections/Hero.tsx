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
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-subtle"
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary-glow/10 blur-3xl pointer-events-none" />

      <div className="container relative grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div className="space-y-7 animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
            Available for new projects
          </span>

          <div className="space-y-3">
            <p className="text-lg text-muted-foreground font-medium">{t("hero.greeting")}</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {t("hero.name")}
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gradient">
              {t("hero.role")}
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("hero.tagline")}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" onClick={() => scrollTo("projects")} className="gap-2 shadow-soft">
              {t("hero.cta.work")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("contact")} className="gap-2">
              <Mail className="h-4 w-4" />
              {t("hero.cta.contact")}
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero rounded-[2rem] blur-3xl opacity-20 scale-90" />
            <div className="relative w-64 md:w-80 aspect-[3/4] rounded-[2rem] bg-gradient-hero p-1 shadow-glow">
              <div className="w-full h-full rounded-[1.75rem] bg-background overflow-hidden">
                <img
                  src={portrait}
                  alt="Portrait of Mi Mi Khaing Lin"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
