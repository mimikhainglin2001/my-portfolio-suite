import { Code2, Server, Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Code2,
      title: t("about.frontend"),
      items: "HTML5, CSS3, Bootstrap 5, Tailwind, JavaScript",
    },
    {
      icon: Server,
      title: t("about.backend"),
      items: "PHP, Laravel, ASP.NET, REST APIs",
    },
    {
      icon: Database,
      title: t("about.database"),
      items: "MySQL, MSSQL, Redis",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container max-w-5xl">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
            <span className="text-primary font-mono text-2xl md:text-3xl mr-2">01.</span>
            {t("about.title")}
          </h2>
          <div className="h-px bg-border flex-1" />
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {cards.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:border-primary/40 hover:-translate-y-1 transition-smooth"
            >
              <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{items}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
