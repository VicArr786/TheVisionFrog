import Link from "next/link";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";

export default function MusicVideoNotFound() {
  return (
    <div className="vf-site">
    <main className="page-shell" style={{ textAlign: "center", paddingTop: "6rem" }}>
      <BackLink href="/MusicVideos" fixed />
      <h1 className="page-header__title" style={{ marginTop: "2rem" }}>
        Video not found
      </h1>
      <p className="page-header__sub" style={{ margin: "1rem auto 2rem" }}>
        This project doesn&apos;t exist or was moved.
      </p>
      <Link href="/MusicVideos" className="btn-primary">
        View all music videos
      </Link>
    </main>
    <SiteFooter />
    </div>
  );
}
