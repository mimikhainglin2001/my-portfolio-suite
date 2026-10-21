import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.png";
import p3 from "@/assets/project-3.png";
import p4 from "@/assets/project-4.png";
import p5 from "@/assets/project-5.png";
import p6 from "@/assets/project-6.png";
import p7 from "@/assets/project-7.png";
import p8 from "@/assets/project-8.png";
import p9 from "@/assets/project-9.png";

const FILTERS = ["All", "Web", "Mobile", "Enterprise"] as const;
type Filter = (typeof FILTERS)[number];

const pad = (value: number) => String(value).padStart(2, "0");

const Projects = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<Filter>("All");
  const [index, setIndex] = useState(0);
  const dragX = useRef<number | null>(null);

  const projects = [
    {
      img: p1,
      title: t("projects.p1.title"),
      desc: t("projects.p1.desc"),
      category: "Web",
      tags: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Bootstrap",
        "Tailwind",
        "PHP",
        "MySQL",
        "Docker",
      ],
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
    {
      img: p7,
      title: t("projects.p7.title"),
      desc: t("projects.p7.desc"),
      category: "Web",
      tags: ["React", "Laravel", "MySQL", "REST API", "Tailwind", "Docker"],
      repo: "#",
      demo: "https://globalnet-service-desk-frontend.vercel.app/",
    },
    {
      img: p8,
      title: t("projects.p8.title"),
      desc: t("projects.p8.desc"),
      category: "Enterprise",
      tags: [
        "Microservices",
        "React",
        "Laravel",
        "NodeJS",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "RabbitMQ",
        "Docker",
      ],
      repo: "#",
      demo: "https://dailyneeditems.com/",
    },
    {
      img: p9,
      title: t("projects.p9.title"),
      desc: t("projects.p9.desc"),
      category: "Mobile",
      tags: ["React Native", "Redux", "Microservices", "Laravel", "MySQL", "Redis"],
      repo: "#",
      demo: null,
    },
  ];

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
  const count = filtered.length;
  const safeIndex = count === 0 ? 0 : Math.min(index, count - 1);

  const go = (step: number) => {
    setIndex((value) => Math.min(count - 1, Math.max(0, value + step)));
  };

  const selectFilter = (filter: Filter) => {
    setActive(filter);
    setIndex(0);
  };

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container">
        <SectionHeading title={t("projects.title")} number="06" />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => selectFilter(filter)}
                className={`rounded-lg border px-3 py-1.5 text-[14px] font-medium transition-smooth ${
                  active === filter
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/25"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <p className="font-mono text-[13px] tabular-nums text-muted-foreground">
              <span className="text-foreground">{pad(safeIndex + 1)}</span>
              <span className="mx-1.5">/</span>
              {pad(count)}
            </p>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={safeIndex === 0}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-foreground/30 disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={safeIndex >= count - 1}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-foreground/30 disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-border">
          <div
            className="h-px bg-foreground transition-[width] duration-500 ease-out"
            style={{ width: count ? `${((safeIndex + 1) / count) * 100}%` : "0%" }}
          />
        </div>

        <div
          className="mt-8 overflow-hidden"
          onPointerDown={(event) => {
            dragX.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (dragX.current == null) return;
            const delta = event.clientX - dragX.current;
            dragX.current = null;
            if (delta > 48) go(-1);
            if (delta < -48) go(1);
          }}
          onPointerCancel={() => {
            dragX.current = null;
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${safeIndex * 100}%)` }}
          >
            {filtered.map((project, projectIndex) => (
              <article
                key={project.title}
                aria-hidden={projectIndex !== safeIndex}
                className="grid w-full shrink-0 items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-soft lg:col-span-7">
                  <img
                    src={project.img}
                    alt={project.title}
                    width={1024}
                    height={640}
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-[13px] tracking-[0.18em] text-muted-foreground">
                    {pad(projectIndex + 1)}
                    <span className="mx-2 text-border">/</span>
                    {project.category.toUpperCase()}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">
                    {project.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-[12px] font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-smooth hover:text-foreground"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground transition-smooth hover:opacity-90"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
