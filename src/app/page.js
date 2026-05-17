import AboutSection from "@/components/aboutSection";
import AcademySection from "@/components/academySection";
import FAQSection from "@/components/faq";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import StorySection from "@/components/storySection";

export default function Page() {
  return (
    <div className="relative bg-[#F5F2EC]">
      <Header />
      <Hero />
      <StorySection />
      <AcademySection />
      <AboutSection />

      <FAQSection />
      <Footer />
    </div>
  );
}
