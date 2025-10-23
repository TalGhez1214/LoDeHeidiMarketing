import { motion } from 'motion/react';
import { TrendingUp, Users, HeadphonesIcon, RotateCcw } from 'lucide-react';

export function Outcomes() {
  const outcomes = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      metric: '+42%',
      label: 'Time on Page',
    },
    {
      icon: <Users className="w-8 h-8" />,
      metric: '+65%',
      label: 'Engagement',
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      metric: '-28%',
      label: 'Support Tickets',
    },
    {
      icon: <RotateCcw className="w-8 h-8" />,
      metric: '+38%',
      label: 'Retention',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-rose-50/30 to-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Measurable impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Publishers using Noah AI see dramatic improvements across key metrics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-pink-100 text-primary mb-4 shadow-md">
                {outcome.icon}
              </div>
              <div className="text-5xl mb-2 bg-gradient-to-br from-red-500 to-rose-500 bg-clip-text text-transparent">
                {outcome.metric}
              </div>
              <p className="text-muted-foreground">{outcome.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}