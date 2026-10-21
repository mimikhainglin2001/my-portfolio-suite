interface Props {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  number?: string;
}

const SectionHeading = ({ eyebrow, title, align = "left", number }: Props) => {
  if (align === "center") {
    return (
      <div className="text-center">
        {number && (
          <p className="font-mono text-[15px] font-medium text-muted-foreground">
            {number}. {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-heading-hero font-display">{title}</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <h2 className="flex items-baseline gap-3 text-heading-hero font-display whitespace-nowrap">
        {number && (
          <span className="font-mono text-lg md:text-xl font-medium text-foreground">
            {number}.
          </span>
        )}
        {title}
      </h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};

export default SectionHeading;
