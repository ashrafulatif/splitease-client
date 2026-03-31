import { HowtoStartSection } from "@/components/ui/HowToStartSection/HowtoStartSection";
import { CallToAction } from "@/components/module/Landing/cta";
import { FeatureSection } from "@/components/module/Landing/feature-section";
import { Testimonials } from "@/components/module/Landing/testimonials-section";
import { HeroSection } from "@/components/ui/Hero";
import { Metadata } from "next";

export default function CommonLayoutHomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <HowtoStartSection />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Splitease! Explore our services and offerings.",
};
