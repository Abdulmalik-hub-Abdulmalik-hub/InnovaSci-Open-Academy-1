import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
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
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <CourseCatalog />
        <LearningPathsSection />
        <WhyChooseSection />
        <CategoriesSection />
        <CertificatePreview />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}