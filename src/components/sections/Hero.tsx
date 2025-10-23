import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { SparkleIcon } from '../SparkleIcon';
import { Play } from 'lucide-react';
import { HeroChatDemo } from '../HeroChatDemo';

export function Hero() {
  const [showIntro, setShowIntro] = useState(true);

  // Measure final chat size so intro matches EXACTLY
  const finalChatRef = useRef<HTMLDivElement | null>(null);
  const [introSize, setIntroSize] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (finalChatRef.current) {
        const rect = finalChatRef.current.getBoundingClientRect();
        setIntroSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };
    requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Lock scroll during intro (keeps overlay pinned, optional)
  useEffect(() => {
    if (showIntro) {
      const html = document.documentElement;
      const body = document.body;
      const prevHtmlOverflow = html.style.overflow;
      const prevBodyOverflow = body.style.overflow;
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      return () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
      };
    }
  }, [showIntro]);

  // End intro after 10s
  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 5_000);
    return () => clearTimeout(t);
  }, []);

  // Portal target
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  useEffect(() => setPortalEl(document.body), []);

  return (
    <section className="relative pt-0 pb-20 md:pt-0 md:pb-32 overflow-hidden bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <SparkleIcon className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* INTRO OVERLAY (portal + fixed so it never scrolls) */}
      {portalEl &&
        createPortal(
          <AnimatePresence>
            {showIntro && (
              <motion.div
                key="intro-overlay"
                className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  layoutId="hero-chat"
                  layout="position"
                  style={{
                    width: introSize?.width ?? 0,
                    height: introSize?.height ?? 0,
                    visibility: introSize ? 'visible' : 'hidden',
                  }}
                  className="flex items-center justify-center"
                >
                  {introSize && <HeroChatDemo />}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalEl
        )}

      {/* Vertically center the grid within the hero after intro */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 min-h-[80vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: Copy (reveals after intro ends) */}
          <motion.div
            key="hero-copy"
            initial={false}
            animate={showIntro ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: showIntro ? 0 : 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-tight"
              initial={false}
              animate={showIntro ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showIntro ? 0 : 0.3 }}
            >
              Redefine The Way We Interact With Content
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl"
              initial={false}
              animate={showIntro ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showIntro ? 0 : 0.45 }}
            >
              AI that understands your content, responds instantly and mirrors your brand voice.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={false}
              animate={showIntro ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showIntro ? 0 : 0.6 }}
            >
              <Button size="lg" className="text-base">
                Get Started
              </Button>

              <Button asChild size="lg" variant="outline" className="text-base">
                <a href="#demos">
                  <Play className="w-4 h-4 mr-2" />
                  Watch demo
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Chat Demo final spot — visible during intro (invisible for measurement) */}
          <motion.div
            key="hero-chat-final-shell"
            initial={false}
            animate={showIntro ? { opacity: 0, y: 100} : { opacity: 1, y: 100 }}  // ⬅️ add y: 24 (≈ 24px down)
            transition={{ duration: 0.6, delay: showIntro ? 0 : 0.15 }}
            className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <motion.div
              layoutId="hero-chat"
              layout="position"
              ref={finalChatRef}
              style={{
                width: 'min(920px, 92vw)',
                maxWidth: '100%',
                height: 'min(520px, 72vh)',
              }}
              className={showIntro ? 'invisible' : 'visible'}
            >
              {!showIntro && <HeroChatDemo />}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
