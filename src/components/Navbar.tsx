import { useEffect, useState } from "react";
import { Moon, Sun, Languages, Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", key: "nav.home" as const },
  { id: "about", key: "nav.about" as const },
  { id: "skills", key: "nav.skills" as const },
  { id: "experience", key: "nav.experience" as const },
  { id: "projects", key: "nav.projects" as const },
  { id: "contact", key: "nav.contact" as const },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-soft"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Primary">
        <button
          onClick={() => handleNav("home")}
          className="text-xl font-mono font-bold tracking-tight text-foreground hover:text-primary transition-smooth"
        >
          <span className="text-primary-glow">{"<"}</span>
          Dev Portfolio
          <span className="text-primary-glow">{"/>"}</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth rounded-md"
              >
                {t(item.key)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLang}
            className="gap-1.5 font-medium"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs uppercase">{lang}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex gap-2">
            <a href="/resume.pdf" download="Your-Name-Resume.pdf">
              <Download className="h-4 w-4" />
              {t("nav.resume")}
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
          <ul className="container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className="w-full text-left px-3 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-smooth"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
            <li className="sm:hidden pt-2">
              <Button asChild variant="default" className="w-full gap-2">
                <a href="/resume.pdf" download="Your-Name-Resume.pdf">
                  <Download className="h-4 w-4" />
                  {t("nav.resume")}
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
