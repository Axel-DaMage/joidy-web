'use client';

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhatIsSection } from '@/components/sections/WhatIsSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { PrivacySection } from '@/components/sections/PrivacySection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ArchitectureSection } from '@/components/sections/ArchitectureSection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { RoadmapSection } from '@/components/sections/RoadmapSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhatIsSection />
        <ProblemSection />
        <PrivacySection />
        <FeaturesSection />
        <TechStackSection />
        <ArchitectureSection />
        <AudienceSection />
        <RoadmapSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
