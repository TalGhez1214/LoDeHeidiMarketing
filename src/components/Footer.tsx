import { SmileIcon } from './ShipIcon';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const productLinks = [
    { label: 'Features', href: '#product' },
    { label: 'Demos', href: '#demos' },
  ];

  const companyLinks = [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: 'mailto:hello@noah-ai.example' },
  ];

  const resourceLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Customer Stories', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Status', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ];

  return (
    <footer className="border-t border-border bg-gradient-to-b from-red-50/30 to-white mt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                <img
                  src="/images/logos/red_feather_option_1.svg"
                  alt="Lo de Heidi"
                  className="w-5 h-5 select-none pointer-events-none"
                  draggable={false}
                />
              </div>
              <span className="text-xl tracking-tight">Lo de Heidi</span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              Turn articles into conversations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 Lo de Heidi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}