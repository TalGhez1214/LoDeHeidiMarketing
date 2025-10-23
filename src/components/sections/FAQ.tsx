import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: 'How does Noah AI train on my content?',
      answer: 'Noah AI uses your existing content through our API integration. We process articles in real-time and never store sensitive data. You maintain full control over what content is accessible.',
    },
    {
      question: 'Can I customize the look and feel?',
      answer: 'Absolutely. Noah AI provides comprehensive theming tokens to match your brand. Customize colors, typography, positioning, and even the assistant\'s personality and tone.',
    },
    {
      question: 'What about user privacy?',
      answer: 'Privacy is built into our core. We process queries in real-time without storing personal information. All data handling is GDPR and CCPA compliant. You can review our full privacy policy in the docs.',
    },
    {
      question: 'What languages are supported?',
      answer: 'Noah AI currently supports English. Additional languages are being added regularly based on customer demand.',
    },
    {
      question: 'How accurate are the responses?',
      answer: 'Noah AI is grounded in your actual content, reducing hallucinations significantly. Responses include citations to specific paragraphs, and you can configure confidence thresholds.',
    },
    {
      question: 'Can I try it before committing?',
      answer: 'Yes! You can schedule a demo to try, just reach us.',
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Noah AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
