import {
  ArrowRight,
  Mail,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiCss,
  SiDocker,
  SiDotnet,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import PixelBackdrop from "@/components/PixelBackdrop";
import portrait from "@/assets/portrait.jpg";

const MARQUEE_ITEMS: { name: string; icon: IconType; color: string }[] = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap 5", icon: SiBootstrap, color: "#7952B3" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "ASP.NET", icon: SiDotnet, color: "#512BD4" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const Hero = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative overflow-hidden">
      <PixelBackdrop />
      <div className="container relative z-10 flex min-h-[100dvh] flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20 pt-28 pb-16">
        {/* Text content */}
        <div className="flex-1 lg:max-w-[620px] space-y-7 animate-fade-up">
          <div className="space-y-4">
            <p data-grid-avoid className="text-[16px] text-muted-foreground">
              {t("hero.greeting")}
            </p>
            <h1
              data-grid-avoid
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-[-0.03em]"
            >
              {t("hero.name")}
            </h1>
            <p
              data-grid-avoid
              className="font-display text-2xl md:text-3xl font-semibold text-foreground"
            >
              {t("hero.role")}
            </p>
          </div>

          <p
            data-grid-avoid
            className="text-[16px] text-muted-foreground max-w-xl leading-[1.8]"
          >
            {t("hero.tagline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/70 bg-background px-6 py-3 text-[15px] font-medium text-foreground hover:bg-secondary/60 transition-smooth"
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
          <figure
            data-grid-avoid
            className="relative w-64 sm:w-72 lg:w-[340px] overflow-hidden rounded-[2.5rem] border border-border shadow-soft"
          >
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
      <div className="relative z-10 border-y border-border bg-background">
        <div className="relative overflow-hidden py-5">
          <div className="flex w-max animate-marquee gap-10 pr-10">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => {
              const Icon = item.icon;
              return (
                <span
                  key={`${item.name}-${i}`}
                  className="inline-flex items-center gap-2.5 font-mono text-[14px] font-medium text-muted-foreground whitespace-nowrap"
                >
                  <Icon
                    aria-hidden
                    className="h-[18px] w-[18px] shrink-0"
                    style={{ color: item.color }}
                  />
                  {item.name}
                </span>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
