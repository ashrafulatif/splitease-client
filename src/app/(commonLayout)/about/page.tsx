import { FaqsSection } from "@/components/ui/About/faqs-page";
import { Metadata } from "next";

const AboutPage = () => {
  return (
    <div className="py-16">
      <FaqsSection />
    </div>
  );
};

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Splitease and our mission to simplify shared living.",
};

export default AboutPage;
