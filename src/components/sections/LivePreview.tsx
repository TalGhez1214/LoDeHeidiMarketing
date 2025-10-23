import { motion } from 'motion/react';
import { FloatingOrb } from '../FloatingOrb';
import { ShipTypingIndicator } from '../ShipTypingIndicator';

export function LivePreview() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-red-50/50 to-transparent">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            See it in action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse of how Noah AI feels native to your content
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-2xl border border-border bg-background shadow-xl">
            {/* Simulated article content */}
            <div className="space-y-4 mb-8">
              <div className="h-3 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="space-y-2 py-4">
                <div className="h-3 bg-primary/20 rounded w-full border border-primary/30" />
                <div className="h-3 bg-primary/20 rounded w-4/5 border border-primary/30" />
              </div>
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>

            {/* Floating Orb */}
            <div className="absolute bottom-8 right-8">
              <FloatingOrb />
            </div>

            {/* Chat bubble with typing indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-28 right-8"
            >
              <div className="bg-card border border-border rounded-2xl p-4 shadow-lg max-w-xs mb-3">
                <p className="text-sm mb-2">What are the key findings mentioned in this section?</p>
              </div>
              <div className="flex justify-end">
                <ShipTypingIndicator />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}