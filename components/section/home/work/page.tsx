"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
    {
        id: 1,
        slug: "ozil-noblas",
        name: "OZIL NOBLAS",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project1.png",
    },
    {
        id: 2,
        slug: "ozil-noblas-2",
        name: "OZIL NOBLAS",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project2.png",
    },
    {
        id: 3,
        slug: "ozil-noblas-3",
        name: "OZIL NOBLAS",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project3.png",
    },
    {
        id: 4,
        slug: "ozil-noblas-4",
        name: "OZIL NOBLAS",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project3.png",
    },
];

export default function Work() {
    return (
        <section className="bg-white text-black py-[120px] px-4 lg:px-[120px]">
            <div className="container mx-auto max-w-[1440px]">
                {/* Header */}
                <div className="flex justify-between items-baseline mb-[60px]">
                    <h2 className="font-anton text-[60px] md:text-[80px] lg:text-[120px] leading-none uppercase">
                        OUR WORK (9)
                    </h2>
                    <span className="font-anton text-[40px] md:text-[60px] lg:text-[80px] leading-none uppercase">
                        2526©
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[12px] gap-y-[30px]">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} idx={idx} />
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-[80px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group"
        >
            <Link href={`/works/${project.slug}`} className="cursor-pointer">
                {/* Image Container */}
                <div
                    className="relative aspect-square overflow-hidden mb-4 rounded-sm"
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
                        <div className="px-6 py-3 border border-white rounded-full bg-white/20 backdrop-blur-md flex items-center gap-2 whitespace-nowrap overflow-hidden">
                            <div className="relative h-5 overflow-hidden flex flex-col items-center">
                                <div className="flex">
                                    {"View Project".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={isHovered ? "hover" : "initial"}
                                            variants={{
                                                initial: { y: 0 },
                                                hover: { y: -24 }
                                            }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.22, 1, 0.36, 1],
                                                delay: i * 0.01
                                            }}
                                            className="text-white font-poppins text-sm uppercase tracking-wider inline-block"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="flex absolute top-6">
                                    {"View Project".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={isHovered ? "hover" : "initial"}
                                            variants={{
                                                initial: { y: 0 },
                                                hover: { y: -24 }
                                            }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.22, 1, 0.36, 1],
                                                delay: i * 0.01
                                            }}
                                            className="text-white font-poppins text-sm uppercase tracking-wider inline-block"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                            <svg
                                width="14"
                                height="14"
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
                <div className="flex flex-col gap-1">
                    <h3 className="font-anton text-[24px] uppercase leading-none">
                        {project.name}
                    </h3>
                    <div className="flex justify-between items-center opacity-60">
                        <p className="font-poppins text-[16px] leading-[1.3]">
                            {project.category}
                        </p>
                        <p className="font-poppins text-[16px] leading-[1.3]">
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
                className="flex items-center gap-2 bg-[#010101] text-white px-[28px] py-[14px] rounded-[32px] transition-all"
            >
                <Image
                    src="/images/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                    style={{
                        filter: "invert(13%) sepia(85%) saturate(7465%) hue-rotate(358deg) brightness(101%) contrast(117%)"
                    }}
                />
                <span className="font-poppins text-[18px] leading-[1.3]">
                    View All Work
                </span>
            </Link>
        </motion.div>
    );
}
