"use client";

import Image from "next/image";
import { motion, Variants, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Influence range (magnetic pull strength)
        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
};

const StaggeredRollingText = ({ text, className }: { text: string; className?: string }) => {
    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className={`relative flex overflow-hidden ${className}`}
        >
            {text.split("").map((char, i) => (
                <div key={i} className="relative">
                    <motion.div
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "100%" },
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.33, 1, 0.68, 1],
                            delay: i * 0.015,
                        }}
                        className="flex flex-col"
                    >
                        <span className="absolute bottom-full left-0">
                            {char === " " ? "\u00A0" : char}
                        </span>
                        <span>{char === " " ? "\u00A0" : char}</span>
                    </motion.div>
                </div>
            ))}
        </motion.div>
    );
};

const Hero = () => {
    const description = "Powering Brands with Imagination and Bold Impact — a digital elevation studio crafting meaningful experiences, distinctive identities, and bold digital solutions for modern brands.";
    const words = description.split(" ");

    const ease = [0.33, 1, 0.68, 1] as any;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
                delayChildren: 1.0
            }
        }
    };

    const wordVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: ease
            }
        }
    };

    return (
        <section id="home" className="relative w-full min-h-screen bg-white pt-[15vh] md:pt-[5vh] overflow-hidden flex flex-col items-center justify-start pb-[10vh]">
            <div className="w-full px-[8vw] md:px-[8vw] flex flex-col lg:gap-0 md:gap-6 gap-6 select-none">

                {/* Row 1: Image + DIGITAL */}
                <div className="flex items-end mb-0 lg:mb-[1vw] text-black">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-[20vw] h-[20vw] md:w-[14vw] md:h-[20vw] shrink-0 z-20"
                    >
                        <Image
                            src="/images/hero.webp"
                            alt="Hero Character"
                            fill
                            className="object-contain object-bottom grayscale"
                            priority
                        />
                    </motion.div>
                    <div className="relative flex-1">
                        <motion.h1
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: ease }}
                            className="font-anton text-[21vw] sm:text-[21vw] md:text-[20vw] lg:text-[20vw] xl:text-[17vw] leading-[0.90] text-black uppercase tracking-[0.01em] whitespace-nowrap"
                        >
                            <MagneticWrapper>
                                <StaggeredRollingText text="DIGITAL" className="cursor-pointer transition-colors duration-300" />
                            </MagneticWrapper>
                        </motion.h1>
                    </div>
                </div>

                {/* Row 2: ELEVATION + Star */}
                <div className="relative w-full flex justify-start mt-0">
                    <div className="relative inline-block">
                        <motion.h1
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4, ease: ease }}
                            className="font-anton text-[22vw] sm:text-[21vw] md:text-[20vw] lg:text-[20vw] xl:text-[17vw] leading-[0.90] text-black uppercase tracking-[-0.01em] whitespace-nowrap"
                        >
                            <MagneticWrapper>
                                <StaggeredRollingText text="ELEVATION" className="cursor-pointer transition-colors duration-300" />
                            </MagneticWrapper>
                        </motion.h1>

                        {/* Star rotating after entry */}
                        <motion.div
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            transition={{
                                opacity: { duration: 0.8, delay: 1.1 },
                                rotate: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: 1.1
                                }
                            }}
                            className="absolute top-0 right-[-10%] md:right-[-25%] lg:right-[-22%] -translate-y-[70%] lg:-translate-y-[60%] pointer-events-none"
                        >
                            <div className="relative w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] lg:w-[24vw] lg:h-[22vw]">
                                <Image
                                    src="/images/star.svg"
                                    alt="Star"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Row 3: STUDIO + Description */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mt-0 md:mt-[1.5vw] gap-[8vw] lg:gap-[2vw]">
                    <div className="order-1 lg:order-1">
                        <motion.h1
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6, ease: ease }}
                            className="font-anton text-[22vw] sm:text-[21vw] md:text-[20vw] lg:text-[20vw] xl:text-[17vw] leading-[0.90] text-black uppercase tracking-[-0.01em] whitespace-nowrap"
                        >
                            <MagneticWrapper>
                                <StaggeredRollingText text="STUDIO" className="cursor-pointer transition-colors duration-300" />
                            </MagneticWrapper>
                        </motion.h1>
                    </div>


                    {/* Staggered description animation */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="order-2 lg:order-2 max-w-[72vw] lg:max-w-[35vw] lg:mb-[3.5vw] xl:mb-[4.5vw]"
                    >
                        <div className="flex flex-wrap items-start justify-start gap-x-[0.35em] gap-y-0 text-left">
                            {words.map((word, idx) => (
                                <div key={idx} className="overflow-hidden">
                                    <motion.span
                                        variants={wordVariants}
                                        className="inline-block font-poppins font-normal text-[4.8vw] md:text-[1.6vw] lg:text-[1.2vw] leading-[1.4] text-black"
                                    >
                                        {word}
                                    </motion.span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;