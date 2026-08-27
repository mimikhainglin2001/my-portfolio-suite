import { useEffect, useState } from "react";
import { Moon, Sun, Languages, Download, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", key: "nav.home" as const },
  { id: "about", key: "nav.about" as const },
  { id: "skills", key: "nav.skills" as const },
  { id: "experience", key: "nav.experience" as const },
  { id: "whyme", key: "nav.whyme" as const },
  { id: "education", key: "nav.education" as const },
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
        "fixed top-0 left-0 right-0 z-[100] h-14 transition-smooth",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent",
      )}
    >
      <nav className="container flex h-full items-center justify-between" aria-label="Primary">
        <button
          onClick={() => handleNav("home")}
          className="font-display text-[15px] font-semibold tracking-[-0.01em] text-foreground hover:text-primary transition-smooth"
        >
          <span className="text-primary">MI MI KHAING</span> LIN
        </button>

        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                className="px-3 py-1.5 text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-smooth"
              >
                {t(item.key)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-smooth"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs uppercase">{lang}</span>
          </button>

          <a
            href="/Mi_Mi_Khaing_Lin_CV_Final.pdf"
            download
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-smooth"
          >
            <Download className="h-4 w-4" />
            CV
          </a>

          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-[18px] w-[18px]" />
            ) : (
              <Sun className="h-[18px] w-[18px]" />
            )}
          </button>

          <button
            className="md:hidden h-9 w-9 rounded-lg border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <ul className="container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className="w-full text-left px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-smooth"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
            <li className="sm:hidden pt-2">
              <a
                href="/Mi_Mi_Khaing_Lin_CV_Final.pdf"
                download
                className="flex items-center gap-2 w-full px-3 py-3 text-base font-medium text-foreground bg-primary text-primary-foreground rounded-md"
              >
                <Download className="h-4 w-4" />
                {t("nav.resume")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
