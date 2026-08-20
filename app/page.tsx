import { Navbar } from '@/app/components/marketing/Navbar/Navbar';
import { HeroSection } from '@/app/components/marketing/HeroSection/HeroSection';
import { FeatureSection } from '@/app/components/marketing/FeatureSection/FeatureSection';
import { ProgramShowcase } from '@/app/components/marketing/ProgramShowcase/ProgramShowcase';
import { EducationPreview } from '@/app/components/marketing/EducationPreview/EducationPreview';
import { TelemetrySection } from '@/app/components/marketing/TelemetrySection/TelemetrySection';
import { Footer } from '@/app/components/marketing/Footer/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ProgramShowcase />
      <EducationPreview />
      <TelemetrySection />
      <Footer />
    </main>
  );
}
