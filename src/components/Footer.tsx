import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SOCIALS = [
  {
    icon: Github,
    href: "https://github.com/mimikhainglin2001",
    label: "GitHub",
  },
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
        <p>
          © {year} Mi Mi Khaing Lin. {t("footer.rights")}
        </p>
        <TooltipProvider delayDuration={150}>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary hover:-translate-y-0.5 transition-smooth"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        <p>{t("footer.built")}</p>
      </div>
    </footer>
  );
};

export default Footer;
