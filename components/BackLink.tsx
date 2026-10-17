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
    <>
      <Link href={href} className={classes}>
        {label}
      </Link>
      {/* every inner page pins a fixed back button — pair it with the monogram, top right */}
      {fixed ? (
        <Link href="/" className="vf-corner-logo" aria-label="The Vision Frog — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/logos/web/Vision_Frog_Monogram_Logo-02.png" alt="" />
        </Link>
      ) : null}
    </>
  );
}
