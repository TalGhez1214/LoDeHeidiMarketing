"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

const QUERIES = [
  "Give me new articles from today",
  "Find articles about technology trends",
  "Summarize this page",
  "Highlight the most important phrases",
];

export function HeroChatDemo() {
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentQuery = QUERIES[currentQueryIndex];

    if (!isDeleting && displayedText === currentQuery) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentQueryIndex((prev) => (prev + 1) % QUERIES.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText((t) => t.slice(0, -1));
      } else {
        setDisplayedText((t) => currentQuery.substring(0, t.length + 1));
      }
    }, isDeleting ? 30 : 40);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentQueryIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        w-full h-1/2               /* ⬅️ Half the previous height (was h-full) */
        flex flex-col items-center justify-center
        bg-white rounded-3xl shadow-2xl overflow-hidden relative
        p-6                        /* slightly tighter padding for smaller height */
      "
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(239, 68, 68, 0.2), rgba(251, 113, 133, 0.1))",
        }}
        animate={{ x: [0, 50, -30, 0], y: [0, -30, 50, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(251, 113, 133, 0.2), rgba(239, 68, 68, 0.1))",
        }}
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -50, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center mb-4">
        <div className="heidi-logo-orb w-14 h-14 rounded-full shadow-lg flex items-center justify-center">
          <img
            src="/images/logos/red_feather_option_1.svg"
            alt="Lo de Heidi logo"
            className="w-9 h-9 select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Input area */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="relative h-14"> {/* slightly shorter than h-16 */}
          <div
            className="h-full w-full pr-12 pl-4 py-3
                       border-[2.5px]
                       text-[15px] rounded-[18px]
                       bg-gray-50/80
                       border-gray-300
                       text-gray-700
                       flex items-center"
          >
            {/* TEXT + CARET IN INLINE FLOW */}
            <div className="inline-flex items-center leading-none">
              <span className="whitespace-pre">{displayedText}</span>
              <motion.span
                aria-hidden="true"
                className="inline-block w-[2px] h-[1em] bg-red-500 ml-[2px] align-baseline"
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0 }}
              />
            </div>

            {!displayedText && (
              <span className="text-gray-400">
                Search articles, find content or ask anything...
              </span>
            )}
          </div>

          {/* Send Button */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 text-white shadow-md flex items-center justify-center
                       bg-red-500 hover:bg-red-600 transition-colors opacity-70 cursor-default"
            aria-label="Send"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

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
    </div>
  );
}
