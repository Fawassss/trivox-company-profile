import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/providers/SmoothSctoll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white text-black selection:bg-white selection:text-black">
        <Navbar />

        <main className="flex min-h-[200vh] flex-col items-center justify-center pt-[194px]">
          {/* Hero Section Placeholder */}
          <div className="flex flex-col items-center gap-12 text-center">
            <h2 className="text-6xl md:text-8xl font-poppins font-bold tracking-tighter">
              BEYOND THE <br /> VISUAL LIMIT
            </h2>
            <p className="max-w-xl text-lg text-zinc-400 font-poppins">
              Innovative digital solutions for modern businesses. We create stunning visual experiences that leave a lasting impression.
            </p>
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}

