import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { SparkleIcon } from '../SparkleIcon';
import { Play } from 'lucide-react';
import { HeroChatDemo } from '../HeroChatDemo';

export function Hero() {
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-tight">
              Redefine The Way We Interact With Content
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              AI that understands your content, responds instantly and mirrors your brand voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                <Play className="w-4 h-4 mr-2" />
                Watch demo
              </Button>
            </div>
          </motion.div>

          {/* Right: Chat Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] flex items-center"
          >
            <HeroChatDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}