"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { INFO_NAV, SOCIAL, WORK_NAV, type NavLink } from "@/lib/site";

type SiteNavProps = {
  /** Show Home link (Contact, Merch) */
  showHome?: boolean;
};

function isActive(item: NavLink, pathname: string) {
  return [item.href, ...(item.match ?? [])].some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export default function SiteNav({ showHome = false }: SiteNavProps) {
  const pathname = usePathname() ?? "/";

  const renderLink = (item: NavLink) => {
    const active = isActive(item, pathname);
    return (
      <Link
        key={item.href}
        href={item.href}
        className={active ? "vf-nav__link--active" : undefined}
        aria-current={active ? "page" : undefined}
      >
        <span className="vf-nav__label">{item.label}</span>
      </Link>
    );
  };

  useEffect(() => {
    const nav = document.getElementById("vf-navbar");
    const spacer = document.getElementById("vf-nav-spacer");
    const btn = document.getElementById("vf-menu-btn");
    if (!nav || !spacer || !btn) return;

    const closeMenu = () => {
      nav.classList.remove("vf-nav--open");
      btn.setAttribute("aria-expanded", "false");
    };

    const onMenuClick = (e: MouseEvent) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("vf-nav--open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    btn.addEventListener("click", onMenuClick);
    nav.querySelectorAll(".vf-nav__links a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Only auto-hide after user scrolls (avoids blank-looking screen on load)
    let hasScrolled = false;

    let lastScroll = 0;
    const onScroll = () => {
      if (nav.classList.contains("vf-nav--open")) return;
      const y = window.scrollY;
      if (y > 10) hasScrolled = true;
      if (!hasScrolled) {
        nav.classList.remove("vf-nav--hidden");
        spacer.style.height = window.innerWidth > 768 ? "80px" : "60px";
        lastScroll = y;
        return;
      }
      if (y <= 0) {
        nav.classList.remove("vf-nav--hidden");
        spacer.style.height = window.innerWidth > 768 ? "80px" : "60px";
      } else if (y < lastScroll) {
        nav.classList.remove("vf-nav--hidden");
      } else {
        nav.classList.add("vf-nav--hidden");
        spacer.style.height = "0px";
      }
      lastScroll = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      btn.removeEventListener("click", onMenuClick);
      window.removeEventListener("scroll", onScroll);
      nav.querySelectorAll(".vf-nav__links a").forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, []);

  return (
    <>
      <nav className="vf-nav" id="vf-navbar">
        <button
          className="vf-nav__menu-btn"
          id="vf-menu-btn"
          type="button"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="vf-nav__links">
          {showHome ? (
            <Link href="/" className="vf-nav__home">
              <span className="vf-nav__label">Home</span>
            </Link>
          ) : null}
          {WORK_NAV.map(renderLink)}
          <span className="vf-nav__divider" aria-hidden="true" />
          {INFO_NAV.map(renderLink)}
          <div className="vf-nav__mobile-social">
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
      </nav>
      <div className="vf-nav__spacer" id="vf-nav-spacer" />
    </>
  );
}
