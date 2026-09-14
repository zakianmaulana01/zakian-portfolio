"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TechIcon } from "@/components/tech-icon";

export function AnimatedTools({ tools }: { tools: string[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="folio-tool-deck"
      role="list"
      aria-label="Tech stack"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {tools.map((tool, index) => (
        <article
          key={tool}
          className="folio-tool-card"
          role="listitem"
          onMouseEnter={() => setHoveredIndex(index)}
        >
          <TechIcon name={tool} size={42} />

          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                layoutId="tool-tooltip"
                className="tool-tooltip"
                initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                style={{
                  position: "absolute",
                  top: -45,
                  left: "50%",
                  background: "#111",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 50,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {tool}
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      ))}
    </div>
  );
}
