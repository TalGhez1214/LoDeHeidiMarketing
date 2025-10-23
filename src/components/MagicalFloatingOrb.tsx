"use client";

import "../styles/globals.css";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface MagicalFloatingOrbProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export function MagicalFloatingOrb({
  onToggleChat,
  isChatOpen,
}: MagicalFloatingOrbProps) {
  // Hide orb when chat is open
  if (isChatOpen) return null;

  const [isHovered, setIsHovered] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef<number | null>(null);

  const isTouch =
    typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

  const handleEnter = () => {
    setIsHovered(true);
    if (isTouch) return;
    tipTimer.current = window.setTimeout(() => setShowTip(true), 120);
  };

  const handleLeave = () => {
    setIsHovered(false);
    setShowTip(false);
    if (tipTimer.current) {
      clearTimeout(tipTimer.current);
      tipTimer.current = null;
    }
  };

  return (
    <>
      {/* Tooltip (hover only) */}
      {showTip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-20 right-8 md:bottom-24 md:right-12
                    bg-card text-card-foreground px-3.5 py-2
                    rounded-[10px] text-sm whitespace-nowrap z-[60]
                    border border-gray-200/70"
          style={{
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          Lo de Heidi
        </motion.div>
      )}

      {/* Orb button */}
      <button
        onClick={onToggleChat}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn(
          "group fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[60] transition-all duration-300",
          "rounded-full focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
          "outline-none ring-0 shadow-none bg-transparent"
        )}
        style={{
          WebkitTapHighlightColor: "transparent",
          ["--orb-sh-x" as any]: "0px",
          ["--orb-sh-y" as any]: "6px",
          ["--orb-sh-blur" as any]: "14px",
          ["--orb-sh-spread" as any]: "0px",
          ["--orb-sh-opacity" as any]: 0.1,
          ["--orb-sh-x-h" as any]: "0px",
          ["--orb-sh-y-h" as any]: "12px",
          ["--orb-sh-blur-h" as any]: "26px",
          ["--orb-sh-spread-h" as any]: "0px",
          ["--orb-sh-opacity-h" as any]: 0.18,
          ["--orb-scale-hover" as any]: 1.06,
        }}
        aria-label="Open chat"
      >
        <div
          className={cn(
            "heidi-logo-orb relative flex items-center justify-center rounded-full overflow-hidden",
            "border-0 transition-transform duration-200 ease-out",
            "shadow-none hover:shadow-none"
          )}
          style={{
            width: 56,
            height: 56,
            boxShadow:
              "var(--orb-sh-x) var(--orb-sh-y) var(--orb-sh-blur) var(--orb-sh-spread) rgba(0,0,0,var(--orb-sh-opacity))",
            transform: "scale(1)",
            willChange: "transform, box-shadow",
          }}
        >
          <img
            src="/images/logos/red_feather_option_1.svg"
            alt="Lo de Heidi"
            className="w-8 h-8 select-none pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 pointer-events-none group-hover:[--orb-sh-x:var(--orb-sh-x-h)] group-hover:[--orb-sh-y:var(--orb-sh-y-h)] group-hover:[--orb-sh-blur:var(--orb-sh-blur-h)] group-hover:[--orb-sh-spread:var(--orb-sh-spread-h)] group-hover:[--orb-sh-opacity:var(--orb-sh-opacity-h)]" />
          <div className="absolute inset-0 transition-transform duration-200 ease-out pointer-events-none group-hover:scale-[var(--orb-scale-hover)]" />
        </div>
      </button>

      {/* Local CSS for the orb look */}
      <style>
        {`
        .heidi-logo-orb {
          background: #ffffff;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 10px 18px rgba(255,255,255,0.12);
          filter: saturate(1);
        }
        `}
      </style>
    </>
  );
}
