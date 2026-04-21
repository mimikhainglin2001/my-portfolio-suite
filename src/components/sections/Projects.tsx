import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.png";
import p3 from "@/assets/project-3.png";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      img: p1,
      title: t("projects.p1.title"),
      desc: t("projects.p1.desc"),
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind", "PHP", "MySQL", "Docker", "GitHub"],
      repo: "#",
      demo: "#",
    },
    {
      img: p2,
      title: t("projects.p2.title"),
      desc: t("projects.p2.desc"),
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind", "PHP", "Laravel", "MySQL", "Redis", "Docker", "GitHub"],
      repo: "#",
      demo: "#",
    },
    {
      img: p3,
      title: t("projects.p3.title"),
      desc: t("projects.p3.desc"),
      tags: ["ASP.NET", "MSSQL", "GitHub"],
      repo: "#",
      demo: null,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-subtle">
      <div className="container">
        <SectionHeading eyebrow={t("projects.subtitle")} title={t("projects.title")} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-glow hover:-translate-y-1 transition-smooth"
            >
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} `}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {/* <Github className="h-4 w-4" /> */}
                    {/* <span>Code</span> */}
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-glow transition-smooth"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
