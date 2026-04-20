import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© {year} Mi Mi Khaing Lin. {t("footer.rights")}</p>
        <p>{t("footer.built")}</p>
      </div>
    </footer>
  );
};

export default Footer;
