"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
        <section className="relative w-full min-h-screen bg-white pt-[100px] md:pt-[150px] overflow-hidden flex flex-col items-center justify-start pb-20">
            <div className="w-full max-w-[1440px] px-4 md:px-6 flex flex-col gap-0 select-none">

                {/* Row 1: Image + DIGITAL */}
                <div className="flex items-end mb-0 lg:mb-2 text-black">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-[200px] h-[225px] md:w-[264px] md:h-[320px] shrink-0 z-20"
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
                            className="font-anton text-[110px] sm:text-[180px] md:text-[260px] lg:text-[320px] leading-[0.9] text-black uppercase tracking-[0.01em] whitespace-nowrap"
                        >
                            DIGITAL
                        </motion.h1>
                    </div>
                </div>

                {/* Row 2: ELEVATION + Star */}
                <div className="relative w-full flex justify-start mt-0">
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: ease }}
                        className="relative inline-block"
                    >
                        <h1 className="font-anton text-[110px] sm:text-[180px] md:text-[260px] lg:text-[320px] leading-[0.9] text-black uppercase tracking-[-0.01em] whitespace-nowrap">
                            ELEVATION
                        </h1>

                        {/* Star rotating after entry */}
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 1.4 // Wait for slide to finish
                            }}
                            className="absolute top-0 right-[-15%] md:right-[-25%] lg:right-[-18%] -translate-y-[65%] pointer-events-none"
                        >
                            <div className="relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[350px] lg:h-[350px]">
                                <Image
                                    src="/images/star.svg"
                                    alt="Star"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Row 3: STUDIO + Description */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mt-0 md:mt-4 gap-4 lg:gap-10">
                    <div className="order-2 lg:order-1">
                        <motion.h1
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6, ease: ease }}
                            className="font-anton text-[110px] sm:text-[180px] md:text-[260px] lg:text-[320px] leading-[0.9] text-black uppercase tracking-[-0.01em] whitespace-nowrap"
                        >
                            STUDIO
                        </motion.h1>
                    </div>


                    {/* Staggered description animation */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="order-1 lg:order-2 max-w-[450px] lg:max-w-[550px] lg:mb-12 xl:mb-16"
                    >
                        <div className="flex flex-wrap items-start justify-start gap-x-[0.35em] gap-y-0 text-left">
                            {words.map((word, idx) => (
                                <div key={idx} className="overflow-hidden">
                                    <motion.span
                                        variants={wordVariants}
                                        className="inline-block font-poppins font-normal text-[18px] md:text-[22px] lg:text-[24px] leading-[1.4] text-black"
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
