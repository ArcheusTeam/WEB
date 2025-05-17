import type { JSX } from 'react';
import { NavigationBar } from '@/components/bar/navigationBar.tsx';
import { HeroSection } from '@/components/hero/heroSection.tsx';
import { AboutSection } from '@/components/about/aboutSection.tsx';
import '@/index.css';
import { AnimatedSection } from '@/page/landing/AnimatedSection.tsx';
import { PricingSection } from '@/components/pricing/pricingSection.tsx';
import TestimonialSection from '@/components/testimonial/testimonialSection.tsx';
import { FooterSection } from '@/components/footer/footer.tsx';
import { SuccessStoriesSection } from '@/components/story/successStories.tsx';

const Landing = (): JSX.Element => {
  const sections = [
    {
      id: 'hero',
      component: <HeroSection />,
    },
    {
      id: 'about',
      component: <AboutSection />,
    },
    {
      id: 'success-stories',
      component: <SuccessStoriesSection />,
    },
    {
      id: 'pricing',
      component: <PricingSection />,
    },
    {
      id: 'testimonial',
      component: <TestimonialSection />,
    },
    {
      id: 'footer',
      component: <FooterSection />,
    },
  ];

  const navList = [
    { name: 'À propos', href: '#about' },
    { name: 'Offres exclusives', href: '#pricing' },
    { name: 'Succès', href: '#success-stories' },
    { name: '', href: '#quick-start' },
    { name: '', href: '#community' },
    { name: 'Connexion', href: '/login' },
  ];

  return (
    <div className="relative bg-black overflow-x-hidden scroll-smooth">
      <NavigationBar elements={navList} />
      <main className="flex flex-col">
        {sections.map((section) => (
          <AnimatedSection key={section.id} className="w-full">
            <div id={section.id}>{section.component}</div>
          </AnimatedSection>
        ))}
      </main>
    </div>
  );
};

export default Landing;
