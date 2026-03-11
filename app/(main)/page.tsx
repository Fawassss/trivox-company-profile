import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Hero from "@/components/section/home/hero/page";
import Marquee from "@/components/section/home/marquee/page";
import AboutUs from "@/components/section/home/about-us/page";
import Services from "@/components/section/home/service/page";
import Work from "@/components/section/home/work/page";
import Feedback from "@/components/section/home/feedback/page";
import Footer from "@/components/ui/Footer";
import CTA from "@/components/section/home/cta/page";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <AboutUs />
          <Work />
          <Services />
          <Feedback />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
