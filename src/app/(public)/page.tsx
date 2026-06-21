import { HeroSection } from "@/components/landing/hero-section";
import { CourseCatalog } from "@/components/landing/course-catalog";
import { LearningPathsSection } from "@/components/landing/learning-paths-section";
import { WhyChooseSection } from "@/components/landing/why-choose-section";
import { CategoriesSection } from "@/components/landing/categories-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CertificatePreview } from "@/components/landing/certificate-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CourseCatalog />
      <LearningPathsSection />
      <WhyChooseSection />
      <CategoriesSection />
      <CertificatePreview />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}