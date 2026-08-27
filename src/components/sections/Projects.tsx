import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.png";
import p3 from "@/assets/project-3.png";
import p4 from "@/assets/project-4.png";
import p5 from "@/assets/project-5.png";
import p6 from "@/assets/project-6.png";

const FILTERS = ["All", "Web", "Mobile", "Enterprise"] as const;
type Filter = (typeof FILTERS)[number];

const Projects = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<Filter>("All");

  const projects = [
    {
      img: p1,
      title: t("projects.p1.title"),
      desc: t("projects.p1.desc"),
      category: "Web",
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind", "PHP", "MySQL", "Docker"],
      repo: "#",
      demo: null,
    },
    {
      img: p2,
      title: t("projects.p2.title"),
      desc: t("projects.p2.desc"),
      category: "Web",
      tags: ["Laravel", "PHP", "MySQL", "Redis", "Docker"],
      repo: "#",
      demo: "https://itvisionsoft.com/",
    },
    {
      img: p3,
      title: t("projects.p3.title"),
      desc: t("projects.p3.desc"),
      category: "Enterprise",
      tags: ["ASP.NET", "MSSQL", "GitHub"],
      repo: "#",
      demo: null,
    },
    {
      img: p4,
      title: t("projects.p4.title"),
      desc: t("projects.p4.desc"),
      category: "Mobile",
      tags: ["React Native", "Redux", "AppWrite"],
      repo: "#",
      demo: null,
    },
    {
      img: p5,
      title: t("projects.p5.title"),
      desc: t("projects.p5.desc"),
      category: "Mobile",
      tags: ["React Native", "TMDB API", "Redux"],
      repo: "#",
      demo: null,
    },
    {
      img: p6,
      title: t("projects.p6.title"),
      desc: t("projects.p6.desc"),
      category: "Mobile",
      tags: ["React Native", "Maps API", "AppWrite"],
      repo: "#",
      demo: null,
    },
  ];

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container">
        <SectionHeading title={t("projects.title")} number="06" />

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-lg border px-3 py-1.5 text-[14px] font-medium transition-smooth ${
                active === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/25"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {filtered.map((project) => (
            <article
              key={project.title}
              className="group rounded-xl border border-border bg-card overflow-hidden transition-smooth hover:border-primary/20 hover:shadow-[0_12px_40px_-12px_hsl(var(--glow)/0.12)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-5 space-y-3">
                <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-primary">
                  {project.category}
                </span>
                <h3 className="text-[17px] font-semibold">{project.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.65]">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-secondary/50 px-2 py-0.5 text-[13px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code`}
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground hover:text-primary transition-smooth"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-glow transition-smooth"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
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
