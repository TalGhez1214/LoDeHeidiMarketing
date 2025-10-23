import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { SmileIcon } from './ShipIcon';

interface FloatingOrbProps {
  onClick?: () => void;
}

export function FloatingOrb({ onClick }: FloatingOrbProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50 flex items-center justify-center hover:shadow-xl hover:shadow-primary/60 transition-shadow cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* Sparkle particles */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="w-4 h-4 text-yellow-300" />
      </motion.div>
      
      <SmileIcon className="w-6 h-6 text-white" />
    </motion.button>
  );
}
