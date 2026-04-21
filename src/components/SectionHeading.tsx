interface Props {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  number?: string;
}

const SectionHeading = ({ eyebrow, title, align = "center", number }: Props) => (
  <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
        {eyebrow}
      </p>
    )}
    <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""} ${eyebrow ? "mt-3" : ""}`}>
      {number && (
        <span className="text-primary font-mono text-2xl md:text-3xl">{number}.</span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="h-px bg-border flex-1 max-w-xs hidden md:block" />
    </div>
  </div>
);

export default SectionHeading;
