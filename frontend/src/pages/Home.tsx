import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import DashboardPreview from "../components/home/DashboardPreview";
import AISection from "../components/home/AISection";
import Stats from "../components/home/Stats";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <DashboardPreview />
      <AISection />
      <Stats />
      <CTA />
      <Footer />
    </>
  );
}