import { motion } from 'motion/react';
import { PricingCard } from '../PricingCard';

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'month',
      description: 'Perfect for testing and small projects',
      features: [
        '5,000 requests per month',
        '1 domain',
        'Basic analytics',
        'Community support',
        'Noah AI watermark',
      ],
      ctaText: 'Get Started',
    },
    {
      name: 'Pro',
      price: '$99',
      period: 'month',
      description: 'For growing publishers and platforms',
      features: [
        '100,000 requests per month',
        '3 domains',
        'Custom branding',
        'Advanced analytics',
        'Priority support',
        'Custom theming',
      ],
      highlighted: true,
      ctaText: 'Start Free Trial',
    },
    {
      name: 'Scale',
      price: 'Contact',
      description: 'Enterprise-grade for high-traffic sites',
      features: [
        'Custom request limits',
        'Unlimited domains',
        'SSO & SAML',
        'Dedicated support',
        'SLA guarantee',
        'Custom integrations',
      ],
      ctaText: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-background to-purple-50/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            All plans include 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
