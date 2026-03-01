"use client";

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
        position: { top: "5%", left: "10%" }
    },
    {
        id: 2,
        title: "Next Level Execution",
        description: "“Jarang banget nemu team yang ngerti vision dan langsung translate itu jadi real impact. The execution is clean, sharp, and very scalable.”",
        name: "Shandy Pratama",
        role: "Product Manager",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShandyPratama",
        stars: 5,
        position: { top: "15%", left: "60%" }
    },
    {
        id: 3,
        title: "Super Polished",
        description: "“From UI to performance, semuanya terasa well-optimized. It's not just aesthetic, but also functional. That’s rare.”",
        name: "Rizky Aditya",
        role: "Tech Lead",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RizkyAditya",
        stars: 5,
        position: { top: "25%", left: "15%" }
    },
    {
        id: 4,
        title: "Built With Clarity",
        description: "“They really understand clarity in design. No unnecessary complexity, just smart decisions and solid execution.”",
        name: "Dimas Saputra",
        role: "UI/UX Designer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DimasSaputra",
        stars: 5,
        position: { top: "35%", left: "55%" }
    },
    {
        id: 5,
        title: "High Attention to Detail",
        description: "“Detail kecil pun diperhatiin. Micro-interaction-nya subtle tapi impactful. That’s the kind of refinement I appreciate.”",
        name: "Aldi Ramadhan",
        role: "Creative Director",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AldiRamadhan",
        stars: 5,
        position: { top: "45%", left: "5%" }
    },
    {
        id: 6,
        title: "Strategic & Visionary",
        description: "“Not just building products, but building long-term vision. The strategic thinking behind it is impressive.”",
        name: "Bagas Wicaksono",
        role: "Business Consultant",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=BagasWicaksono",
        stars: 5,
        position: { top: "55%", left: "50%" }
    },
    {
        id: 7,
        title: "Modern & Bold",
        description: "“Branding-nya bold tapi tetap elegant. It speaks confidence without being loud.”",
        name: "Nabila Putri",
        role: "Brand Strategist",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=NabilaPutri",
        stars: 5,
        position: { top: "65%", left: "12%" }
    },
    {
        id: 8,
        title: "Performance Driven",
        description: "“Speed, responsiveness, and clean architecture. Ini bukan cuma visually good, but technically strong.”",
        name: "Rafi Akbar",
        role: "Fullstack Engineer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=RafiAkbar",
        stars: 5,
        position: { top: "75%", left: "60%" }
    },
    {
        id: 9,
        title: "Investor-Ready Quality",
        description: "“Kalau present ke investor pakai product ini, confidence naik 200%. It feels mature and market-ready.”",
        name: "Sinta Maharani",
        role: "Startup Advisor",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SintaMaharani",
        stars: 5,
        position: { top: "85%", left: "20%" }
    },
    {
        id: 10,
        title: "Clean Architecture",
        description: "“Under the hood-nya solid banget. Struktur dan logic-nya scalable, not just quick-fix development.”",
        name: "Yoga Prasetyo",
        role: "Backend Engineer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=YogaPrasetyo",
        stars: 5,
        position: { top: "90%", left: "55%" }
    },
    {
        id: 11,
        title: "Premium Experience",
        description: "“The whole experience feels intentional. Dari first impression sampai interaction terakhir, semuanya cohesive.”",
        name: "Ilham Fauzan",
        role: "Digital Strategist",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=IlhamFauzan",
        stars: 5,
        position: { top: "30%", left: "40%" }
    },
    {
        id: 12,
        title: "Future-Proof Thinking",
        description: "“They don’t just build for today. Everything feels future-proof and adaptable for growth.”",
        name: "Kevin Ardiansyah",
        role: "Growth Lead",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KevinArdiansyah",
        stars: 5,
        position: { top: "70%", left: "35%" }
    }
];

export default function ClientFeedback() {
    return (
        <section id="testimonials" className="relative w-full h-[400vh] bg-white">
            {/* Background Text - Sticky */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">
                <div className="flex flex-col items-center select-none pointer-events-none">
                    <h2 className="font-anton text-[120px] md:text-[180px] lg:text-[240px] leading-[0.85] text-[#010101] text-center uppercase">
                        CLIENT
                    </h2>
                    <h2 className="font-anton text-[120px] md:text-[180px] lg:text-[240px] leading-[0.85] text-[#010101] text-center uppercase">
                        FEEDBACK
                    </h2>
                </div>
            </div>

            {/* Scrolling Cards Container */}
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                <div className="relative w-full h-full container mx-auto">
                    {feedbackData.map((card) => (
                        <FeedbackCard key={card.id} {...card} />
                    ))}
                </div>
            </div>

            {/* Mobile View - Static Grid (Alternative) */}
            <div className="lg:hidden bg-white pb-20 relative z-20">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {feedbackData.map((card) => (
                        <FeedbackCard key={card.id} {...card} isStatic />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeedbackCard({ title, description, name, role, image, stars, position, isStatic }: any) {
    const style = isStatic ? {} : {
        position: 'absolute' as any,
        ...position,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            style={style}
            className={`w-[395px] min-h-[346px] bg-[#010101]/95 p-8 flex flex-col gap-8 rounded-sm text-white shadow-2xl backdrop-blur-md pointer-events-auto transition-shadow hover:shadow-red-500/10 ${isStatic ? "relative w-full" : ""
                }`}
        >
            {/* Stars */}
            <div className="flex justify-end gap-[6px]">
                {[...Array(stars)].map((_, i) => (
                    <Image
                        key={i}
                        src="/images/star.svg"
                        alt="star"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        unoptimized
                    />
                ))}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 flex-grow">
                <h3 className="font-poppins font-bold text-[24px] leading-[1.1]">
                    {title}
                </h3>
                <p className="font-poppins font-normal text-[16px] leading-[1.3] opacity-80">
                    {description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 mt-auto">
                <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden border border-white/20">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-poppins font-bold text-[18px] leading-[1.1]">
                        {name}
                    </span>
                    <span className="font-poppins font-normal text-[16px] leading-[1.1] opacity-60">
                        {role}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
