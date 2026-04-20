import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SOCIALS = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {year} Mi Mi Khaing Lin. {t("footer.rights")}</p>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-smooth"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p>{t("footer.built")}</p>
      </div>
    </footer>
  );
};

export default Footer;
