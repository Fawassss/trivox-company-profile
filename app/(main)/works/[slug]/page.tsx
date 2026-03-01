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

// Mock data for the project detail page
const projectData = {
    slug: "ozil-noblas",
    name: "OZIL NOBLAS",
    category: "E-COMMERCE",
    heroImage: "/images/project3.png", // Using existing mock images
    client: "Ozil Noblas",
    industry: "Apparel",
    website: "ozil-noblas.trivox.id",
    websiteUrl: "https://ozil-noblas.trivox.id",
    services: "website development",
    year: "2026",
    overview: "Ozil Noblas is a custom apparel printing company specializing in personalized clothing and merchandise. To strengthen their digital presence and reach a wider market, they partnered with us to develop a data-driven and engaging digital campaign. The objective was to increase brand awareness, generate leads, promote their custom products, and boost social media engagement through a strategic digital approach tailored to their target audience.\n\nThe campaign delivered strong results, achieving an 82% increase in engagement. Through creative storytelling, visually compelling content, and precise audience targeting, Ozil Noblas experienced a significant improvement in online visibility and customer interaction, reinforcing their brand presence in the custom apparel market.",
    workImages: [
        "/images/project1.png",
        "/images/project2.png",
        "/images/project3.png",
        "/images/project1.png",
        "/images/project2.png"
    ]
};

export default function ProjectDetail() {
    const params = useParams();
    const slug = params.slug;

    // In a real app, you would fetch data based on the slug
    // For now, we use the mock data
    const project = projectData;

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
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="container mx-auto px-4 lg:px-[120px] pb-[80px] relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="font-poppins text-center text-white/80 text-[14px] md:text-[18px] uppercase tracking-[0.2em] mb-4 block">
                                    {project.category}
                                </span>
                                <h1 className="font-anton text-center text-white text-[80px] md:text-[120px] lg:text-[180px] leading-[0.9] uppercase">
                                    {project.name}
                                </h1>
                            </motion.div>
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className="py-[100px] px-4 lg:px-[120px]">
                        <div className="container mx-auto max-w-[1440px]">
                            <div className="flex flex-col lg:flex-row gap-[60px] lg:gap-[120px]">

                                {/* Left Column: Metadata */}
                                <div className="lg:w-1/3 flex flex-col justify-between">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="flex flex-col gap-[40px]"
                                    >
                                        <div>
                                            <p className="font-poppins text-[12px] uppercase opacity-40 mb-2">CLIENT</p>
                                            <h3 className="font-anton text-[28px] uppercase">{project.client}</h3>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[12px] uppercase opacity-40 mb-2">INDUSTRY</p>
                                            <h3 className="font-anton text-[28px] uppercase">{project.industry}</h3>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[12px] uppercase opacity-40 mb-2">WEBSITE</p>
                                            <Link href={project.websiteUrl} target="_blank" className="font-anton text-[28px] uppercase hover:opacity-60 transition-opacity">
                                                {project.website}
                                            </Link>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[12px] uppercase opacity-40 mb-2">SERVICES</p>
                                            <h3 className="font-anton text-[28px] uppercase">{project.services}</h3>
                                        </div>
                                        <div>
                                            <p className="font-poppins text-[12px] uppercase opacity-40 mb-2">YEAR</p>
                                            <h3 className="font-anton text-[28px] uppercase">{project.year}</h3>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="mt-[80px] lg:mt-auto"
                                    >
                                        <Link
                                            href={project.websiteUrl}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 font-poppins text-[16px] font-medium hover:gap-4 transition-all"
                                        >
                                            Visit the Website
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.2 13.8L13.8 1.2M13.8 1.2H4.8M13.8 1.2V10.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Right Column: Content */}
                                <div className="lg:w-2/3">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h2 className="font-anton text-[60px] md:text-[80px] uppercase mb-[20px] leading-tight">OVERVIEW</h2>
                                        <div className="font-poppins text-[16px] md:text-[18px] leading-[1.6] opacity-80 whitespace-pre-line max-w-[800px]">
                                            {project.overview}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="mt-[40px]"
                                    >
                                        <h2 className="font-anton text-[60px] md:text-[80px] uppercase mb-[20px] leading-tight">WORK</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
