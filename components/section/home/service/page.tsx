"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const services = [
    { id: "01", title: "BRAND IDENTITY" },
    { id: "02", title: "WEBSITE DEVELOPMENT" },
    { id: "03", title: "CREATIVE DIRECTION" },
    { id: "04", title: "MOBILE APPS DEVELOPMENT" },
    { id: "05", title: "UI/UX DESIGN" },
    { id: "06", title: "DIGITAL EXPERIENCE & INTERACTION" },
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} id="services" className="relative h-[400vh] bg-white text-black w-full">
            <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
                {/* Services List */}
                <div className="flex flex-col w-full h-full border-t border-black/10">
                    {services.map((service, index) => (
                        <ServiceItem
                            key={index}
                            id={service.id}
                            title={service.title}
                            index={index}
                            progress={scrollYProgress}
                            total={services.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceItem({
    id,
    title,
    index,
    progress,
    total
}: {
    id: string;
    title: string;
    index: number;
    progress: any;
    total: number
}) {
    const text = `${id} - ${title}`;

    // Define the range for this specific item
    const rangeStep = 1 / total;
    const start = index * rangeStep;
    const end = (index + 1) * rangeStep;

    // Multi-point transform to create an "active window"
    const buffer = rangeStep * 0.15;

    // Animates 0 -> 1 at start, stays at 1, returns 1 -> 0 at end
    const activeState = useTransform(
        progress,
        [start, start + buffer, end - buffer, end],
        [0, 1, 1, 0]
    );

    // Spring for smoother scroll reaction
    const springActive = useSpring(activeState, { stiffness: 100, damping: 25, mass: 0.5 });

    // Derived transforms based on springActive
    const springOverlayX = useTransform(springActive, [0, 1], ["-100%", "0%"]);
    const springTextY = useTransform(springActive, [0, 1], ["0%", "-100%"]);
    const arrowOpacity = useTransform(springActive, [0, 1], [0, 1]);
    const arrowScale = useTransform(springActive, [0, 1], [0.5, 1]);
    const arrowX = useTransform(springActive, [0, 1], ["-2vw", "0vw"]);

    return (
        <div className="relative w-full h-[16.67vh] flex items-center justify-end px-[4vw] md:px-[8vw] border-b border-black/10 last:border-b-0 cursor-pointer overflow-hidden">
            {/* Background Color Transition Overlay */}
            <motion.div
                style={{ x: springOverlayX }}
                className="absolute inset-0 bg-[#F80000] z-0"
            />

            <div className="relative z-10 flex items-center gap-[4vw] lg:gap-[6vw] select-none text-right">
                <div className="h-[10vw] md:h-[5vw] overflow-hidden flex flex-col items-end">
                    {/* Layer 1: Black Text */}
                    <div className="flex">
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                style={{ y: springTextY }}
                                className="font-anton text-[6vw] md:text-[4vw] lg:text-[3.5vw] leading-[1.2] uppercase text-black inline-block h-[10vw] md:h-[5vw] flex items-center"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                    {/* Layer 2: White Text */}
                    <div className="flex">
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                style={{ y: springTextY }}
                                className="font-anton text-[6vw] md:text-[4vw] lg:text-[3.5vw] leading-[1.2] uppercase text-white inline-block h-[10vw] md:h-[5vw] flex items-center"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Arrow Icon */}
                <motion.div
                    style={{ opacity: arrowOpacity, x: arrowX, scale: arrowScale }}
                    className="text-white"
                >
                    <svg
                        className="w-[8vw] h-[8vw] md:w-[4vw] md:h-[4vw]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}

