import { motion } from 'motion/react';

export function Integrations() {
  const integrations = [
    { name: 'React', logo: '⚛️' },
    { name: 'Next.js', logo: '▲' },
    { name: 'FastAPI', logo: '⚡' },
    { name: 'MongoDB', logo: '🍃' },
    { name: 'LangGraph', logo: '🔗' },
    { name: 'OpenAI', logo: '🤖' },
  ];

  return (
    <section id="integrations" className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Built with modern tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Noah AI integrates seamlessly with your existing stack
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {integration.logo}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {integration.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
