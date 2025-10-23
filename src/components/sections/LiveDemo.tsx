import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ChatPanel } from '../ChatPanel';
import { MagicalFloatingOrb } from '../MagicalFloatingOrb';

export function LiveDemo() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl text-white">Try Noah AI</h3>
            <p className="text-white/70 mt-2">Click the floating orb to start chatting</p>
          </div>

          {/* Demo area */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 min-h-[400px] flex items-center justify-center border border-white/20">
            <div className="text-center">
              <p className="text-white/80 mb-4">
                Experience the power of Noah AI's in-page assistant
              </p>
              <Button
                onClick={() => setIsChatOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Open Chat
              </Button>
            </div>
          </div>

          {/* Watch Demo Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={() => {
                const demosSection = document.getElementById('demos');
                demosSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Orb & Chat Panel */}
      <MagicalFloatingOrb 
        onToggleChat={() => setIsChatOpen(!isChatOpen)} 
        isChatOpen={isChatOpen} 
      />
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Reduced motion variant - hidden by default, shown when prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          [style*="animation"],
          [style*="transition"] {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}