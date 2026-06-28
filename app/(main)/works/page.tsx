"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

import { projects } from "@/constants/projects";

export default function WorksPage() {
    return (
        <SmoothScroll>
            <ScrollToTop />
            <div className="min-h-screen bg-white">
                <Navbar />

                <main className="md:pt-[15vh] pt-[6vh] px-[4vw] md:px-[8vw]">
                    {/* Header */}
                    <div className="flex justify-between items-end md:mb-[3vw] mb-[5vw] border-b border-black/10">
                        <div className="flex flex-col">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="font-poppins md:text-[1.2vw] text-[3vw] uppercase tracking-widest text-black mb-[0.5vw]"
                            >
                                Selected works
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="font-anton text-[12vw] md:text-[8vw] lg:text-[10vw] leading-none uppercase text-black"
                            >
                                PROJECTS
                            </motion.h1>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden md:block"
                        >
                            <span className="font-anton text-[4vw] leading-none uppercase text-black">
                                {projects.length} ITEMS
                            </span>
                        </motion.div>
                    </div>

                    {/* Filter / Categories (Placeholder for a premium feel) */}
                    <div className="flex gap-[1vw] md:mb-[3vw] mb-[5vw] overflow-x-auto pb-[1vw] scrollbar-hide">
                        {["All", "Branding", "Website", "E-Commerce", "UI/UX", "Mobile App"].map((cat, i) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 + (i * 0.05) }}
                                className={`px-[1.5vw] py-[0.6vw] rounded-full border border-black font-poppins md:text-[0.9vw] text-[2vw] uppercase tracking-wider hover:bg-black hover:text-white transition-colors ${cat === "All" ? "bg-black text-white" : "text-black"}`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[2vw] gap-y-[5vw]">
                        {projects.map((project, idx) => (
                            <ProjectCard key={project.id} project={project} idx={idx} />
                        ))}
                    </div>
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    );
}

function ProjectCard({ project, idx }: { project: any; idx: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="group"
        >
            <Link href={`/works/${project.slug}`} className="cursor-pointer">
                {/* Image Container */}
                <div
                    className="relative aspect-[4/3] overflow-hidden mb-[1.5vw] rounded-sm bg-neutral-100"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleMouseMove}
                >
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="scale-0 group-hover:scale-100 transition-transform duration-500 bg-white text-black font-anton px-[2vw] py-[1vw] rounded-full text-[1.2vw] uppercase tracking-wider">
                            Explore Case Study
                        </div>
                    </div>

                    {/* Magnetic Follow Button (Hidden for mobile) */}
                    <motion.div
                        className="absolute top-0 left-0 pointer-events-none z-20 hidden lg:block"
                        style={{
                            x,
                            y,
                            translateX: "-50%",
                            translateY: "-50%",
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0,
                        }}
                    >
                        <div className="px-[1.5vw] py-[0.8vw] border border-white rounded-full bg-white/20 backdrop-blur-md flex items-center gap-[0.5vw] whitespace-nowrap">
                            <span className="text-white font-poppins text-[0.8vw] uppercase tracking-widest">
                                View Project
                            </span>
                            <svg width="1vw" height="1vw" viewBox="0 0 15 15" fill="none" className="text-white">
                                <path d="M1.2 13.8L13.8 1.2M13.8 1.2H4.8M13.8 1.2V10.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </motion.div>
                </div>

                {/* Text Info */}
                <div className="flex justify-between md:mt-0 mt-[2.5vh] items-start">
                    <div className="flex flex-col">
                        <h3 className="font-anton text-[5vw] md:text-[2.5vw] lg:text-[2vw] uppercase leading-none mb-[0.5vw] transition-colors group-hover:text-black/70 text-black">
                            {project.name}
                        </h3>
                        <p className="font-poppins md:text-[1vw] text-[3vw] uppercase tracking-wider text-black">
                            {project.category}
                        </p>
                    </div>
                    <span className="font-anton md:text-[1.5vw] text-[3vw] text-black">
                        {project.year}
                    </span>
                </div>
            </Link>
        </motion.div>

    );
}

function ScrollToTop() {
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [lenis]);

    return null;
}
