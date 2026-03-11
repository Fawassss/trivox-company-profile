"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Globe, Mail } from "lucide-react";
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

const MarqueeRow = ({ direction = "left", text = "LET'S WORK TOGETHER" }: { direction?: "left" | "right", text?: string }) => {
    const xPositions = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

    return (
        <div className="w-full overflow-hidden whitespace-nowrap flex py-[0.5vh] md:py-[1vh]">
            <motion.div
                animate={{ x: xPositions }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex gap-[4vw] items-center"
            >
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="font-anton text-[15vw] md:text-[13vw] leading-[0.8] text-[#010101] uppercase tracking-[-0.04em] select-none">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default function CTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
                hour12: false
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Expansion animation - adjusted for a smoother, less "heavy" feel
    const scale = useTransform(scrollYProgress, [0, 0.7], [0.35, 18]);
    const backgroundColor = useTransform(scrollYProgress, [0.4, 0.65], ["#F80000", "#010101"]);

    // Circle text fade out
    const circleTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Content animation
    const contentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.7, 0.9], [100, 0]);

    const services = ["Branding", "UI/UX Design", "Web Development", "Content Creation", "Digital Strategy"];

    return (
        <div ref={containerRef} className="relative h-[250vh] w-full bg-white">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Layer 1: Running Text Background */}
                <div className="absolute inset-0 flex flex-col justify-center opacity-100 z-0">
                    <MarqueeRow direction="right" />
                    <MarqueeRow direction="left" />
                    <MarqueeRow direction="right" />
                    <MarqueeRow direction="left" />
                </div>

                {/* Layer 2: Expanding Circle */}
                <motion.div
                    style={{
                        scale,
                        backgroundColor,
                    }}
                    className="absolute w-[100vw] h-[100vw] rounded-full z-10 flex items-center justify-center pointer-events-none"
                >
                    {/* Circle Text */}
                    <motion.span
                        style={{ opacity: circleTextOpacity }}
                        className="font-poppins font-bold text-[10vw] md:text-[4vw] lg:text-[3vw] text-white uppercase tracking-[0.4em] whitespace-nowrap"
                    >
                        KEEP SCROLL
                    </motion.span>
                </motion.div>

                {/* Layer 3: CTA Content */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="relative z-20 w-full h-full flex flex-col px-[5vw] py-[6vh]"
                >
                    {/* Top Section */}
                    <div className="flex justify-between items-start w-full mb-auto">
                        <div className="flex flex-col gap-1">
                            <span className="font-poppins text-white/40 text-[10px] md:text-[0.7vw] uppercase tracking-[0.3em]">Local Time</span>
                            <span className="font-poppins text-white text-[14px] md:text-[1vw] uppercase">{time}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="font-poppins text-white/40 text-[10px] md:text-[0.7vw] uppercase tracking-[0.3em]">Status</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-poppins text-white text-[14px] md:text-[1vw] uppercase tracking-wide">Available for Work</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section: Main CTA */}
                    <div className="flex flex-col items-center justify-center text-center flex-grow">
                        <h2 className="font-anton text-[18vw] md:text-[12vw] lg:text-[11vw] xl:text-[10vw] leading-[0.8] text-white uppercase tracking-[-0.03em] mt-[10vh] mb-[12vh]">
                            LET'S ELEVATE <br className="hidden md:block" /> YOUR BRAND
                        </h2>

                        <div className="relative pointer-events-auto">
                            <MagneticWrapper>
                                <Link href="mailto:hello@trivox.studio" className="group relative flex items-center gap-[2vw]">
                                    {/* The Pill Background */}
                                    <motion.div
                                        className="absolute left-0 h-full bg-white rounded-full z-0"
                                        initial={{ width: "12vw" }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                        style={{
                                            width: "var(--pill-width)",
                                            height: "var(--pill-height)"
                                        }}
                                    />

                                    {/* Icon Circle */}
                                    <div className="relative z-10 w-[12vw] h-[12vw] md:w-[4.5vw] md:h-[4.5vw] bg-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                                        <ArrowUpRight className="w-[6vw] h-[6vw] md:w-[2.2vw] md:h-[2.2vw] text-black" strokeWidth={1.5} />
                                    </div>

                                    {/* Text */}
                                    <span className="relative z-10 font-poppins font-bold text-[4.5vw] md:text-[1.8vw] lg:text-[1.5vw] text-white group-hover:text-black transition-colors duration-500 uppercase tracking-widest px-[2vw]">
                                        hello@trivox.studio
                                    </span>
                                </Link>
                            </MagneticWrapper>

                            <style jsx>{`
                                :global(.group) {
                                    --pill-width: 12vw;
                                    --pill-height: 12vw;
                                }
                                @media (min-width: 768px) {
                                    :global(.group) {
                                        --pill-width: 4.5vw;
                                        --pill-height: 4.5vw;
                                    }
                                }
                            `}</style>
                        </div>
                    </div>

                    {/* Bottom Section: Footer Info */}
                    <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-end border-t border-white/10 pt-10">
                        {/* Column 1: Services */}
                        <div className="hidden md:flex flex-col gap-4">
                            <span className="font-poppins text-white/40 text-[10px] md:text-[0.7vw] uppercase tracking-[0.3em]">Expertise</span>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {services.map((item, i) => (
                                    <span key={i} className="font-poppins text-white/60 text-[0.8vw] uppercase hover:text-white transition-colors cursor-default">{item}</span>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Socials */}
                        <div className="flex flex-col items-center gap-6">
                            <span className="font-poppins text-white/40 text-[10px] md:text-[0.7vw] uppercase tracking-[0.3em] hidden md:block">Connect</span>
                            <div className="flex gap-8">
                                <Link href="#" className="text-white/60 hover:text-white transition-all hover:-translate-y-1"><Instagram className="w-5 h-5 md:w-6 md:h-6" /></Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-all hover:-translate-y-1"><Linkedin className="w-5 h-5 md:w-6 md:h-6" /></Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-all hover:-translate-y-1"><Globe className="w-5 h-5 md:w-6 md:h-6" /></Link>
                                <Link href="mailto:hello@trivox.studio" className="text-white/60 hover:text-white transition-all hover:-translate-y-1"><Mail className="w-5 h-5 md:w-6 md:h-6" /></Link>
                            </div>
                        </div>

                        {/* Column 3: Legal/Location */}
                        <div className="flex flex-col md:items-end gap-1 text-center md:text-right">
                            <span className="font-poppins text-white/40 text-[10px] md:text-[0.7vw] uppercase tracking-[0.3em]">Office</span>
                            <p className="font-poppins text-white/60 text-[12px] md:text-[0.9vw] leading-relaxed uppercase">
                                Trivox Studio <br />
                                Jakarta, Indonesia
                            </p>
                            <p className="font-poppins text-white/30 text-[9px] md:text-[0.6vw] mt-2 uppercase">© 2024 All Rights Reserved</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
