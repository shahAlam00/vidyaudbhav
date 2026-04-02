import AboutUs from "@/components/home/AboutUs";
import ExpertTeamCarousel from "@/components/home/ExpertTeamCarousel";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Services from "@/components/home/Services";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChoose";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutUs />
      <Services />
      <Process />
      <ExpertTeamCarousel />
      <WhyChooseUs />
      <FAQ />
    </>
  );
}
