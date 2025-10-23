import { motion } from 'motion/react';
import { SmileIcon } from './ShipIcon';

export function ShipTypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <SmileIcon className="w-5 h-5 text-primary" />
      </motion.div>
      
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground"
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
