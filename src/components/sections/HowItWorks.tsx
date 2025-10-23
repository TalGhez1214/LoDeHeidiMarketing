import { motion } from 'motion/react';
import { Code, Settings, Rocket, ShieldCheck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Code className="w-8 h-8" />,
      number: '01',
      title: 'Add the assistant to your site',
      description: 'Drop in the Noah widget and brand it to match your look & feel.',
    },
    {
      icon: <Settings className="w-8 h-8" />,
      number: '02',
      title: 'Connect your content',
      description: 'Point Noah at your content so it understands context on every page.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      number: '03',
      title: 'Switch on intelligent skills',
      description: 'Enable summaries, highlights, and related-articles—streamed in real time.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />, // updated icon
      number: '04',
      title: 'Your rules, your voice',
      description: 'Tune personality and protections to match your standards.',
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Easy implementation, immediate impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deploy Noah AI across your platform in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connection line for larger screens */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-red-300 via-rose-400 to-red-300" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-500 text-white mb-6 z-10 shadow-lg shadow-red-300/50">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center text-xs font-semibold shadow-md">
                    {step.number}
                  </div>
                </div>
                <h3 className="mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}