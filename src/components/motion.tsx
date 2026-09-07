"use client";
import { type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMotionPreference } from "./preferences";
export function MagneticLink({
  children,
  href,
  className = "",
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  const reduce = useMotionPreference();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 }),
    springY = useSpring(y, { stiffness: 220, damping: 18 });
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) * 0.12);
    y.set((event.clientY - box.top - box.height / 2) * 0.18);
  }
  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: reduce ? 0 : springX, y: reduce ? 0 : springY }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}
