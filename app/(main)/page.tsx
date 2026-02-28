import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/providers/SmoothSctoll";
import Hero from "@/components/section/home/hero/page";
import AboutUs from "@/components/section/home/about-us/page";
import Services from "@/components/section/home/service/page";
import Work from "@/components/section/home/work/page";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Navbar />

        <main>
          <Hero />
          <AboutUs />
          <Work />
          <Services />
        </main>
      </div>
    </SmoothScroll>
  );
}
