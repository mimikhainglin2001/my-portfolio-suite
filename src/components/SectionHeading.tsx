interface Props {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  number?: string;
}

const SectionHeading = ({ eyebrow, title, align = "center", number }: Props) => (
  <div className={align === "center" ? "text-center max-w-4xl mx-auto" : ""}>
    {eyebrow && (
      <p className="text-sm font-semibold text-primary">
        {eyebrow}
      </p>
    )}
    <div className={`flex items-end gap-5 ${eyebrow ? "mt-4" : ""}`}>
      {align === "center" && <div className="mb-2 h-px bg-border flex-1" />}
      <h2 className={`font-display text-3xl md:text-5xl font-bold flex items-baseline gap-3 ${align === "center" ? "justify-center flex-shrink-0" : ""}`}>
        {number && (
          <span className="text-primary text-sm md:text-base font-semibold leading-none">
            {number}.
          </span>
        )}
        <span className="leading-[0.95]">{title}</span>
      </h2>
      <div className="mb-2 h-px bg-border flex-1" />
    </div>
  </div>
);

export default SectionHeading;
