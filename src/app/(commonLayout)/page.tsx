import { HowtoStartSection } from "@/components/ui/HowToStartSection/HowtoStartSection";
import { CallToAction } from "@/components/module/Landing/cta";
import { FeatureSection } from "@/components/module/Landing/feature-section";
import { Testimonials } from "@/components/module/Landing/testimonials-section";
import { HeroSection } from "@/components/ui/Hero";
import { Metadata } from "next";
import { Contact } from "@/components/ui/Contact/contact";
import { FaqsSection } from "@/components/ui/About/faqs-page";
import { RolesSection } from "@/components/module/Landing/roles-section";

export default function CommonLayoutHomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <RolesSection />
      <HowtoStartSection />
      <Testimonials />
      <CallToAction />
      <Contact/>
      <FaqsSection/>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Splitease! Explore our services and offerings.",
};
