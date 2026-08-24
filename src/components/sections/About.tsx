import { Code2, Server, Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const About = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Code2,
      title: t("about.frontend"),
      items: "HTML5, CSS3, JavaScript, React, React Native, Tailwind, Bootstrap 5",
    },
    {
      icon: Server,
      title: t("about.backend"),
      items: "PHP, Laravel, ASP.NET, REST APIs, Microservices",
    },
    {
      icon: Database,
      title: t("about.database"),
      items: "MySQL, MSSQL, PostgreSQL, MongoDB, Redis",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container max-w-5xl">
        <SectionHeading title={t("about.title")} number="01" align="center" />

        <div className="grid md:grid-cols-3 gap-px mt-14 mb-12 border border-border bg-border">
          {cards.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="p-7 bg-card hover:bg-secondary transition-smooth"
            >
              <div className="inline-flex p-2 rounded-md bg-primary text-primary-foreground mb-5">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{items}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
