interface Props {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}

const SectionHeading = ({ eyebrow, title, align = "center" }: Props) => (
  <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
      {eyebrow}
    </p>
    <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 tracking-tight">
      {title}
    </h2>
    <div className={`h-1 w-16 bg-gradient-hero rounded-full mt-5 ${align === "center" ? "mx-auto" : ""}`} />
  </div>
);

export default SectionHeading;
