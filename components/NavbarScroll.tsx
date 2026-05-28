"use client";

import { useEffect } from "react";

type NavbarScrollProps = {
  hideAfterMs?: number;
  desktopSpacerHeight?: string;
};

export default function NavbarScroll({
  hideAfterMs = 3000,
  desktopSpacerHeight = "100px",
}: NavbarScrollProps) {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    const spacer = document.getElementById("nav-spacer");
    const btn = document.getElementById("menuBtn");
    if (!nav || !spacer || !btn) return;

    const closeMenu = () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    };

    const onMenuClick = (e: MouseEvent) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    btn.addEventListener("click", onMenuClick);
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    if (window.innerWidth > 768) {
      setTimeout(() => {
        if (!nav.classList.contains("open")) {
          nav.classList.add("nav-hidden");
          spacer.style.height = "0px";
        }
      }, hideAfterMs);
    }

    let lastScroll = 0;
    const onScroll = () => {
      if (nav.classList.contains("open")) return;
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        nav.classList.remove("nav-hidden");
        spacer.style.height = window.innerWidth > 768 ? desktopSpacerHeight : "60px";
      } else if (currentScroll < lastScroll) {
        nav.classList.remove("nav-hidden");
      } else {
        nav.classList.add("nav-hidden");
        spacer.style.height = "0px";
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      btn.removeEventListener("click", onMenuClick);
      window.removeEventListener("scroll", onScroll);
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, [hideAfterMs, desktopSpacerHeight]);

  return null;
}
