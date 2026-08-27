import {
  ArrowRight,
  Mail,
  Download,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import portrait from "@/assets/portrait.jpg";

const Hero = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center pt-14 pb-10 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="container relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text content */}
        <div className="flex-1 lg:max-w-[660px] space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[13px] font-medium text-muted-foreground">
              Open to opportunities
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-medium text-muted-foreground">
              {t("hero.greeting")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.03em]">
              {t("hero.name")}
            </h1>
            <p className="font-display text-xl md:text-2xl text-gradient font-semibold">
              {t("hero.role")}
            </p>
          </div>

          <p className="text-[17px] text-muted-foreground max-w-xl leading-[1.75]">
            {t("hero.tagline")}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Laravel",
              "ASP.NET",
              "PHP",
              "React Native",
              "Node.js",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-secondary/40 px-3 py-1 text-[13px] font-mono text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary via-primary/90 to-accent px-6 py-3 text-[15px] font-medium text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--glow)/0.3)] transition-smooth"
            >
              {t("hero.cta.work")}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-[15px] font-medium text-foreground hover:bg-secondary/50 transition-smooth"
            >
              <Mail className="h-4 w-4" />
              {t("hero.cta.contact")}
            </button>
            <a
              href="/Mi_Mi_Khaing_Lin_CV_Final.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-[15px] font-medium text-foreground hover:bg-secondary/50 transition-smooth"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
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
              // { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
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
                className="h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/25 transition-smooth"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div className="relative animate-fade-in">
          <div className="relative">
            <figure className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-2xl border border-border overflow-hidden shadow-soft">
              <img
                src={portrait}
                alt="Portrait of Mi Mi Khaing Lin"
                width={960}
                height={1280}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </figure>
            <div className="absolute -bottom-3 -right-3 rounded-lg border border-border bg-card/80 backdrop-blur-sm px-3 py-2 text-[12px] font-medium text-muted-foreground shadow-sm">
              <span className="text-primary font-mono">&gt;</span> Full Stack
              &amp; Mobile Dev
            </div>
          </div>
          <div className="absolute -inset-8 bg-primary/[0.03] rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
