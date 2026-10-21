import { Code2, Server, Database, Smartphone, Globe, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const About = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Code2,
      title: t("about.frontend"),
      desc: "HTML5, CSS3, JavaScript, Tailwind, Bootstrap 5, React",
    },
    {
      icon: Server,
      title: t("about.backend"),
      desc: "PHP, Laravel, ASP.NET, REST APIs, Microservices",
    },
    {
      icon: Database,
      title: t("about.database"),
      desc: "MySQL, MSSQL, PostgreSQL, MongoDB, Redis",
    },
    {
      icon: Smartphone,
      title: "Mobile",
      desc: "React Native, Redux, AppWrite",
    },
    {
      icon: Globe,
      title: "DevOps",
      desc: "Docker, CI/CD, GitHub Actions",
    },
    {
      icon: Layers,
      title: "Architecture",
      desc: "System design, third-party integrations, code quality",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <SectionHeading title={t("about.title")} number="01" />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition-smooth hover:shadow-soft"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-[17px] font-semibold mb-1.5">{title}</h3>
              <p className="text-[15px] leading-[1.65] text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl space-y-5 text-[16px] leading-[1.8] text-muted-foreground">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
