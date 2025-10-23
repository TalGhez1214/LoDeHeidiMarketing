import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const WORDS = [
  'Article', 'Summary', 'Question', 'Highlight', 'Context', 
  'Answer', 'Explain', 'Content', 'Search', 'Learn',
  'Insight', 'Knowledge', 'Discover', 'Explore', 'Read'
];

const COLORS = [
  { from: '#3B82F6', to: '#2563EB', light: '#60A5FA', name: 'blue' },    // Blue
  { from: '#EF4444', to: '#DC2626', light: '#F87171', name: 'red' },     // Red
  { from: '#F59E0B', to: '#D97706', light: '#FBBF24', name: 'yellow' },  // Yellow
  { from: '#10B981', to: '#059669', light: '#34D399', name: 'green' },    // Green
];

interface Brick {
  id: number;
  word: string;
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  delay: number;
  wall: 'left' | 'back' | 'right';
  color: typeof COLORS[0];
}

export function BrickWallAnimation() {
  const [bricks, setBricks] = useState<Brick[]>([]);

  useEffect(() => {
    // Generate random bricks from three corner walls
    const generatedBricks: Brick[] = [];
    const walls: Array<'left' | 'back' | 'right'> = ['left', 'back', 'right'];
    
    for (let i = 0; i < 18; i++) {
      const wall = walls[i % 3];
      const color = COLORS[i % COLORS.length];
      
      generatedBricks.push({
        id: i,
        word: WORDS[i % WORDS.length],
        x: (Math.random() - 0.5) * 250,
        y: (Math.random() - 0.5) * 250,
        z: Math.random() * 300,
        rotateX: Math.random() * 360,
        rotateY: Math.random() * 360,
        rotateZ: Math.random() * 360,
        delay: Math.random() * 3,
        wall,
        color,
      });
    }
    setBricks(generatedBricks);
  }, []);

  // Get wall position for corner configuration
  const getWallPosition = (wall: 'left' | 'back' | 'right') => {
    switch (wall) {
      case 'left':
        // Left wall - rotated 90 degrees
        return { x: -200, y: 0, z: 100, rotateY: 90 };
      case 'back':
        // Back wall - straight
        return { x: 0, y: 0, z: -100, rotateY: 0 };
      case 'right':
        // Right wall - rotated -90 degrees
        return { x: 200, y: 0, z: 100, rotateY: -90 };
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full" style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1200px'
      }}>
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-pink-50/50 to-rose-50/50 rounded-2xl" />

        {/* 3D Brick Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(15deg) rotateY(-35deg)',
            }}
          >
            {bricks.map((brick) => {
              const wallPos = getWallPosition(brick.wall);
              
              return (
                <motion.div
                  key={brick.id}
                  className="absolute"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{
                    x: wallPos.x,
                    y: brick.y / 4,
                    z: wallPos.z,
                    rotateX: 0,
                    rotateY: wallPos.rotateY,
                    rotateZ: 0,
                  }}
                  animate={{
                    x: wallPos.x + brick.x * 0.5,
                    y: brick.y,
                    z: wallPos.z + brick.z,
                    rotateX: brick.rotateX,
                    rotateY: wallPos.rotateY + brick.rotateY / 3,
                    rotateZ: brick.rotateZ,
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    delay: brick.delay,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                >
                  {/* Brick */}
                  <div
                    className="relative text-white shadow-xl"
                    style={{
                      width: '90px',
                      height: '55px',
                      transformStyle: 'preserve-3d',
                      borderRadius: '6px',
                    }}
                  >
                    {/* Front face */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center rounded border border-white/20"
                      style={{
                        background: `linear-gradient(135deg, ${brick.color.from}, ${brick.color.to})`,
                        transform: 'translateZ(14px)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }}
                    >
                      <span className="text-sm font-medium drop-shadow-sm">{brick.word}</span>
                    </div>
                    
                    {/* Back face */}
                    <div 
                      className="absolute inset-0 rounded border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${brick.color.to}, ${brick.color.from})`,
                        transform: 'translateZ(-14px) rotateY(180deg)',
                      }}
                    />
                    
                    {/* Top face */}
                    <div 
                      className="absolute inset-0 rounded-t border-t border-white/20"
                      style={{
                        height: '28px',
                        background: `linear-gradient(135deg, ${brick.color.light}, ${brick.color.from})`,
                        transform: 'rotateX(90deg) translateZ(13.5px)',
                        transformOrigin: 'top',
                      }}
                    />
                    
                    {/* Bottom face */}
                    <div 
                      className="absolute inset-0 rounded-b"
                      style={{
                        height: '28px',
                        background: `linear-gradient(135deg, ${brick.color.to}, ${brick.color.from})`,
                        transform: 'rotateX(-90deg) translateZ(41.5px)',
                        transformOrigin: 'bottom',
                        opacity: 0.8,
                      }}
                    />
                    
                    {/* Left face */}
                    <div 
                      className="absolute inset-0 rounded-l"
                      style={{
                        width: '28px',
                        background: `linear-gradient(135deg, ${brick.color.from}, ${brick.color.to})`,
                        transform: 'rotateY(-90deg) translateZ(14px)',
                        transformOrigin: 'left',
                        opacity: 0.9,
                      }}
                    />
                    
                    {/* Right face */}
                    <div 
                      className="absolute inset-0 rounded-r"
                      style={{
                        width: '28px',
                        background: `linear-gradient(135deg, ${brick.color.from}, ${brick.color.to})`,
                        transform: 'rotateY(90deg) translateZ(76px)',
                        transformOrigin: 'right',
                        opacity: 0.9,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Subtle glow effects */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-300/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-rose-300/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      </div>
    </div>
  );
}