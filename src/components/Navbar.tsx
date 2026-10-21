import { useEffect, useState } from "react";
import { Moon, Sun, Download, Menu, X } from "lucide-react";
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
        "fixed top-0 left-0 right-0 z-[100] h-16 transition-smooth",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="container flex h-full items-center justify-between" aria-label="Primary">
        <button
          onClick={() => handleNav("home")}
          className="font-mono text-[15px] font-semibold tracking-[0.08em] uppercase text-foreground hover:text-muted-foreground transition-smooth"
        >
          <span className="text-muted-foreground">&lt;</span>Dev Portfolio
          <span className="text-muted-foreground">/&gt;</span>
        </button>

        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                className="px-3 py-1.5 text-[14px] font-medium text-muted-foreground hover:text-foreground rounded-full transition-smooth"
              >
                {t(item.key)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Language pill */}
          <button
            onClick={toggleLang}
            className="inline-flex items-center rounded-full border border-border bg-card p-0.5 text-[12px] font-semibold transition-smooth"
            aria-label="Toggle language"
          >
            <span
              className={cn(
                "rounded-full px-2.5 py-1 transition-smooth",
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              EN
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 transition-smooth",
                lang === "mm"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              MM
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          {/* Resume */}
          <a
            href="/Mi_Mi_Khaing_Lin_CV_Final.pdf"
            download
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 transition-smooth"
          >
            <Download className="h-3.5 w-3.5" />
            {t("nav.resume")}
          </a>

          {/* Menu pill (mobile) */}
          <button
            className="lg:hidden inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-foreground transition-smooth"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            Menu
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <ul className="container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className="w-full text-left px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-lg transition-smooth"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
            <li className="sm:hidden pt-2">
              <a
                href="/Mi_Mi_Khaing_Lin_CV_Final.pdf"
                download
                className="flex items-center gap-2 w-full px-3 py-3 text-base font-medium bg-primary text-primary-foreground rounded-lg"
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
