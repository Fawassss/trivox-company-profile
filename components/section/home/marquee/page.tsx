"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const marqueeItems = [
    "DESIGN LAB",
    "EVOLVE",
    "CREATIVE STUDIO",
    "IMPACT"
];

const MarqueeSection = () => {
    return (
        <div className="bg-[#010101] py-[15vw] lg:py-[1.5vw] md:mt-0 lg:mt-[10vh] overflow-hidden flex items-center h-[10vw] w-full shrink-0 z-10 relative">
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
                                <span className="font-anton text-[10vw] lg:text-[5vw] font-normal text-white uppercase leading-none px-[4vw]">
                                    {text}
                                </span>
                                <div className="flex items-center justify-center shrink-0">
                                    <Image
                                        src="/images/star.svg"
                                        alt="star"
                                        width={64}
                                        height={64}
                                        className="w-[5vw] h-[5vw] lg:w-[4.5vw] lg:h-[4.5vw] block translate-y-[-0.2vw] lg:translate-y-[-0.3vw]"
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

export default MarqueeSection;
