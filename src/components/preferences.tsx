"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

const MotionContext = createContext(false);
const preferenceEvent = "portfolio-preference";

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  window.addEventListener(preferenceEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener(preferenceEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  const systemReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  try {
    return systemReduced || localStorage.getItem("portfolio-motion") === "off";
  } catch {
    return systemReduced;
  }
}

export function Preferences({ children }: { children: ReactNode }) {
  const reduce = useSyncExternalStore(subscribe, getSnapshot, () => false);
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.motion = reduce ? "off" : "on";
  }, [reduce]);
  return (
    <MotionContext.Provider value={reduce}>
      <MotionConfig reducedMotion={reduce ? "always" : "never"}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionContext);
}

export function toggleMotion() {
  try {
    localStorage.setItem("portfolio-motion", getSnapshot() ? "on" : "off");
  } catch {
    return;
  }
  window.dispatchEvent(new Event(preferenceEvent));
}
