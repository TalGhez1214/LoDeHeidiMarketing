import { motion } from 'motion/react';
import { Newspaper, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '../ui/button';

export function UseCases() {
  const useCases = [
    {
      icon: <Newspaper className="w-8 h-8" />,
      title: 'Digital Publishers',
      description: 'Transform your articles into interactive experiences. Readers can ask questions, get summaries, and explore related content—all without leaving the page.',
      benefits: ['Increase time on page by 42%', 'Reduce bounce rates', 'Boost reader satisfaction'],
      image: 'https://images.unsplash.com/photo-1623039405147-547794f92e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBhcnRpY2xlcyUyMHJlYWRpbmd8ZW58MXx8fHwxNzYwNTE0Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Knowledge Bases',
      description: 'Help users find answers faster. Noah AI understands your documentation and provides instant, contextual responses to complex queries.',
      benefits: ['Reduce support tickets by 28%', 'Improve user onboarding', 'Better self-service experience'],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBtYWdhemluZSUyMGxhcHRvcHxlbnwxfHx8fDE3NjA2MDE4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Educational Platforms',
      description: 'Make learning more engaging. Students can highlight passages, ask for clarifications, and get personalized explanations in real-time.',
      benefits: ['Enhance comprehension', 'Support diverse learning styles', 'Increase course completion'],
      image: 'https://images.unsplash.com/photo-1758270703813-2ecf235a6462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzYwNDI2NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Enterprise Media',
      description: 'Turn your content library into an intelligent resource. Employees can quickly find information across thousands of articles and documents.',
      benefits: ['Boost productivity', 'Reduce information silos', 'Improve knowledge sharing'],
      image: 'https://images.unsplash.com/photo-1628017974725-18928e8e8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwb2ZmaWNlfGVufDF8fHx8MTc2MDUwOTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section id="use-cases" className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Built for content-driven businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're publishing news, building knowledge bases, or creating educational content, Noah AI helps your audience engage deeper with your content.
          </p>
        </motion.div>

        <div className="space-y-24">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-red-100 to-pink-100 text-primary mb-6 shadow-md">
                  {useCase.icon}
                </div>
                <h3 className="text-3xl mb-4">{useCase.title}</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {useCase.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg">
                  Learn More
                </Button>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}