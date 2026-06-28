"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const menuItems = [
        { name: "HOME", href: "/" },
        { name: "WORK", href: "/#work" },
        { name: "SERVICES", href: "/#services" },
        { name: "TESTIMONIALS", href: "/#testimonials" },
        { name: "CONTACT", href: "/#contact" },
    ];

    const socialItems = [
        { name: "INSTAGRAM", href: "https://instagram.com" },
        { name: "TIKTOK", href: "https://tiktok.com" },
        { name: "GITHUB", href: "https://github.com" },
        { name: "LINKEDIN", href: "https://linkedin.com" },
    ];

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleScroll();
        handleResize();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Menu animation variants
    const menuVariants = {
        hidden: {
            scale: 0,
            x: "50%",
            y: "-50%",
            borderRadius: "100%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
        },
        visible: {
            scale: 1,
            x: "0%",
            y: "0%",
            borderRadius: "0%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as any }
        },
    };

    const linkVariants = {
        initial: { y: 80, opacity: 0 },
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as any }
        }),
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <>
            {/* Header: Branding & Initial Menu */}
            <motion.nav
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: isScrolled ? "-15vw" : 0,
                    opacity: isScrolled ? 0 : 1
                }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }}
                className={`fixed top-0 left-0 right-0 z-40 flex justify-center bg-transparent mix-blend-difference ${isScrolled ? "pointer-events-none" : "pointer-events-auto"}`}
            >
                <div className="w-full max-w-[90vw] h-fit md:h-[13.5vw] flex items-start justify-between px-[2vw] md:px-[4vw] pt-[1.6vw] pb-[2.7vw] md:pb-[1.6vw] relative md:block hidden">
                    <div className="flex-1">
                        <Link href="/" className="inline-block">
                            <h1 className="font-poppins font-bold text-[1.4vw] md:text-[1.6vw] leading-[1.1] text-white uppercase">
                                TRIVOX STUDIO
                            </h1>
                        </Link>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-[1.6vw] md:top-[2.2vw] flex flex-col items-center">
                        <Link href="/" className="block">
                            <div className="w-[2.5vw] md:w-[3.3vw]">
                                <svg viewBox="0 0 132 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                    <path d="M70 96H34L70 51.5C79.9615 39.2317 78.2119 35.8024 58.5 37L0 40V34.5C48.2716 12.1955 77.0228 4.349 131.5 0L124 14.5C96.381 13.7889 81.8107 15.7949 58.5 26.5C81.2282 20.5638 93.0796 18.0868 95 32L70 96Z" fill="#FFFFFF" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <ul className="flex flex-col items-start space-y-[0.5vw]">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="font-poppins font-medium text-[1vw] md:text-[1.1vw] leading-[1.1] text-white hover:text-zinc-400 transition-colors uppercase tracking-wider"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.nav>

            {/* Floating Hamburger Button */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isScrolled || isOpen ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }}
                className={`fixed top-[2vw] right-[2vw] md:top-[3vw] md:right-[3vw] z-[60] ${!isOpen ? "mix-blend-difference" : ""}`}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-[4.5vw] h-[4.5vw] min-w-[50px] min-h-[50px] rounded-[1.2vw] md:rounded-[1.5vw] flex flex-col items-center justify-center gap-[5px] md:gap-[0.4vw] transition-colors overflow-hidden group shadow-xl ${isOpen ? "bg-transparent border border-black/10" : "bg-white"}`}
                >
                    <motion.div
                        animate={isOpen ? { rotate: 45, y: isMobile ? 7 : "0.5vw", backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
                        className="w-[24px] md:w-[2.5vw] h-[2px] md:h-[0.15vw] rounded-full transition-all"
                    />
                    <motion.div
                        animate={isOpen ? { opacity: 0, x: isMobile ? 20 : "1.5vw", backgroundColor: "#000000" } : { opacity: 1, x: 0, backgroundColor: "#000000" }}
                        className="w-[24px] md:w-[2.5vw] h-[2px] md:h-[0.15vw] rounded-full transition-all"
                    />
                    <motion.div
                        animate={isOpen ? { rotate: -45, y: isMobile ? -7 : "-0.5vw", backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
                        className="w-[24px] md:w-[2.5vw] h-[2px] md:h-[0.15vw] rounded-full transition-all"
                    />
                </motion.button>
            </motion.div>

            {/* Full Screen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed top-0 right-0 w-full h-[100vh] bg-white z-[55] overflow-hidden"
                    >
                        <div className="h-full flex flex-col justify-center ">
                            {/* Nav Links */}
                            <div className="flex flex-col w-full">
                                {menuItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        custom={i}
                                        variants={linkVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="group relative w-full border-b border-zinc-100 last:border-none"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="relative z-10 flex justify-between items-center w-full px-[4vw] md:px-[8vw] py-[1.5vh] md:py-[4vh] transition-colors duration-300 group-hover:text-white text-black"
                                        >
                                            <span className="font-anton text-[10vw] md:text-[8vh] lg:text-[12vh] leading-[1] uppercase">
                                                {item.name}
                                            </span>
                                            <span className="font-poppins font-bold text-[3vw] md:text-[1.8vw] opacity-40 group-hover:opacity-100 transition-opacity">
                                                [{String(i + 1).padStart(2, '0')}]
                                            </span>
                                        </Link>

                                        {/* Hover Background Expansion */}
                                        <motion.div
                                            className="absolute inset-0 bg-[#FF3838] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop for mobile (not really needed for fullscreen white, but kept for consistency) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-white z-[50]"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;