import { motion } from 'motion/react';
import { MessageSquare, Highlighter, FileText, Search } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';

export function ProductHighlights() {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'AI Chat',
      description: 'Ask questions and get answers grounded in the current article',
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Article Finder',
      description: 'Find articles according to user interest to keep readers exploring',
    },
    {
      icon: <Highlighter className="w-6 h-6" />,
      title: 'Smart Highlights',
      description: 'Temporary, sentence-level marks that helps navigate in the content',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Contextual Summary',
      description: 'Get a clear, concise recap in a pop-up—grasp the essence in seconds',
    },
  ];

  return (
    <section
      id="product"
      className="py-20 md:py-32 bg-[#1F2937] text-white" // 🌙 Dark gray background
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight text-white">
            Powerful features that drive engagement
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Give your readers the tools they need to understand, explore, and engage with your content—all without leaving the page.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
