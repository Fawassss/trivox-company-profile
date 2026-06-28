"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const feedbackData = [
    {
        id: 1,
        title: "Truly Game-Changing",
        description: "“Honestly, this product is a game-changer. Dari segi execution sampai detail experience-nya kerasa banget thoughtfully crafted. It feels premium without trying too hard.”",
        name: "Faris Maulana",
        role: "Startup Founder",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=FarisMaulana",
        stars: 5,
        position: { top: "5%", left: "0%" },
        mobilePosition: { top: "3%", left: "5%" }
    },
    {
        id: 2,
        title: "Next Level Execution",
        description: "“Jarang banget nemu team yang ngerti vision dan langsung translate itu jadi real impact. The execution is clean, sharp, and very scalable.”",
        name: "Shandy Pratama",
        role: "Product Manager",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShandyPratama",
        stars: 5,
        position: { top: "15%", left: "75%" },
        mobilePosition: { top: "15%", left: "25%" }
    },
    {
        id: 3,
        title: "Super Polished",
        description: "“From UI to performance, semuanya terasa well-optimized. It's not just aesthetic, but also functional. That’s rare.”",
        name: "Rizky Aditya",
        role: "Tech Lead",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RizkyAditya",
        stars: 5,
        position: { top: "25%", left: "10%" },
        mobilePosition: { top: "22%", left: "10%" }
    },
    {
        id: 4,
        title: "Built With Clarity",
        description: "“They really understand clarity in design. No unnecessary complexity, just smart decisions and solid execution.”",
        name: "Dimas Saputra",
        role: "UI/UX Designer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DimasSaputra",
        stars: 5,
        position: { top: "35%", left: "70%" },
        mobilePosition: { top: "31%", left: "28%" }
    },
    {
        id: 5,
        title: "High Attention to Detail",
        description: "“Detail kecil pun diperhatiin. Micro-interaction-nya subtle tapi impactful. That’s the kind of refinement I appreciate.”",
        name: "Aldi Ramadhan",
        role: "Creative Director",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AldiRamadhan",
        stars: 5,
        position: { top: "45%", left: "5%" },
        mobilePosition: { top: "45%", left: "12%" }
    },
    {
        id: 6,
        title: "Strategic & Visionary",
        description: "“Not just building products, but building long-term vision. The strategic thinking behind it is impressive.”",
        name: "Bagas Wicaksono",
        role: "Business Consultant",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=BagasWicaksono",
        stars: 5,
        position: { top: "55%", left: "50%" },
        mobilePosition: { top: "54%", left: "35%" }
    },
    {
        id: 7,
        title: "Modern & Bold",
        description: "“Branding-nya bold tapi tetap elegant. It speaks confidence without being loud.”",
        name: "Nabila Putri",
        role: "Brand Strategist",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NabilaPutri",
        stars: 5,
        position: { top: "60%", left: "12%" },
        mobilePosition: { top: "62%", left: "5%" }
    },
    {
        id: 8,
        title: "Performance Driven",
        description: "“Speed, responsiveness, and clean architecture. Ini bukan cuma visually good, but technically strong.”",
        name: "Rafi Akbar",
        role: "Fullstack Engineer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RafiAkbar",
        stars: 5,
        position: { top: "75%", left: "75%" },
        mobilePosition: { top: "72%", left: "25%" }
    },
    {
        id: 9,
        title: "Investor-Ready Quality",
        description: "“Kalau present ke investor pakai product ini, confidence naik 200%. It feels mature and market-ready.”",
        name: "Sinta Maharani",
        role: "Startup Advisor",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SintaMaharani",
        stars: 5,
        position: { top: "85%", left: "0%" },
        mobilePosition: { top: "88%", left: "15%" }
    },
    {
        id: 10,
        title: "Clean Architecture",
        description: "“Under the hood-nya solid banget. Struktur dan logic-nya scalable, not just quick-fix development.”",
        name: "Yoga Prasetyo",
        role: "Backend Engineer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=YogaPrasetyo",
        stars: 5,
        position: { top: "90%", left: "55%" },
        mobilePosition: { top: "95%", left: "35%" }
    },
    {
        id: 11,
        title: "Premium Experience",
        description: "“The whole experience feels intentional. Dari first impression sampai interaction terakhir, semuanya cohesive.”",
        name: "Ilham Fauzan",
        role: "Digital Strategist",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=IlhamFauzan",
        stars: 5,
        position: { top: "30%", left: "40%" },
        mobilePosition: { top: "38%", left: "0%" }
    },
    {
        id: 12,
        title: "Future-Proof Thinking",
        description: "“They don’t just build for today. Everything feels future-proof and adaptable for growth.”",
        name: "Kevin Ardiansyah",
        role: "Growth Lead",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KevinArdiansyah",
        stars: 5,
        position: { top: "75%", left: "40%" },
        mobilePosition: { top: "80%", left: "0%" }
    }
];

export default function ClientFeedback() {
    return (
        <section id="testimonials" className="relative w-full h-[400vh] bg-white">
            {/* Background Text - Sticky */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 px-[4vw]">
                <div className="flex flex-col items-center select-none pointer-events-none gap-[2vw] md:gap-[3vw]">
                    <h2 className="font-anton text-[12vw] md:text-[12vw] lg:text-[12vw] leading-[0.8] text-[#010101] text-center uppercase">
                        CLIENT
                    </h2>
                    <h2 className="font-anton text-[12vw] md:text-[12vw] lg:text-[12vw] leading-[0.8] text-[#010101] text-center uppercase">
                        FEEDBACK
                    </h2>
                </div>
            </div>

            {/* Scattered Cards Container - All Devices */}
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                <div className="relative w-full h-full">
                    {feedbackData.map((card) => (
                        <FeedbackCard key={card.id} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeedbackCard({ title, description, name, role, image, stars, position, mobilePosition, isStatic }: any) {
    // We'll use a local check for clean style assignment
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Determine which position to use
    const activePosition = isMobile && mobilePosition ? mobilePosition : position;

    const finalStyle = isStatic ? {} : {
        position: 'absolute' as any,
        top: activePosition.top,
        left: isMobile && !mobilePosition
            ? `calc((100% - 10vw - 65vw) * (${parseInt(activePosition.left)} / 100) + 5vw)`
            : activePosition.left,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: "10vh" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0% -10% 0%" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            style={finalStyle}
            className={`w-[65vw] md:w-[45vw] lg:w-[25vw] min-h-[22vh] lg:min-h-[22vw] bg-[#010101]/95 p-[4vw] md:p-[3vw] flex flex-col gap-[2.5vw] md:gap-[2vw] rounded-sm text-white shadow-2xl backdrop-blur-md pointer-events-auto transition-shadow hover:shadow-red-500/10 ${isStatic ? "relative w-full" : ""
                }`}
        >
            {/* Stars */}
            <div className="flex justify-end gap-[0.5vw]">
                {[...Array(stars)].map((_, i) => (
                    <div key={i} className="relative w-[1.5vw] h-[1.5vw] md:w-[1vw] md:h-[1vw]">
                        <Image
                            src="/images/star.svg"
                            alt="star"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[2vw] flex-grow text-left">
                <h3 className="font-poppins font-bold text-[4.2vw] md:text-[2.2vw] lg:text-[1.6vw] leading-[1.1]">
                    {title}
                </h3>
                <p className="font-poppins font-normal text-[3.2vw] md:text-[1.4vw] lg:text-[1vw] leading-[1.4] opacity-80">
                    {description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-[2vw] md:gap-[1vw] mt-auto border-t border-white/10 pt-[2vw] md:pt-[1.5vw]">
                <div className="relative w-[7vw] h-[7vw] md:w-[4vw] md:h-[4vw] lg:w-[3vw] lg:h-[3vw] rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-poppins font-bold text-[3.2vw] md:text-[1.6vw] lg:text-[1.2vw] leading-[1.1]">
                        {name}
                    </span>
                    <span className="font-poppins font-normal text-[2.6vw] md:text-[1.4vw] lg:text-[1vw] leading-[1.1] opacity-60">
                        {role}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}