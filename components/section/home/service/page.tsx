"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const services = [
    { id: "01", title: "BRAND IDENTITY", image: "/images/service1.JPG" },
    { id: "02", title: "WEBSITE DEVELOPMENT", image: "/images/service2.JPG" },
    { id: "03", title: "CREATIVE DIRECTION", image: "/images/service3.JPG" },
    { id: "04", title: "MOBILE APPS DEVELOPMENT", image: "/images/service4.JPG" },
    { id: "05", title: "UI/UX DESIGN", image: "/images/service5.JPG" },
    { id: "06", title: "DIGITAL EXPERIENCE & INTERACTION", image: "/images/service6.JPG" },
    { id: "07", title: "GAME DEVELOPMENT", image: "/images/service7.png" },
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [activeIndex, setActiveIndex] = useState(0);

    // Smooth scroll progress for child components
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Track active index based on scroll progress
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const index = Math.min(Math.floor(v * services.length), services.length - 1);
        if (index !== activeIndex && index >= 0) {
            setActiveIndex(index);
        }
    });

    const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
                delayChildren: 0.05
            }
        }
    };

    const textVariants: Variants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.45,
                ease: ease
            }
        }
    };

    return (
        <section id="services" ref={containerRef} className="relative h-[500vh] bg-white text-black font-poppins selection:bg-black selection:text-white">

            <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col overflow-hidden">
                <div className="px-[4vw] md:px-[8vw] py-[3vh]">
                    <div className="w-full">

                        {/* Header */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col lg:flex-row justify-between items-baseline gap-[2vw]"
                        >
                            <div className="overflow-hidden">
                                <h2 className="font-anton text-[12vw] md:text-[10vw] lg:text-[9vw] leading-none uppercase select-none flex">
                                    {"OUR SERVICES".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            variants={textVariants}
                                            className="inline-block"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </h2>
                            </div>
                            <div className="overflow-hidden lg:mb-[1vw]">
                                <motion.span
                                    variants={textVariants}
                                    className="font-poppins text-[4vw] md:text-[1.8vw] leading-none select-none inline-block border-b border-black pb-[0.3vw]"
                                >
                                    What We Do
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="relative flex-grow flex flex-col w-full">
                    {/* Sticky Image Overlay (Desktop) */}
                    <div className="hidden lg:block absolute left-[4vw] top-1/2 -translate-y-1/2 w-[32vw] aspect-square overflow-hidden bg-gray-100 z-10 pointer-events-none rounded-md">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={services[activeIndex].image}
                                    alt={services[activeIndex].title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Active Image (Mobile) */}
                    <div className="lg:hidden w-full px-[4vw] md:px-[8vw] mb-[3vh] flex flex-col justify-center items-center">
                        <div className="relative aspect-square h-[42dvh] overflow-hidden bg-gray-100 rounded-md">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={services[activeIndex].image}
                                        alt={services[activeIndex].title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Services List - Full Width Rows */}
                    <div className="mt-4 lg:mt-auto flex flex-col w-full border-t border-black/10 pb-[2vh]">

                        {services.map((service, index) => (
                            <ServiceItem
                                key={index}
                                id={service.id}
                                title={service.title}
                                progress={smoothProgress}
                                index={index}
                                total={services.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ServiceItem({ id, title, progress, index, total }: { id: string; title: string, progress: any, index: number, total: number }) {
    const step = 1 / total;
    const start = index * step;
    const end = (index + 1) * step;

    // Determine if this item is active based on scroll progress
    const isActive = useTransform(progress,
        [start, start + step * 0.1, end - step * 0.1, end],
        [false, true, true, false]
    );

    // Track active state as a boolean for simpler animations
    const [active, setActive] = useState(false);
    isActive.on("change", (v) => setActive(v));

    const text = `${id} - ${title}`;

    return (
        <div
            className="group relative w-full h-[12vw] md:h-[8vw] lg:h-[5.2vw] flex items-center justify-end px-[4vw] md:px-[8vw] lg:pl-[45vw] border-b border-black/10 last:border-b-0 cursor-pointer overflow-hidden"
        >

            {/* Background Color Transition Overlay */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: active ? "0%" : "-100%" }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="absolute inset-0 bg-[#F80000] z-0"
            />

            <div className="relative z-10 flex items-center gap-[4vw] lg:gap-[6vw] select-none">
                <div className="h-[8vw] md:h-[4vw] overflow-hidden flex flex-col items-end">
                    <div className="flex">
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                animate={active ? { y: "-100%" } : { y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.33, 1, 0.68, 1],
                                    delay: i * 0.01
                                }}
                                className="font-anton text-[5vw] md:text-[3.5vw] lg:text-[2.8vw] leading-[1.2] uppercase text-black inline-block h-[8vw] md:h-[4vw] flex items-center"
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
                                animate={active ? { y: "-100%" } : { y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.33, 1, 0.68, 1],
                                    delay: i * 0.01
                                }}
                                className="font-anton text-[5vw] md:text-[3.5vw] lg:text-[2.8vw] leading-[1.2] uppercase text-white inline-block h-[8vw] md:h-[4vw] flex items-center"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Arrow Icon */}
                <motion.div
                    initial={{ opacity: 0, x: "-2vw", scale: 0.5 }}
                    animate={active ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: "-2vw", scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-white"
                >
                    <svg
                        className="w-[6vw] h-[6vw] md:w-[3vw] md:h-[3vw]"
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