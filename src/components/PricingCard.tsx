import { Check } from 'lucide-react';
import { Button } from './ui/button';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaHref?: string;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  ctaText,
  ctaHref = '#',
}: PricingCardProps) {
  return (
    <div
      className={`relative p-8 rounded-xl border ${
        highlighted
          ? 'border-primary bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl shadow-blue-300/30'
          : 'border-border bg-white hover:border-primary/30 hover:shadow-lg'
      } transition-all duration-300`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs uppercase tracking-wider shadow-lg">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl tracking-tight">{price}</span>
          {period && <span className="text-muted-foreground">/{period}</span>}
        </div>
      </div>

      <Button
        className={`w-full mb-6 ${highlighted ? '' : 'variant-outline'}`}
        variant={highlighted ? 'default' : 'outline'}
      >
        {ctaText}
      </Button>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
