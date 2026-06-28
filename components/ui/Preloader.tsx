"use client";

import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

type Step = "draw" | "hold" | "exit";

// Wave height in pixels added below the viewport
const WAVE_H = 80;

export default function Preloader() {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState<Step>("draw");
    const isFirstMount = useRef(true);
    const [panelScope, animatePanel] = useAnimate();

    // Re-trigger on page transitions
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        setIsLoading(true);
        setStep("draw");
    }, [pathname]);

    // Lock scroll while preloader is mounted
    useEffect(() => {
        if (!isLoading) return;
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    // Sequenced animation timeline
    useEffect(() => {
        if (!isLoading) return;

        // draw phase → 2.2 s of drawing, fill fades in
        // hold phase → logo visible for ~1.5 s
        // exit phase → wave-panel slides up
        const t1 = setTimeout(() => setStep("hold"), 2400); // stroke done → fill
        const t2 = setTimeout(() => setStep("exit"), 4000); // hold 1.6 s
        const t3 = setTimeout(() => {
            setIsLoading(false);
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }, 5400); // 4000 + 1400 for slide

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [isLoading]);

    // Slide the wave-panel upward on exit
    useEffect(() => {
        if (step !== "exit" || !panelScope.current) return;

        // We shift up by 100vh + wave height so the wave fully clears the screen
        animatePanel(
            panelScope.current,
            { y: [0, `calc(-100vh - ${WAVE_H}px)`] },
            {
                duration: 1.3,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }
        );
    }, [step, animatePanel, panelScope]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader-root"
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.01, delay: 1.35 }}
                >
                    {/*
                     * Wave panel:
                     *   - Taller than viewport by WAVE_H px so the wave curves hang below
                     *   - Top-anchored. We translate it up on exit.
                     */}
                    <div
                        ref={panelScope}
                        className="absolute left-0 right-0 top-0 pointer-events-auto"
                        style={{ height: `calc(100vh + ${WAVE_H}px)` }}
                    >
                        {/* Black solid fill — occupies everything except the wave zone */}
                        <div
                            className="absolute inset-x-0 top-0 bg-black"
                            style={{ height: `calc(100% - ${WAVE_H}px)` }}
                        />

                        {/* SVG wave — sits below the solid fill, creates rippling bottom edge */}
                        <svg
                            viewBox="0 0 1440 80"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className="absolute inset-x-0"
                            style={{
                                top: `calc(100% - ${WAVE_H}px)`,
                                height: `${WAVE_H}px`,
                                display: "block",
                            }}
                        >
                            {/*
                             * Path covers full-width from top-left → top-right → wave across bottom
                             * The wave crests/troughs sit within the 80px SVG viewBox height
                             */}
                            <path
                                d="
                                    M0 0
                                    L1440 0
                                    L1440 40
                                    Q1260 80 1080 40
                                    Q900  0  720  40
                                    Q540  80 360  40
                                    Q180  0  0    40
                                    Z
                                "
                                fill="black"
                            />
                        </svg>
                    </div>

                    {/* Logo — centred, fades out just before panel exits */}
                    <AnimatePresence mode="wait">
                        {step !== "exit" && (
                            <motion.div
                                key="logo"
                                className="relative z-10 flex items-center justify-center"
                                initial={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -32 }}
                                transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
                            >
                                <svg
                                    width="132"
                                    height="96"
                                    viewBox="0 0 132 96"
                                    fill="none"
                                    className="w-[28vw] h-auto md:w-[10vw]"
                                >
                                    {/* Stroke draw phase */}
                                    <motion.path
                                        d="M70 96H34L70 51.5C79.9615 39.2317 78.2119 35.8024 58.5 37L0 40V34.5C48.2716 12.1955 77.0228 4.349 131.5 0L124 14.5C96.381 13.7889 81.8107 15.7949 58.5 26.5C81.2282 20.5638 93.0796 18.0868 95 32L70 96Z"
                                        stroke="white"
                                        strokeWidth="2.5"
                                        fill="transparent"
                                        initial={{ pathLength: 0, opacity: 1 }}
                                        animate={{
                                            pathLength: 1,
                                            opacity: step === "draw" ? 1 : 0,
                                        }}
                                        transition={{
                                            pathLength: { duration: 2.0, ease: "easeInOut" },
                                            opacity: { duration: 0.35 },
                                        }}
                                    />
                                    {/* Solid fill — fades in when stroke is done */}
                                    <motion.path
                                        d="M70 96H34L70 51.5C79.9615 39.2317 78.2119 35.8024 58.5 37L0 40V34.5C48.2716 12.1955 77.0228 4.349 131.5 0L124 14.5C96.381 13.7889 81.8107 15.7949 58.5 26.5C81.2282 20.5638 93.0796 18.0868 95 32L70 96Z"
                                        fill="white"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: step === "draw" ? 0 : 1 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
