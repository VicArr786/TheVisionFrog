"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

const TABS = [
  { id: "commercials", label: "Brands", href: "/Campaigns/Brands" },
  { id: "creators", label: "Creators", href: "/Campaigns/Creators" },
] as const;

// px a sideways swipe has to travel before it changes page
const SWIPE = 80;

/** Brands / Creators switch — stands in for the page title. Click it, or swipe the page on a phone */
export default function CampaignSwitch({ current }: { current: (typeof TABS)[number]["id"] }) {
  const router = useRouter();

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy) * 2) return;
      const i = TABS.findIndex((t) => t.id === current) + (dx < 0 ? 1 : -1);
      if (TABS[i]) router.push(TABS[i].href);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [current, router]);

  return (
    <span className="campaign-switch">
      {TABS.map((t, i) => (
        <Fragment key={t.id}>
          {i > 0 ? <span className="campaign-switch__bar" aria-hidden="true" /> : null}
          <Link
            href={t.href}
            className={t.id === current ? "is-active" : undefined}
            aria-current={t.id === current ? "page" : undefined}
          >
            {t.label}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}
