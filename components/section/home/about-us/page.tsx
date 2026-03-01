"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const textVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
        },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const AnimatedText = ({ text }: { text: string }) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "end 0.6"],
    });

    const words = text.split(" ");

    return (
        <span ref={containerRef} className="flex flex-wrap gap-x-[0.3em]">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, end], [0.4, 1]);

                return (
                    <motion.span
                        key={i}
                        style={{ opacity }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                );
            })}
        </span>
    );
};
const marqueeItems = [
    "DESIGN LAB",
    "EVOLVE",
    "CREATIVE STUDIO",
    "IMPACT"
];

const Marquee = () => {
    return (
        <div className="bg-[#010101] py-[24px] overflow-hidden flex items-center h-[122px] w-full">
            <motion.div
                className="flex whitespace-nowrap items-center shrink-0"
                animate={{ x: [0, "-50%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear"
                }}
            >
                {/* Properly duplicated set for infinite loop */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center shrink-0">
                        {marqueeItems.map((text, idx) => (
                            <div key={idx} className="flex items-center shrink-0">
                                <span className="font-anton text-[40px] lg:text-[64px] font-normal text-white uppercase leading-none px-[30px] lg:px-[40px]">
                                    {text}
                                </span>
                                <div className="flex items-center justify-center shrink-0">
                                    <Image
                                        src="/images/star.svg"
                                        alt="star"
                                        width={64}
                                        height={64}
                                        className="w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] block translate-y-[-2px] lg:translate-y-[-4px]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function AboutUs() {
    return (
        <section className="bg-white text-black font-poppins selection:bg-black selection:text-white">
            {/* Marquee Section */}
            <Marquee />

            {/* Content Section */}
            <div className="container mx-auto px-6 lg:px-[120px] py-[100px] lg:py-[160px]">
                {/* Label and Star */}
                <div className="flex items-center gap-2 mb-[48px]">
                    <Image
                        src="/images/star.svg"
                        alt="star"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]"
                    />
                    <span className="text-[24px] font-normal">About us</span>
                </div>

                {/* Main Text with Scroll Animation */}
                <div className="max-w-[1240px]">
                    <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-normal leading-tight">
                        <AnimatedText
                            text="We came together with a shared vision to build inspiring brands and impactful designs. From a small team of passionate creatives, we’ve grown into a creative studio dedicated to transforming ideas into meaningful, lasting digital experiences."
                        />
                    </h2>
                </div>

                {/* Secondary Info Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-[100px] lg:mt-[160px] flex flex-col-reverse lg:flex-row justify-between items-start lg:items-end gap-12"
                >
                    {/* Left Text */}
                    <div className="max-w-[180px]">
                        <div className="overflow-hidden">
                            <motion.p
                                variants={textVariants}
                                className="text-[18px] font-normal leading-tight cursor-default"
                            >
                                we came to
                            </motion.p>
                        </div>
                        <div className="overflow-hidden">
                            <motion.p
                                variants={textVariants}
                                className="text-[18px] font-normal leading-tight cursor-default"
                            >
                                change the world
                            </motion.p>
                        </div>
                    </div>

                    {/* Right Text */}
                    <div className="flex flex-col items-end">
                        {[
                            "A CREATIVE HUB FOR",
                            "TODAY'S VISIONARIES"
                        ].map((line, idx) => (
                            <div key={idx} className="overflow-hidden">
                                <motion.h3
                                    variants={textVariants}
                                    className="font-anton text-[48px] md:text-[64px] lg:text-[96px] leading-[1.2] text-right uppercase"
                                >
                                    {line}
                                </motion.h3>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
