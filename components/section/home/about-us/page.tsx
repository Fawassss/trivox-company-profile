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

const AnimatedText = ({ text, progress }: { text: string; progress: any }) => {
    const words = text.split(" ");

    return (
        <span className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
            {words.map((word, i) => {
                // Reveal words between 0.05 and 0.5 of the total scroll
                const start = 0.05 + (i / words.length) * 0.45;
                const end = start + (1 / words.length) * 0.45;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [start, end], [0.1, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const blur = useTransform(progress, [start, end], ["6px", "0px"]);

                return (
                    <motion.span
                        key={i}
                        style={{ opacity, filter: `blur(${blur})` }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                );
            })}
        </span>
    );
};

export default function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Secondary animations linked to scroll
    const secondInfoOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
    const secondInfoY = useTransform(scrollYProgress, [0.65, 0.85], ["4vw", "0vw"]);

    return (
        <section ref={containerRef} id="about-us" className="relative h-[400vh] bg-white text-black font-poppins selection:bg-black selection:text-white">
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
                {/* Content Section */}
                <div className="flex-1 w-full px-[4vw] md:px-[8vw] flex flex-col justify-center py-[5vh]">
                    {/* Label and Star */}
                    <div className="flex items-center gap-[0.5vw] mb-[4vw]">
                        <Image
                            src="/images/star.svg"
                            alt="star"
                            width={20}
                            height={20}
                            className="w-[1.5vw] h-[1.5vw]"
                        />
                        <span className="text-[2vw] md:text-[1.5vw] font-normal uppercase tracking-wider">About us</span>
                    </div>

                    {/* Main Text with Scroll Animation */}
                    <div className="w-full max-w-[100%]">
                        <h2 className="text-[5vw] md:text-[4vw] lg:text-[4vw] xl:text-[3.2vw] font-normal leading-[1.2]">
                            <AnimatedText
                                text="We came together with a shared vision to build inspiring brands and impactful designs. From a small team of passionate creatives, we’ve grown into a creative studio dedicated to transforming ideas into meaningful, lasting digital experiences."
                                progress={scrollYProgress}
                            />
                        </h2>
                    </div>

                    {/* Secondary Info Layout */}
                    <motion.div
                        style={{ opacity: secondInfoOpacity, y: secondInfoY }}
                        className="mt-[8vh] lg:mt-[12vh] flex flex-col-reverse lg:flex-row justify-between items-start lg:items-end gap-[4vw]"
                    >
                        {/* Left Text */}
                        <div className="max-w-[20vw]">
                            <div className="overflow-hidden">
                                <motion.p
                                    className="text-[1.2vw] font-normal leading-tight cursor-default"
                                >
                                    we came to
                                </motion.p>
                            </div>
                            <div className="overflow-hidden">
                                <motion.p
                                    className="text-[1.2vw] font-normal leading-tight cursor-default"
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
                            ].map((line, idx) => (idx === 0 ? (
                                <div key={idx} className="overflow-hidden">
                                    <motion.h3
                                        className="font-anton text-[7vw] md:text-[6vw] lg:text-[6.5vw] leading-[1.1] text-right uppercase"
                                    >
                                        {line}
                                    </motion.h3>
                                </div>
                            ) : (
                                <div key={idx} className="overflow-hidden">
                                    <section className="flex flex-col lg:flex-row items-center gap-[2vw]">
                                        <motion.h3
                                            className="font-anton text-[7vw] md:text-[6vw] lg:text-[6.5vw] leading-[1.1] text-right uppercase"
                                        >
                                            {line}
                                        </motion.h3>
                                    </section>
                                </div>
                            )))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
