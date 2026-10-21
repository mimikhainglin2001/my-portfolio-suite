import {
  ArrowRight,
  Mail,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import portrait from "@/assets/portrait.jpg";

const MARQUEE_ITEMS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "React Native",
  "Tailwind CSS",
  "Bootstrap 5",
  "PHP",
  "Laravel",
  "ASP.NET",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Git",
  "Figma",
];

const Hero = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container relative flex min-h-[100dvh] flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20 pt-28 pb-16">
        {/* Text content */}
        <div className="flex-1 lg:max-w-[620px] space-y-7 animate-fade-up">
          <div className="space-y-4">
            <p className="text-[16px] text-muted-foreground">
              {t("hero.greeting")}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-[-0.03em]">
              {t("hero.name")}
            </h1>
            <p className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              {t("hero.role")}
            </p>
          </div>

          <p className="text-[16px] text-muted-foreground max-w-xl leading-[1.8]">
            {t("hero.tagline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/70 px-6 py-3 text-[15px] font-medium text-foreground hover:bg-secondary/60 transition-smooth"
            >
              {t("hero.cta.work")}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="/Mi_Mi_Khaing_Lin_CV_Final.pdf"
              download
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground hover:opacity-90 transition-smooth"
            >
              {t("nav.resume")}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/15">
                <Download className="h-3.5 w-3.5" />
              </span>
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Mail className="h-4 w-4" />
              {t("hero.cta.contact")}
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2 pt-2">
            {[
              {
                icon: Github,
                href: "https://github.com/mimikhainglin2001",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:mimikhainglin70@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-smooth"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div className="relative animate-fade-in">
          <figure className="relative w-64 sm:w-72 lg:w-[340px] overflow-hidden rounded-[2.5rem] border border-border shadow-soft">
            <img
              src={portrait}
              alt="Portrait of Mi Mi Khaing Lin"
              width={960}
              height={1280}
              className="w-full h-auto object-cover"
            />
          </figure>
          <div className="absolute -bottom-4 -left-4 rounded-full border border-border bg-card px-4 py-2 text-[12px] font-medium text-muted-foreground shadow-sm">
            <span className="font-mono text-foreground">&gt;</span> Full Stack
            &amp; Mobile Dev
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="border-y border-border bg-background/60">
        <div className="relative overflow-hidden py-5">
          <div className="flex w-max animate-marquee gap-10 pr-10">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="font-mono text-[14px] font-medium text-muted-foreground whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
