import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/providers/SmoothSctoll";
import Hero from "@/components/section/home/hero/page";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white text-black selection:bg-black selection:text-white">
        <Navbar />

        <main>
          <Hero />
          {/* Add some space for testing scroll */}
          <div className="h-[200vh] bg-white" />
        </main>
      </div>
    </SmoothScroll>
  );
}


