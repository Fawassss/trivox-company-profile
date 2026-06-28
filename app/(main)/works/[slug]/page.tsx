"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { useEffect } from "react";
import { useLenis } from "lenis/react";

import { projects } from "@/constants/projects";

export default function ProjectDetail() {
    const params = useParams();
    const slug = params.slug;

    // Find project based on slug
    const project = projects.find((p) => p.slug === slug);

    // If project not found, you might want to show a 404 or redirect
    if (!project) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-2xl">Project not found</h1>
            </div>
        );
    }

    return (
        <SmoothScroll>
            <ScrollToTop />
            <div className="bg-white text-black min-h-screen">
                <Navbar />

                <main>
                    {/* Hero Section */}
                    <section className="relative h-screen w-full flex items-end overflow-hidden">
                        <Image
                            src={project.heroImage}
                            alt={project.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        <div className="w-full px-[4vw] md:px-[8vw] pb-[8vh] relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: "2vw" }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="font-poppins text-center text-white/80 text-[3vw] md:text-[1.5vw] lg:text-[1.1vw] uppercase tracking-[0.2em] mb-[1vw] block">
                                    {project.category}
                                </span>
                                <h1 className="font-anton text-center text-white text-[12vw] md:text-[10vw] lg:text-[10vw] leading-[0.9] uppercase">
                                    {project.name}
                                </h1>
                            </motion.div>
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className="py-[10vh] px-[4vw] md:px-[8vw]">
                        <div className="w-full max-w-[100%]">
                            <div className="flex flex-col lg:flex-row gap-[8vw] lg:gap-[10vw]">

                                {/* Left Column: Metadata */}
                                <div className="lg:w-1/3 flex flex-col justify-between">
                                    <motion.div
                                        initial={{ opacity: 0, x: "-2vw" }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="flex flex-col gap-[3vw]"
                                    >
                                        <div>
                                            <p className="font-poppins text-[2vw] md:text-[1.2vw] lg:text-[0.8vw] uppercase opacity-40 mb-[0.5vw]">CLIENT</p>
                                            <h3 className="font-anton text-[6vw] md:text-[3vw] lg:text-[2.2vw] uppercase">{project.client}</h3>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[2vw] md:text-[1.2vw] lg:text-[0.8vw] uppercase opacity-40 mb-[0.5vw]">INDUSTRY</p>
                                            <h3 className="font-anton text-[6vw] md:text-[3vw] lg:text-[2.2vw] uppercase">{project.industry}</h3>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[2vw] md:text-[1.2vw] lg:text-[0.8vw] uppercase opacity-40 mb-[0.5vw]">WEBSITE</p>
                                            <Link href={project.websiteUrl} target="_blank" className="font-anton text-[6vw] md:text-[3vw] lg:text-[2.2vw] uppercase hover:opacity-60 transition-opacity">
                                                {project.website}
                                            </Link>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[2vw] md:text-[1.2vw] lg:text-[0.8vw] uppercase opacity-40 mb-[0.5vw]">SERVICES</p>
                                            <h3 className="font-anton text-[6vw] md:text-[3vw] lg:text-[2.2vw] uppercase">{project.services}</h3>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[2vw] md:text-[1.2vw] lg:text-[0.8vw] uppercase opacity-40 mb-[0.5vw]">YEAR</p>
                                            <h3 className="font-anton text-[6vw] md:text-[3vw] lg:text-[2.2vw] uppercase">{project.year}</h3>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: "2vw" }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="mt-[6vh] lg:mt-auto"
                                    >
                                        <Link
                                            href={project.websiteUrl}
                                            target="_blank"
                                            className="inline-flex items-center gap-[0.5vw] font-poppins text-[3.5vw] md:text-[1.5vw] lg:text-[1.1vw] font-medium hover:gap-[1vw] transition-all"
                                        >
                                            Visit the Website
                                            <svg className="w-[1.5vw] h-[1.5vw]" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.2 13.8L13.8 1.2M13.8 1.2H4.8M13.8 1.2V10.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Right Column: Content */}
                                <div className="lg:w-2/3">
                                    <motion.div
                                        initial={{ opacity: 0, y: "3vw" }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="font-anton text-[10vw] md:text-[6vw] lg:text-[5vw] uppercase mb-[1.5vw] leading-tight">OVERVIEW</h2>
                                        <div className="font-poppins text-[4vw] md:text-[1.8vw] lg:text-[1.2vw] leading-[1.6] opacity-80 whitespace-pre-line md:max-w-[50vw] max-w-[100vw]">
                                            {project.overview}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: "3vw" }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="mt-[6vh]"
                                    >
                                        <h2 className="font-anton text-[10vw] md:text-[6vw] lg:text-[5vw] uppercase mb-[1.5vw] leading-tight">WORK</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1vw]">
                                            {project.workImages.map((img, idx) => (
                                                <div key={idx} className={`relative aspect-[4/3] overflow-hidden rounded-sm ${idx === 0 ? 'md:col-span-2 aspect-[16/9]' : ''}`}>
                                                    <Image
                                                        src={img}
                                                        alt={`Work ${idx + 1}`}
                                                        fill
                                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </SmoothScroll>
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
