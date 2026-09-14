"use client";

import { useEffect } from "react";
import { useMotionPreference } from "./preferences";

export function SectionMotion() {
  const reduced = useMotionPreference();
  useEffect(() => {
    if (reduced) return;
    const main = document.getElementById("main");
    if (!main) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let current: HTMLElement | null = null;
    let frame = 0;
    const animations = new Set<Animation>();
    function reset() {
      cancelAnimationFrame(frame);
      if (current) {
        current.style.removeProperty("--depth-x");
        current.style.removeProperty("--depth-y");
        current.removeAttribute("data-depth-active");
        current = null;
      }
    }
    function move(event: PointerEvent) {
      if (!fine.matches || event.pointerType !== "mouse") return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              ".project-button, .recognition-button, .folio-school",
            )
          : null;
      if (target !== current) {
        reset();
        current = target;
      }
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -4;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        target.style.setProperty("--depth-x", `${x}deg`);
        target.style.setProperty("--depth-y", `${y}deg`);
        target.dataset.depthActive = "true";
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const animation = entry.target.animate(
            [
              { opacity: 0.65, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 550, easing: "cubic-bezier(.16,1,.3,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      },
      { threshold: 0.2 },
    );
    main
      .querySelectorAll(
        ".folio-section-label, .folio-tools-heading, .folio-contact > div:first-child",
      )
      .forEach((el) => observer.observe(el));
    main.addEventListener("pointermove", move);
    main.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      reset();
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      main.removeEventListener("pointermove", move);
      main.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [reduced]);
  return null;
}
