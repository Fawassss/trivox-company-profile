import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/providers/SmoothSctoll";
import Hero from "@/components/section/home/hero/page";
import AboutUs from "@/components/section/home/about-us/page";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white text-black selection:bg-black selection:text-white">
        <Navbar />

        <main>
          <Hero />
          <AboutUs />
        </main>
      </div>
    </SmoothScroll>
  );
}


