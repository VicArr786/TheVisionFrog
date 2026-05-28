import BackLink from "@/components/BackLink";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { SITE } from "@/lib/site";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

type PageLayoutProps = {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  header?: PageHeaderProps;
  /** Skip max-width shell (full-bleed sliders) */
  fullWidth?: boolean;
  /** No top padding (hero under fixed back) */
  flush?: boolean;
  className?: string;
  showBrand?: boolean;
};

/** Portfolio & inner pages — back button, optional header, footer */
export default function PageLayout({
  children,
  backHref = "/",
  backLabel = "← Back",
  header,
  fullWidth = false,
  flush = false,
  className = "",
  showBrand = false,
}: PageLayoutProps) {
  return (
    <div className={["vf-site", "vf-page", className].filter(Boolean).join(" ")}>
      <BackLink href={backHref} label={backLabel} fixed />

      {showBrand ? (
        <div className="vf-page__topbar">
          <Link href="/" className="vf-page__brand">
            {SITE.name}
          </Link>
        </div>
      ) : null}

      <main
        className={
          fullWidth
            ? "vf-page__content"
            : `page-shell ${flush ? "" : ""}`.trim()
        }
        style={flush && !fullWidth ? { paddingTop: "5.5rem" } : undefined}
      >
        {header ? (
          <PageHeader
            eyebrow={header.eyebrow}
            title={header.title}
            subtitle={header.subtitle}
          />
        ) : null}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
