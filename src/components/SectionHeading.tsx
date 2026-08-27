interface Props {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  number?: string;
}

const SectionHeading = ({ eyebrow, title, align = "center", number }: Props) => (
  <div className={align === "center" ? "text-center" : ""}>
    <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
      {number && (
        <span className="text-[14px] font-medium uppercase tracking-[0.15em] text-primary">
          {number}.
        </span>
      )}
      {eyebrow && (
        <span className="text-[14px] font-medium uppercase tracking-[0.15em] text-primary">
          {eyebrow}
        </span>
      )}
      <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
    </div>
    <h2 className={`mt-3 text-heading-hero font-display ${align === "center" ? "" : ""}`}>
      {title}
    </h2>
  </div>
);

export default SectionHeading;
