import Link from "next/link";

type BackLinkProps = {
  href?: string;
  label?: string;
  fixed?: boolean;
  className?: string;
};

export default function BackLink({
  href = "/",
  label = "← Back",
  fixed = false,
  className = "",
}: BackLinkProps) {
  const classes = ["back-btn", fixed ? "back-btn--fixed" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
