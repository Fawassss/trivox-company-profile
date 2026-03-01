"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

const services = [
    { id: "01", title: "BRAND IDENTITY" },
    { id: "02", title: "WEBSITE DEVELOPMENT" },
    { id: "03", title: "CREATIVE DIRECTION" },
    { id: "04", title: "MOBILE APPS DEVELOPMENT" },
    { id: "05", title: "UI/UX DESIGN" },
    { id: "06", title: "DIGITAL EXPERIENCE & INTERACTION" },
];

export default function Services() {
    const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
    // ini sedikit lebih responsive dari 0.33 curve kamu

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,   // lebih cepat dari 0.05
                delayChildren: 0.05      // lebih cepat dari 0.2
            }
        }
    };

    const textVariants: Variants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.45,  // dari 0.8 → 0.45
                ease: ease
            }
        }
    };

    return (
        <section id="services" className="bg-white text-black pt-[100px] pb-[200px] overflow-hidden w-full">
            <div className="px-4 md:px-[60px] lg:px-[120px] mb-[100px]">
                <div className="container mx-auto max-w-[1440px]">
                    {/* Header */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row justify-between items-baseline gap-4"
                    >
                        <div className="overflow-hidden">
                            <h2 className="font-anton text-[80px] md:text-[120px] lg:text-[160px] leading-none uppercase select-none flex">
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
                        <div className="overflow-hidden lg:mb-4">
                            <motion.span
                                variants={textVariants}
                                className="font-poppins text-[18px] md:text-[24px] leading-none select-none inline-block"
                            >
                                What We Do
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Services List - Full Width */}
            <div className="flex flex-col w-full">
                {services.map((service, index) => (
                    <ServiceItem
                        key={index}
                        id={service.id}
                        title={service.title}
                    />
                ))}
            </div>
        </section>
    );
}

function ServiceItem({ id, title }: { id: string; title: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const text = `${id} - ${title}`;

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative w-full h-[91px] flex items-center justify-end px-4 md:px-[30px] lg:px-[40px] border-b border-black/10 last:border-b-0 cursor-pointer overflow-hidden transition-colors duration-300"
        >
            {/* Background Color Transition Overlay */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "0%" : "-100%" }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="absolute inset-0 bg-[#F80000] z-0"
            />

            <div className="relative z-10 flex items-center gap-6 lg:gap-12 select-none">
                <div className="h-[68px] overflow-hidden flex flex-col items-end">
                    <div className="flex">
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                animate={isHovered ? { y: -68 } : { y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.33, 1, 0.68, 1],
                                    delay: i * 0.01
                                }}
                                className="font-anton text-[32px] md:text-[48px] lg:text-[56px] leading-[1.2] uppercase text-black inline-block h-[68px]"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="flex">
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                animate={isHovered ? { y: -68 } : { y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.33, 1, 0.68, 1],
                                    delay: i * 0.01
                                }}
                                className="font-anton text-[32px] md:text-[48px] lg:text-[56px] leading-[1.2] uppercase text-white inline-block h-[68px]"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.5 }}
                    animate={isHovered ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-white"
                >
                    <svg
                        width="72"
                        height="72"
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
        </motion.div>
    );
}
