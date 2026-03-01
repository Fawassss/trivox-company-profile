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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                    y: isScrolled ? -200 : 0,
                    opacity: isScrolled ? 0 : 1
                }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }}
                className={`fixed top-0 left-0 right-0 z-40 flex justify-center bg-transparent mix-blend-difference ${isScrolled ? "pointer-events-none" : "pointer-events-auto"}`}
            >
                <div className="w-full max-w-[1440px] h-fit md:h-[194px] flex items-start justify-between px-4 md:px-6 pt-[24px] pb-[40px] md:pb-[24px] relative">
                    <div className="flex-1">
                        <Link href="/" className="inline-block">
                            <h1 className="font-poppins font-bold text-[20px] md:text-[24px] leading-[1.1] text-white uppercase">
                                TRIVOX STUDIO
                            </h1>
                        </Link>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-[24px] md:top-[32px] flex flex-col items-center">
                        <Link href="/" className="block">
                            <div className="w-[36px] md:w-[48px]">
                                <svg viewBox="0 0 132 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                    <path d="M70 96H34L70 51.5C79.9615 39.2317 78.2119 35.8024 58.5 37L0 40V34.5C48.2716 12.1955 77.0228 4.349 131.5 0L124 14.5C96.381 13.7889 81.8107 15.7949 58.5 26.5C81.2282 20.5638 93.0796 18.0868 95 32L70 96Z" fill="#FFFFFF" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <ul className="flex flex-col items-end space-y-1">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="font-poppins font-medium text-[14px] md:text-[16px] leading-[1.1] text-white hover:text-zinc-400 transition-colors uppercase tracking-wider"
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
                className={`fixed top-4 right-4 md:top-6 md:right-6 z-[60] ${!isOpen ? "mix-blend-difference" : ""}`}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-[18px] md:rounded-[22px] flex flex-col items-center justify-center gap-1.5 transition-colors overflow-hidden group shadow-xl ${isOpen ? "bg-transparent border border-white/20" : "bg-white"}`}
                >
                    <motion.div
                        animate={isOpen ? { rotate: 45, y: 7.5, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
                        className="w-6 md:w-8 h-0.5 rounded-full transition-all"
                    />
                    <motion.div
                        animate={isOpen ? { opacity: 0, x: 20, backgroundColor: "#ffffff" } : { opacity: 1, x: 0, backgroundColor: "#000000" }}
                        className="w-6 md:w-8 h-0.5 rounded-full transition-all"
                    />
                    <motion.div
                        animate={isOpen ? { rotate: -45, y: -7.5, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
                        className="w-6 md:w-8 h-0.5 rounded-full transition-all"
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
                        className="fixed top-0 right-0 w-full h-[100vh] sm:w-[500px] lg:w-[480px] bg-[#181818] z-[55] overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
                    >
                        <div className="h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
                            {/* Nav Links */}
                            <div className="mt-12 md:mt-16 flex flex-col gap-2 md:gap-4">
                                <p className="text-white/30 font-poppins text-[10px] tracking-[0.3em] mb-4">NAVIGATION</p>
                                {menuItems.map((item, i) => (
                                    <div key={item.name} className="overflow-hidden">
                                        <motion.div
                                            custom={i}
                                            variants={linkVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="font-anton text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] text-white hover:text-[#f80000] transition-colors uppercase leading-[0.95] block whitespace-nowrap"
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            {/* Socials */}
                            <div className="flex flex-col gap-6 md:gap-8 overflow-hidden">
                                <p className="text-white/30 font-poppins text-[10px] tracking-[0.3em]">SOCIAL MEDIA</p>
                                <div className="grid grid-cols-2 gap-y-4 md:gap-y-6">
                                    {socialItems.map((social, i) => (
                                        <div key={social.name} className="overflow-hidden">
                                            <motion.div
                                                custom={i + menuItems.length}
                                                variants={linkVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                <Link
                                                    href={social.href}
                                                    target="_blank"
                                                    className="group flex items-center gap-2"
                                                >
                                                    <span className="text-white font-poppins text-[12px] md:text-[14px] group-hover:text-[#f80000] transition-colors uppercase tracking-[0.1em]">
                                                        {social.name}
                                                    </span>
                                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/20 group-hover:bg-[#f80000] transition-colors" />
                                                </Link>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-6 md:pt-8 border-t border-white/5">
                                    <p className="text-white/20 font-poppins text-[10px] uppercase tracking-widest leading-none">
                                        © 2026 TRIVOX STUDIO
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
