"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MAIN_NAV, SOCIAL } from "@/lib/site";

type SiteNavProps = {
  /** Show Home link (Contact, Merch) */
  showHome?: boolean;
};

export default function SiteNav({ showHome = false }: SiteNavProps) {
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

    window.addEventListener("scroll", onScroll);
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
          {showHome ? <Link href="/">Home</Link> : null}
          {MAIN_NAV.map((item) =>
            item.anchor ? (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            )
          )}
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
