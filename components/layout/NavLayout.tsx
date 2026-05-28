import SiteChrome from "@/components/layout/SiteChrome";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/SiteFooter";

type NavLayoutProps = {
  children: React.ReactNode;
  banner?: React.ReactNode;
  showHome?: boolean;
};

/** Pages with global nav + logo (Contact, Merch) */
export default function NavLayout({ children, banner, showHome = true }: NavLayoutProps) {
  return (
    <div className="vf-site vf-site--nav">
      <SiteChrome />
      <SiteNav showHome={showHome} />
      {banner}
      <div className="vf-main">{children}</div>
      <SiteFooter />
    </div>
  );
}
