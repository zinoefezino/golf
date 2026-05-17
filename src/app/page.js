import AboutSection from "@/components/aboutSection";
import ClubExperienceSection from "@/components/experience";

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
      <ClubExperienceSection />
      <AboutSection />

      <FAQSection />
      <Footer />
    </div>
  );
}
