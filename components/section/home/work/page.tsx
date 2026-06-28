"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

import { projects } from "@/constants/projects";

export default function Work() {
    const displayProjects = projects.slice(0, 4);
    return (
        <section id="work" className="bg-white text-black py-[10vh] lg:py-[15vh] px-[4vw] md:px-[8vw]">
            <div className="w-full">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-[5vw]">
                    <h2 className="font-anton text-[12vw] md:text-[8vw] lg:text-[7vw] leading-none uppercase">
                        OUR WORK (9)
                    </h2>
                    <span className="font-anton text-[8vw] md:text-[5vw] lg:text-[4vw] leading-none uppercase">
                        2526©
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[1vw] gap-y-[3vw]">
                    {displayProjects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} idx={idx} />
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-[6vw] mb-[10vh]">
                    <motion.div
                        initial={{ opacity: 0, y: "2vw" }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <MagneticButton />
                    </motion.div>
                </div>
            </div>
        </section>
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
            initial={{ opacity: 0, y: "2vw" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group"
        >
            <Link href={`/works/${project.slug}`} className="cursor-pointer">
                {/* Image Container */}
                <div
                    className="relative aspect-square overflow-hidden mb-[1vw] rounded-sm"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleMouseMove}
                >
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Magnetic Follow Button */}
                    <motion.div
                        className="absolute top-0 left-0 pointer-events-none z-20"
                        style={{
                            x,
                            y,
                            translateX: "-50%",
                            translateY: "-50%",
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0,
                        }}
                    >
                        <div className="px-[1.5vw] py-[0.8vw] border border-white rounded-full bg-white/20 backdrop-blur-md flex items-center gap-[0.5vw] whitespace-nowrap overflow-hidden">
                            <div className="relative h-[1.25vw] overflow-hidden flex flex-col items-center">
                                <div className="flex">
                                    {"View Project".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={isHovered ? "hover" : "initial"}
                                            variants={{
                                                initial: { y: 0 },
                                                hover: { y: "-1.5vw" }
                                            }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.22, 1, 0.36, 1],
                                                delay: i * 0.01
                                            }}
                                            className="text-white font-poppins text-[0.8vw] uppercase tracking-wider inline-block"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="flex absolute top-[1.5vw]">
                                    {"View Project".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={isHovered ? "hover" : "initial"}
                                            variants={{
                                                initial: { y: 0 },
                                                hover: { y: "-1.5vw" }
                                            }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.22, 1, 0.36, 1],
                                                delay: i * 0.01
                                            }}
                                            className="text-white font-poppins text-[0.8vw] uppercase tracking-wider inline-block"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                            <svg
                                width="1vw"
                                height="1vw"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white flex-shrink-0"
                            >
                                <path
                                    d="M1.2 13.8L13.8 1.2M13.8 1.2H4.8M13.8 1.2V10.2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Darken Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Text Info */}
                <div className="flex flex-col gap-0">
                    <h3 className="font-anton text-[2vw] md:text-[1.8vw] uppercase leading-none">
                        {project.name}
                    </h3>
                    <div className="flex justify-between items-center opacity-60">
                        <p className="font-poppins text-[1vw] leading-[1.3]">
                            {project.category}
                        </p>
                        <p className="font-poppins text-[1vw] leading-[1.3]">
                            {project.year}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function MagneticButton() {
    const btnRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15 };
    const sx = useSpring(x, springConfig);
    const sy = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = btnRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: sx, y: sy }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block cursor-pointer"
        >
            <Link
                href="/works"
                className="flex items-center gap-[0.5vw] bg-[#010101] text-white px-[2vw] py-[1vw] rounded-[3vw] transition-all"
            >
                <div className="w-[1vw] h-[1vw] relative flex items-center justify-center">
                    <Image
                        src="/images/star.svg"
                        alt="star"
                        fill
                        style={{
                            filter: "invert(13%) sepia(85%) saturate(7465%) hue-rotate(358deg) brightness(101%) contrast(117%)"
                        }}
                    />
                </div>
                <span className="font-poppins text-[1.2vw] leading-[1.3]">
                    View All Work
                </span>
            </Link>
        </motion.div>
    );
}
