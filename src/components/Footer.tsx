import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SOCIALS = [
  {
    icon: Github,
    href: "https://github.com/mimikhainglin2001",
    label: "GitHub",
  },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  // { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:mimikhainglin70@gmail.com", label: "Email" },
];

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="section-divider">
      {/* CTA block */}
      <div className="section-padding text-center">
        <div className="container">
          <h2 className="text-heading-hero font-display mb-4">
            Let's Build Something{" "}
            <span className="text-gradient">Great Together</span>
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-xl mx-auto mb-8">
            Have a project in mind or just want to chat? Feel free to reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary via-primary/90 to-accent px-6 py-3 text-[15px] font-medium text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--glow)/0.3)] transition-smooth"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
            <a
              href="/Mi_Mi_Khaing_Lin_CV_Final.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-[15px] font-medium text-foreground hover:bg-secondary/50 transition-smooth"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-divider">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-muted-foreground">
          <p>
            &copy; {year} Mi Mi Khaing Lin. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/25 transition-smooth"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
