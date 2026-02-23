interface TagBadgeProps {
  label: string;
  bgColor: string;
  textColor: string;
}

export function TagBadge({ label, bgColor, textColor }: TagBadgeProps) {
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium leading-5"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </span>
  );
}
