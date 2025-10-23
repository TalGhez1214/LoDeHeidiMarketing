import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/sections/Hero';
import { LiveDemo } from './components/sections/LiveDemo';
import { ProductHighlights } from './components/sections/ProductHighlights';
import { UseCases } from './components/sections/UseCases';
import { LivePreview } from './components/sections/LivePreview';
import { Outcomes } from './components/sections/Outcomes';
import { HowItWorks } from './components/sections/HowItWorks';
import { Demos } from './components/sections/Demos';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { About } from './components/sections/About';
import { CTA } from './components/sections/CTA';
import { Footer } from './components/Footer';

export default function App() {
  // Use light mode by default
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        {/* <LiveDemo /> */}
        <Demos />
        <ProductHighlights />
        {/* <UseCases /> */}
        {/* <LivePreview /> */}
        {/* <Outcomes /> */}
        {/* <HowItWorks /> */}
        {/* <Pricing />
        <FAQ /> */}
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
