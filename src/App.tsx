import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import WhyTrustSection from './sections/WhyTrustSection';
import ServicesSection from './sections/ServicesSection';
import HowWeWorkSection from './sections/HowWeWorkSection';
import CasesSection from './sections/CasesSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import CustomCursor from './sections/CustomCursor';

export default function App() {
  return (
    <div style={{ cursor: 'none' }} className="app-root">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <WhyTrustSection />
      <ServicesSection />
      <HowWeWorkSection />
      <CasesSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
