"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Works", href: "/#work" },
        { name: "Services", href: "/#services" },
        { name: "Unlimited", href: "/#unlimited" },
        { name: "Studio", href: "/#studio" },
        { name: "Contact Us", href: "/#contact" },
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
            x: "100%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
        },
        visible: {
            x: "0%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as any }
        },
        exit: {
            x: "100%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }
        }
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
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className={`fixed top-0 left-0 right-0 z-40 flex justify-center bg-transparent mix-blend-difference ${isScrolled ? "pointer-events-none" : "pointer-events-auto"}`}
            >
                <div className="w-full max-w-[95vw] h-fit md:h-[8vw] flex items-center justify-between px-[3vw] md:px-[5vw] py-[1.5vw] relative">
                    {/* Left Side: Brand (Desktop) / Logo (Mobile) */}
                    <div className="flex-1 flex items-center">
                        <Link href="/" className="inline-block group">
                            <h1 className="hidden md:block font-poppins font-bold text-[1.2vw] leading-tight text-white uppercase tracking-tighter">
                                TRIVOX STUDIO
                            </h1>
                            <div className="hidden md:block h-[1px] w-0 group-hover:w-full bg-white transition-all duration-300" />

                            {/* Mobile Logo */}
                            <div className="md:hidden w-[8vw] min-w-[32px]">
                                <svg viewBox="0 0 132 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                    <path d="M70 96H34L70 51.5C79.9615 39.2317 78.2119 35.8024 58.5 37L0 40V34.5C48.2716 12.1955 77.0228 4.349 131.5 0L124 14.5C96.381 13.7889 81.8107 15.7949 58.5 26.5C81.2282 20.5638 93.0796 18.0868 95 32L70 96Z" fill="#FFFFFF" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Logo Center */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
                        <Link href="/" className="block transition-transform duration-300 hover:scale-110">
                            <div className="w-[2.8vw]">
                                <svg viewBox="0 0 132 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                    <path d="M70 96H34L70 51.5C79.9615 39.2317 78.2119 35.8024 58.5 37L0 40V34.5C48.2716 12.1955 77.0228 4.349 131.5 0L124 14.5C96.381 13.7889 81.8107 15.7949 58.5 26.5C81.2282 20.5638 93.0796 18.0868 95 32L70 96Z" fill="#FFFFFF" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Menu Horizontal (Desktop) */}
                    <div className="flex-1 flex justify-end">
                        <ul className="hidden md:flex flex-row items-center space-x-[2.5vw]">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="relative font-poppins font-medium text-[0.9vw] leading-none text-white transition-all duration-300 uppercase tracking-[0.1em] group block"
                                    >
                                        <span className="relative z-10 transition-colors duration-300 group-hover:text-zinc-300">
                                            {item.name}
                                        </span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
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
                animate={{ scale: isScrolled || isOpen ? 1 : 1 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }}
                className={`fixed top-[3vw] right-[4vw] md:top-[3vw] md:right-[3vw] z-[60] md:hidden`}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-col items-end justify-center gap-[1.5vw] transition-colors overflow-hidden group p-2"
                >
                    <motion.div
                        animate={isOpen ? { rotate: 45, y: "1.2vw" } : { rotate: 0, y: 0 }}
                        className="w-[8vw] h-[0.5vw] md:h-[0.15vw] rounded-full transition-all bg-white mix-blend-difference"
                    />
                    <motion.div
                        animate={isOpen ? { rotate: -45, y: "-1.2vw" } : { rotate: 0, y: 0 }}
                        className="w-[8vw] h-[0.5vw] md:h-[0.15vw] rounded-full transition-all bg-white mix-blend-difference"
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
                        exit="exit"
                        className="fixed top-0 right-0 w-full h-[100vh] bg-black z-[55] overflow-hidden"
                    >
                        <div className="h-full flex flex-col justify-start pt-[20vh] px-[8vw] md:px-[10vw]">
                            {/* Nav Links */}
                            <div className="flex flex-col items-start gap-[2vh]">
                                {menuItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        className="group relative"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="relative z-10 block transition-colors duration-300 group-hover:text-zinc-400 text-white"
                                        >
                                            <span className="font-poppins font-semibold text-[10vw] md:text-[8vh] leading-[1.2]">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom Info Section matching image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="mt-auto pb-[10vh] flex flex-col md:flex-row justify-between items-start md:items-end w-full border-t border-white/10 pt-8"
                            >
                                <div className="text-white/60 font-poppins text-[4vw] md:text-[1vw]">
                                    <p className="mb-2 uppercase tracking-widest text-[3vw] md:text-[0.7vw]">Get in touch</p>
                                    <Link href="mailto:hello@trivox.studio" className="text-white hover:text-zinc-400 block pb-1 border-b border-transparent hover:border-zinc-400 transition-all">
                                        hello@trivox.studio
                                    </Link>
                                </div>
                                <div className="mt-8 md:mt-0 flex gap-4">
                                    {socialItems.map((social) => (
                                        <Link key={social.name} href={social.href} className="text-white/60 hover:text-white transition-colors text-[3.5vw] md:text-[0.8vw] uppercase tracking-wider">
                                            {social.name}
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black z-[50]"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
