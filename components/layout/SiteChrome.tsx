import Link from "next/link";
import { SOCIAL } from "@/lib/site";

export default function SiteChrome() {
  return (
    <div className="vf-chrome" aria-hidden={false}>
      <div className="vf-chrome__logo">
        <Link href="/">
          <img src="/assets/images/logos/VF_Icon_3.png" alt="Vision Frog Logo" />
        </Link>
      </div>
      <div className="vf-chrome__social">
        <a
          className="vf-icon vf-icon--ig"
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        />
        <a
          className="vf-icon vf-icon--yt"
          href={SOCIAL.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        />
      </div>
    </div>
  );
}
