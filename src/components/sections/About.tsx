import { motion } from 'motion/react';
import { Mail, Shield, Zap, Eye } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function About() {
  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy First',
      description: 'We never store personal data. Your content, your control.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Design Flexibility',
      description: 'Noah can adapts to your typography, colors, and layout.',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Explainability',
      description: 'Every answer includes citations and confidence scores.',
    },
  ];

  const founders = [
    {
      name: 'Tal Ghez',
      role: 'CEO & CFO & CTO & COO',
      bio: 'The king of the world basically ',
      image: '/images/founders/tal.jpg' ,
    },
    {
      name: 'Nadav Antman Ron',
      role: 'Junior',
      bio: 'Actor, Fashion Model, Physicist, AI enthusiastic',
      image: '/images/founders/nadav.jpg',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl mb-6 tracking-tight">
            We're building AI that respects context.
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Noah AI is built by Tal and Nadav. We ship agents that understand long-form text and feel native to your site. Our mission is to make every article a conversation starter, not just content to scroll past.
          </p>
        </motion.div> */}

        {/* Values */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-xl border border-border bg-white hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-pink-100 text-primary mb-4 shadow-sm">
                {value.icon}
              </div>
              <h3 className="mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </motion.div> */}

        {/* Founders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-4xl mb-12 text-center tracking-tight">Meet the team</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <div key={founder.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg">
                  <ImageWithFallback
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-1">{founder.name}</h3>
                <p className="text-sm text-primary mb-4">{founder.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{founder.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-border bg-white shadow-md hover:shadow-lg transition-shadow">
            <Mail className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1">Get in touch</p>
              <a
                href="mailto:hello@noah-ai.example"
                className="text-primary hover:underline"
              >
                hey@noah-ai.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}