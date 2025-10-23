import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const WORDS = [
  'Article', 'Summary', 'Question', 'Highlight', 'Context', 
  'Answer', 'Explain', 'Content', 'Search', 'Learn',
  'Insight', 'Knowledge', 'Discover', 'Explore', 'Read',
  'Analyze', 'Focus', 'Study', 'Review', 'Understand'
];

const COLORS = [
  { bg: 'from-blue-400/70 to-blue-500/70', border: 'border-blue-300/50', text: 'text-white' },
  { bg: 'from-red-400/70 to-red-500/70', border: 'border-red-300/50', text: 'text-white' },
  { bg: 'from-yellow-400/70 to-yellow-500/70', border: 'border-yellow-300/50', text: 'text-white' },
  { bg: 'from-green-400/70 to-green-500/70', border: 'border-green-300/50', text: 'text-white' },
  { bg: 'from-purple-400/70 to-purple-500/70', border: 'border-purple-300/50', text: 'text-white' },
  { bg: 'from-pink-400/70 to-pink-500/70', border: 'border-pink-300/50', text: 'text-white' },
];

interface Bubble {
  id: number;
  word: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: typeof COLORS[0];
  burstTime: number; // Time when bubble will burst (in seconds)
}

export function BubbleAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [burstingBubbles, setBurstingBubbles] = useState<Set<number>>(new Set());

  useEffect(() => {
    let bubbleId = 0;
    
    // Create new bubbles periodically
    const interval = setInterval(() => {
      const duration = Math.random() * 3 + 6; // 6-9 seconds total journey
      const burstTime = Math.random() * (duration - 1) + 1; // Burst randomly between 1 sec and duration-1
      
      const newBubble: Bubble = {
        id: bubbleId++,
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        x: Math.random() * 75 + 12.5, // 12.5% to 87.5% across the width
        size: Math.random() * 60 + 120, // 120px to 180px - bigger bubbles!
        duration: duration,
        delay: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        burstTime: burstTime,
      };

      setBubbles(prev => [...prev, newBubble]);

      // Schedule burst at random time during journey
      setTimeout(() => {
        // Trigger burst animation
        setBurstingBubbles(prev => new Set(prev).add(newBubble.id));
        
        // Remove bubble after burst animation
        setTimeout(() => {
          setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
          setBurstingBubbles(prev => {
            const next = new Set(prev);
            next.delete(newBubble.id);
            return next;
          });
        }, 500); // Burst animation duration
      }, newBubble.burstTime * 1000); // Burst at random time
    }, 900); // New bubble every 900ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 rounded-2xl">
      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      {/* Bubbles Container */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {bubbles.map((bubble) => {
            const isBursting = burstingBubbles.has(bubble.id);
            
            return (
              <motion.div
                key={bubble.id}
                className="absolute bottom-0"
                style={{
                  left: `${bubble.x}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                }}
                initial={{ 
                  y: 0,
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={isBursting ? {
                  opacity: 0,
                  scale: [1, 1.15, 0.3],
                } : {
                  y: '-110vh',
                  opacity: [0, 1, 1, 1, 1],
                  scale: 1,
                  x: [0, 20, -20, 15, -15, 0],
                }}
                transition={{
                  duration: isBursting ? 0.3 : bubble.duration,
                  delay: bubble.delay,
                  ease: isBursting ? [0.4, 0, 1, 1] : 'linear',
                  scale: isBursting ? {
                    times: [0, 0.3, 1],
                    duration: 0.3,
                  } : undefined,
                  x: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
              >
                {/* Bubble */}
                <div className="relative w-full h-full">
                  {/* Main bubble body */}
                  <div 
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${bubble.color.bg} backdrop-blur-sm border-2 ${bubble.color.border} shadow-lg flex items-center justify-center`}
                    style={{
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {/* Word inside bubble */}
                    <span className={`${bubble.color.text} font-medium drop-shadow-sm text-sm md:text-base`}>
                      {bubble.word}
                    </span>
                    
                    {/* Shine effect */}
                    <div 
                      className="absolute top-2 left-2 w-8 h-8 bg-white/40 rounded-full blur-md"
                      style={{ transform: 'translate(-25%, -25%)' }}
                    />
                  </div>

                  {/* Burst particles when bursting */}
                  {isBursting && (
                    <>
                      {/* Expanding ring/shockwave */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-4 ${bubble.color.border}`}
                        initial={{ 
                          scale: 1,
                          opacity: 0.6,
                        }}
                        animate={{
                          scale: 2.5,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: 'easeOut',
                        }}
                      />
                      
                      {/* Flying fragments - irregular shapes and sizes */}
                      {[...Array(16)].map((_, i) => {
                        const angle = (i * Math.PI * 2) / 16;
                        const distance = 70 + Math.random() * 40; // Random distance 70-110px
                        const size = Math.random() * 8 + 4; // 4-12px
                        const rotationOffset = Math.random() * 360;
                        
                        return (
                          <motion.div
                            key={i}
                            className={`absolute top-1/2 left-1/2 rounded-full bg-gradient-to-br ${bubble.color.bg}`}
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                            }}
                            initial={{ 
                              x: 0, 
                              y: 0, 
                              opacity: 1,
                              scale: 1,
                              rotate: 0,
                            }}
                            animate={{
                              x: Math.cos(angle) * distance,
                              y: Math.sin(angle) * distance,
                              opacity: 0,
                              scale: [1, 1.2, 0],
                              rotate: rotationOffset + 180,
                            }}
                            transition={{
                              duration: 0.5 + Math.random() * 0.3,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                          />
                        );
                      })}
                      
                      {/* Additional smaller spray particles */}
                      {[...Array(8)].map((_, i) => {
                        const angle = (i * Math.PI * 2) / 8 + Math.PI / 16; // Offset between main particles
                        const distance = 40 + Math.random() * 30;
                        
                        return (
                          <motion.div
                            key={`spray-${i}`}
                            className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gradient-to-br ${bubble.color.bg} opacity-60`}
                            initial={{ 
                              x: 0, 
                              y: 0, 
                              opacity: 0.8,
                              scale: 1,
                            }}
                            animate={{
                              x: Math.cos(angle) * distance,
                              y: Math.sin(angle) * distance,
                              opacity: 0,
                              scale: 0,
                            }}
                            transition={{
                              duration: 0.35,
                              ease: 'easeOut',
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Optional: Bottom gradient to hide bubble spawn area */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
    </div>
  );
}
