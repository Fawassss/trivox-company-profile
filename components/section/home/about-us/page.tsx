"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

const AnimatedText = ({ text, progress, isMobile }: { text: string; progress: any; isMobile: boolean }) => {
    const words = text.split(" ");

    return (
        <span className="flex flex-wrap gap-x-[0.3em]">
            {words.map((word, i) => {
                // Reveal words between 0.05 and 0.5 of the total scroll
                const start = 0.05 + (i / words.length) * 0.45;
                const end = start + (1 / words.length) * 0.45;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [start, end], [0.4, 1]);

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

export default function AboutUs() {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const desktopScroll = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Mobile scroll tracks the container as it moves through the viewport
    const mobileScroll = useScroll({
        target: containerRef,
        offset: ["start 90%", "start 10%"],
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const scrollYProgress = isMobile ? mobileScroll.scrollYProgress : desktopScroll.scrollYProgress;

    return (
        <section id="about-us" ref={containerRef} className="relative h-fit md:h-[300vh] bg-white text-black font-poppins selection:bg-black selection:text-white">
            <div className="md:sticky md:top-0 h-auto md:h-screen w-full flex flex-col overflow-hidden py-[40vw] md:py-0">

                {/* Content Section */}
                <div className="flex-grow flex flex-col justify-center px-[4vw] md:px-[8vw]">
                    {/* Label and Star */}
                    <div className="flex items-center gap-[0.5vw] mb-[4vw]">
                        <Image
                            src="/images/star.svg"
                            alt="star"
                            width={20}
                            height={20}
                            className="w-[1.5vw] h-[1.5vw] md:block hidden"
                        />
                        <span className="text-[4vw] md:text-[1.5vw] font-normal uppercase tracking-wider">About us</span>
                    </div>

                    {/* Main Text with Scroll Animation */}
                    <div className="w-full max-w-[100%]">
                        <h2 className="text-[4vw] md:text-[4vw] lg:text-[3.2vw] font-normal leading-[1.2]">
                            <AnimatedText
                                progress={scrollYProgress}
                                isMobile={isMobile}
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
                        className="mt-[5vh] lg:mt-[10vh] flex flex-row justify-between items-end gap-[4vw] w-full"
                    >
                        {/* Left Text */}
                        <div className="flex-1 pb-[1vw] md:pb-[1.5vw]">
                            <div className="overflow-hidden">
                                <motion.p
                                    variants={textVariants}
                                    className="text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] font-normal leading-tight cursor-default whitespace-nowrap"
                                >
                                    we came to
                                </motion.p>
                            </div>
                            <div className="overflow-hidden">
                                <motion.p
                                    variants={textVariants}
                                    className="text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] font-normal leading-tight cursor-default whitespace-nowrap"
                                >
                                    change the world
                                </motion.p>
                            </div>
                        </div>

                        {/* Right Text */}
                        <div className="flex flex-col items-end shrink-0">
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
                                            variants={textVariants}
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
