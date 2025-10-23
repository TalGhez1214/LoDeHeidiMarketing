import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, MessageSquare } from 'lucide-react';

interface ContentBlock {
  id: number;
  text: string;
  highlights: { start: number; end: number; delay: number }[];
  position: { x: number; y: number };
  delay: number;
}

interface FloatingInsight {
  id: number;
  type: 'summary' | 'question' | 'highlight';
  text: string;
  position: { x: number; y: number };
  delay: number;
}

export default function ContentProcessingAnimation() {
  const [activeHighlights, setActiveHighlights] = useState<Set<string>>(new Set());
  const [insights, setInsights] = useState<FloatingInsight[]>([]);

  const contentBlocks: ContentBlock[] = [
    {
      id: 1,
      text: "AI is transforming how we consume content online.",
      highlights: [
        { start: 0, end: 2, delay: 1.5 },
        { start: 17, end: 31, delay: 2.0 },
      ],
      position: { x: 15, y: 20 },
      delay: 0,
    },
    {
      id: 2,
      text: "Smart assistants help readers understand complex topics faster.",
      highlights: [
        { start: 0, end: 16, delay: 2.5 },
        { start: 28, end: 43, delay: 3.0 },
      ],
      position: { x: 60, y: 15 },
      delay: 0.3,
    },
    {
      id: 3,
      text: "Highlighting key insights saves time and improves comprehension.",
      highlights: [
        { start: 0, end: 12, delay: 3.5 },
        { start: 30, end: 40, delay: 4.0 },
      ],
      position: { x: 20, y: 55 },
      delay: 0.6,
    },
    {
      id: 4,
      text: "Instant answers to questions enhance the reading experience.",
      highlights: [
        { start: 0, end: 15, delay: 4.5 },
        { start: 40, end: 60, delay: 5.0 },
      ],
      position: { x: 55, y: 60 },
      delay: 0.9,
    },
  ];

  const floatingInsights: FloatingInsight[] = [
    {
      id: 1,
      type: 'summary',
      text: 'Key Point: AI enhances reading',
      position: { x: 10, y: 40 },
      delay: 2.0,
    },
    {
      id: 2,
      type: 'question',
      text: 'How does this work?',
      position: { x: 70, y: 35 },
      delay: 3.0,
    },
    {
      id: 3,
      type: 'highlight',
      text: 'Important insight',
      position: { x: 40, y: 75 },
      delay: 4.0,
    },
  ];

  useEffect(() => {
    // Simulate highlights appearing over time
    const timers: NodeJS.Timeout[] = [];
    
    contentBlocks.forEach((block) => {
      block.highlights.forEach((highlight) => {
        const timer = setTimeout(() => {
          setActiveHighlights((prev) => new Set(prev).add(`${block.id}-${highlight.start}`));
        }, highlight.delay * 1000);
        timers.push(timer);
      });
    });

    // Add insights with delays
    floatingInsights.forEach((insight) => {
      const timer = setTimeout(() => {
        setInsights((prev) => [...prev, insight]);
      }, insight.delay * 1000);
      timers.push(timer);
    });

    // Clean up and restart animation
    const resetTimer = setTimeout(() => {
      setActiveHighlights(new Set());
      setInsights([]);
    }, 8000);
    timers.push(resetTimer);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Restart animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlights(new Set());
      setInsights([]);
      
      setTimeout(() => {
        contentBlocks.forEach((block) => {
          block.highlights.forEach((highlight) => {
            setTimeout(() => {
              setActiveHighlights((prev) => new Set(prev).add(`${block.id}-${highlight.start}`));
            }, highlight.delay * 1000);
          });
        });

        floatingInsights.forEach((insight) => {
          setTimeout(() => {
            setInsights((prev) => [...prev, insight]);
          }, insight.delay * 1000);
        });
      }, 100);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const renderHighlightedText = (block: ContentBlock) => {
    const { text, highlights, id } = block;
    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    // Sort highlights by start position
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

    sortedHighlights.forEach((highlight, idx) => {
      const { start, end } = highlight;
      const isActive = activeHighlights.has(`${id}-${start}`);

      // Add text before highlight
      if (start > lastIndex) {
        parts.push(
          <span key={`text-${idx}-${lastIndex}`} className="text-white/70">
            {text.slice(lastIndex, start)}
          </span>
        );
      }

      // Add highlighted text
      parts.push(
        <motion.span
          key={`highlight-${idx}-${start}`}
          className="relative inline-block"
          initial={{ opacity: 0.7 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0.7 }}
        >
          <span className="relative z-10 text-white">{text.slice(start, end)}</span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 -z-10 rounded"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isActive
                ? { scaleX: 1, opacity: 0.3, transition: { duration: 0.4, ease: 'easeOut' } }
                : { scaleX: 0, opacity: 0 }
            }
            style={{ transformOrigin: 'left' }}
          />
        </motion.span>
      );

      lastIndex = end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-end-${lastIndex}`} className="text-white/70">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating content blocks */}
      {contentBlocks.map((block) => (
        <motion.div
          key={block.id}
          className="absolute bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-4 max-w-sm"
          style={{
            left: `${block.position.x}%`,
            top: `${block.position.y}%`,
          }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: [0, 2, 0, -2, 0],
            rotateY: [0, 2, 0, -2, 0],
          }}
          transition={{
            opacity: { delay: block.delay, duration: 0.6 },
            y: { delay: block.delay, duration: 0.6 },
            scale: { delay: block.delay, duration: 0.6 },
            rotateX: { delay: block.delay + 1, duration: 8, repeat: Infinity, ease: 'easeInOut' },
            rotateY: { delay: block.delay + 1.5, duration: 10, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              delay: block.delay + 0.5,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
          
          <div className="relative z-10">
            <p className="text-sm leading-relaxed">{renderHighlightedText(block)}</p>
          </div>

          {/* AI processing indicator */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: block.delay + 0.3, type: 'spring', stiffness: 200 }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        </motion.div>
      ))}

      {/* Floating insights */}
      <AnimatePresence>
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            className="absolute"
            style={{
              left: `${insight.position.x}%`,
              top: `${insight.position.y}%`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl rounded-lg" />
              
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-lg border border-white/20 shadow-2xl px-3 py-2 flex items-center gap-2">
                {insight.type === 'summary' && (
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
                {insight.type === 'question' && (
                  <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                )}
                {insight.type === 'highlight' && (
                  <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-xs text-white whitespace-nowrap">{insight.text}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{ y: ['0%', '100%'] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
