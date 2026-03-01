"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const WarpBackground = ({ onHit }: { onHit: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width: number;
        let height: number;

        // SVGs to Data URLs
        const iconSVGs = [
            // Hand/Pointer
            `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9985 44.8L8 28.6795L9.79895 26.8892H13.4006L15.1996 28.6795V5.3903L16.9985 3.59998H20.397L22.3992 5.3903V14.3457H26.0008L27.7998 16.136V17.9263L29.5987 16.136H33.2004L34.9994 17.9263H38.601L40.4 19.7167V37.6312L34.9994 44.7962L17.4088 44.8H16.9985Z" fill="white" stroke="black" stroke-width="2.5"/></svg>`,
            // Grab Hand
            `<svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0757 37.5096L8.1001 22.5716L9.27145 21.4696H13.617L15.3398 29.7584H17.9539V6.43705L18.3388 6.00788H23.3026L23.6875 6.43705V22.5681V3.33396L24.0725 2.90479L29.0336 2.97675L29.4177 3.40593V22.6392H29.4194V6.9538L29.8044 6.52462H34.7673L35.1513 6.9538V24.636V13.1591L35.5363 12.7299H40.4992L40.8841 13.1591V37.5096L35.4201 44.7952H17.2065L11.0757 37.5096Z" fill="white" stroke="black" stroke-width="2.5"/></svg>`,
            // Eyes
            `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M45.1083 15.6945V19.7127L46.5 21.6691V28.5855L45.7104 31.9273L44.69 34.5418L43.1865 38.7745L38.3515 44L30.8735 42.2036L27.1093 37.7927L26.5 32.6291V30.2109V27.6982V21.5345L27.9314 18.8182L28.6417 12.3382L32.1175 5.24364L34.7675 4H38.319L43.1973 7.43273L44.3259 11.4836L45.1083 15.6945Z" fill="white" stroke="black" stroke-width="2.5"/><path d="M21.5425 15.6945V19.7127L23 21.6691V28.5855L22.1709 31.9273L21.0995 34.5418L19.5208 38.7745L14.444 44L6.59221 42.2036L2.64359 37.7927L2 32.6291V30.2109V27.6982V21.5345L3.50297 18.8182L4.24878 12.3382L7.89832 5.24364L10.6809 4H14.4099L19.5322 7.43273L20.7171 11.4836L21.5425 15.6945Z" fill="white" stroke="black" stroke-width="2.5"/><circle cx="33" cy="28" r="4" fill="black"/><circle cx="10" cy="28" r="4" fill="black"/></svg>`,
            // Tornado
            `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 6.5L6.5 17L7 20L14.5 27.5L24.5 30.5L27 33L25 40L30 47L33.5 46.5L31.5 41V39.5L40 31L39 24.5L36.5 22L37.5 17L41 6.5L40 1.5L32 1L16.5 6.5Z" fill="white"/><path d="M38.1713 17.4345L42 6.50806L40.7529 0.647484L31.569 0L15.7421 5.59117L5 16.6199L6.25789 20.8254L14.7385 28.7246L24.2597 31.2579L25.8278 33.3081L23.7502 40.4924L29.6637 47.9991H34.7953L32.3255 40.6577V39.6402L40.4698 32.1443V24.5523L37.5509 21.7001L38.1704 17.4327" stroke="black" stroke-width="2.5"/></svg>`,
            // Heart
            `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 42L21.6 39.7C13.6 32.5 8 27.4 8 21.2C8 16.2 12 12.2 17 12.2C19.8 12.2 22.5 13.5 24 15.5C25.5 13.5 28.2 12.2 31 12.2C36 12.2 40 16.2 40 21.2C40 27.4 34.4 32.5 26.4 39.7L24 42Z" fill="white" stroke="black" stroke-width="2.5"/></svg>`,
            // Glass/Cup
            `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12H32V32C32 36.4 28.4 40 24 40C19.6 40 16 36.4 16 32V12Z" fill="white" stroke="black" stroke-width="2.5"/><path d="M32 16H36C38.2 16 40 17.8 40 20V24C40 26.2 38.2 28 36 28H32" fill="white" stroke="black" stroke-width="2.5"/></svg>`
        ];

        const icons: HTMLImageElement[] = [];
        iconSVGs.forEach(svg => {
            const img = new Image();
            img.src = 'data:image/svg+xml;base64,' + btoa(svg);
            icons.push(img);
        });

        interface FloatingObj {
            x: number; y: number; z: number; rotation: number; rotSpeed: number;
            iconIndex: number; size: number; screenX: number; screenY: number;
            currentSize: number; hp: number;
        }

        const stars: { x: number; y: number; z: number; pz: number }[] = [];
        const floatingObjects: FloatingObj[] = [];
        const particles: { x: number; y: number; vx: number; vy: number; gravity: number; life: number; size: number }[] = [];
        const projectiles: { x: number; y: number; targetX: number; targetY: number; speed: number; progress: number }[] = [];

        const starCount = 2000;
        const iconCount = 20;
        const speed = 6;
        const iconSpeedMult = 0.5; // Much slower than needles

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            stars.length = 0;
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * width * 4,
                    y: (Math.random() - 0.5) * height * 4,
                    z: Math.random() * width,
                    pz: 0,
                });
                stars[i].pz = stars[i].z;
            }

            floatingObjects.length = 0;
            for (let i = 0; i < iconCount; i++) {
                floatingObjects.push({
                    x: (Math.random() - 0.5) * width * 0.5, // Start closer to center spread
                    y: (Math.random() - 0.5) * height * 0.5,
                    z: Math.random() * width,
                    rotation: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.03,
                    iconIndex: Math.floor(Math.random() * icons.length),
                    size: 40 + Math.random() * 40,
                    screenX: 0,
                    screenY: 0,
                    currentSize: 0,
                    hp: 2 + Math.floor(Math.random() * 2) // 2-3 HP
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Add projectile starting from bottom center
            projectiles.push({
                x: width / 2,
                y: height,
                targetX: mouseX,
                targetY: mouseY,
                speed: 0.1, // progress speed
                progress: 0
            });
        };

        canvas.addEventListener("mousedown", handleClick);

        const update = () => {
            // CRITICAL: Reset alpha before clearing
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Draw Stars
            for (let i = 0; i < starCount; i++) {
                const star = stars[i];
                star.z -= speed;

                if (star.z <= 0) {
                    star.z = width;
                    star.x = (Math.random() - 0.5) * width * 4;
                    star.y = (Math.random() - 0.5) * height * 4;
                    star.pz = star.z + 200;
                }

                const x = (star.x / star.z) * (width / 2) + cx;
                const y = (star.y / star.z) * (height / 2) + cy;
                const px = (star.x / star.pz) * (width / 2) + cx;
                const py = (star.y / star.pz) * (height / 2) + cy;

                star.pz = star.z + 150;

                const opacity = Math.min(1, (width - star.z) / width);
                ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                ctx.lineWidth = 2.0;
                ctx.lineCap = "round";

                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            // Update & Draw Projectiles
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            for (let i = projectiles.length - 1; i >= 0; i--) {
                const p = projectiles[i];
                p.progress += p.speed;

                // Draw projectile trail
                const currX = p.x + (p.targetX - p.x) * p.progress;
                const currY = p.y + (p.targetY - p.y) * p.progress;
                const prevX = p.x + (p.targetX - p.x) * (p.progress - 0.05);
                const prevY = p.y + (p.targetY - p.y) * (p.progress - 0.05);

                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX, currY);
                ctx.stroke();

                if (p.progress >= 1) {
                    // Collision check at impact point
                    let hit = false;
                    for (let j = floatingObjects.length - 1; j >= 0; j--) {
                        const obj = floatingObjects[j];
                        const dx = p.targetX - obj.screenX;
                        const dy = p.targetY - obj.screenY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < obj.currentSize / 2) {
                            obj.hp--;
                            hit = true;

                            // Hit spark
                            for (let s = 0; s < 5; s++) {
                                particles.push({
                                    x: p.targetX, y: p.targetY,
                                    vx: (Math.random() - 0.5) * 10,
                                    vy: (Math.random() - 0.5) * 10,
                                    gravity: 0.1, life: 0.5, size: 2
                                });
                            }

                            if (obj.hp <= 0) {
                                onHit();
                                // Shatter into sand particles (Image 1 style)
                                for (let d = 0; d < 80; d++) {
                                    particles.push({
                                        x: obj.screenX + (Math.random() - 0.5) * obj.currentSize,
                                        y: obj.screenY + (Math.random() - 0.5) * obj.currentSize,
                                        vx: (Math.random() - 0.5) * 15,
                                        vy: (Math.random() - 0.8) * 15, // Blast upwards slightly
                                        gravity: 0.45, life: 1.0 + Math.random() * 0.5, size: 1.5 + Math.random() * 2
                                    });
                                }
                                // Reset only this one
                                obj.z = width;
                                obj.x = (Math.random() - 0.5) * width * 0.5;
                                obj.y = (Math.random() - 0.5) * height * 0.5;
                                obj.hp = 2 + Math.floor(Math.random() * 2);
                            }
                            break;
                        }
                    }
                    projectiles.splice(i, 1);
                }
            }

            // Draw Floating Icons
            for (let i = 0; i < floatingObjects.length; i++) {
                const obj = floatingObjects[i];
                obj.z -= speed * iconSpeedMult;
                obj.rotation += obj.rotSpeed;

                if (obj.z <= 0) {
                    obj.z = width;
                    obj.x = (Math.random() - 0.5) * width * 0.5; // Spawn closer to center
                    obj.y = (Math.random() - 0.5) * height * 0.5;
                    obj.iconIndex = Math.floor(Math.random() * icons.length);
                    obj.hp = 2 + Math.floor(Math.random() * 2);
                }

                obj.screenX = (obj.x / obj.z) * (width / 2) + cx;
                obj.screenY = (obj.y / obj.z) * (height / 2) + cy;

                // Opacity and size based on depth
                const depthFactor = (width - obj.z) / width;
                const scale = Math.max(0.05, depthFactor);
                obj.currentSize = obj.size * scale;
                const opacity = Math.min(1, depthFactor * 2);

                const img = icons[obj.iconIndex];
                if (img.complete) {
                    ctx.save();
                    ctx.translate(obj.screenX, obj.screenY);
                    ctx.rotate(obj.rotation);
                    ctx.globalAlpha = opacity;
                    // Visual feedback for health: flashing or smaller based on HP?
                    // Let's just draw normally.
                    ctx.drawImage(img, -obj.currentSize / 2, -obj.currentSize / 2, obj.currentSize, obj.currentSize);
                    ctx.restore();
                }
            }

            // Draw Particles (Sand/Dust)
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.life -= 0.015;
                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
                ctx.globalAlpha = Math.min(1, p.life);
                ctx.fillStyle = "#000000";
                // Using Rect for sand/pixel effect like image 1
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener("resize", resize);
        resize();
        update();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousedown", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, [onHit]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair"
        />
    );
};

export default function NotFound() {
    const router = useRouter();
    const [score, setScore] = useState(0);

    const formatScore = (num: number) => {
        return num.toString().padStart(3, "0");
    };

    return (
        <div className="relative min-h-[100dvh] w-full bg-[#E7E7E7] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Animation */}
            <WarpBackground onHit={() => setScore(prev => prev + 1)} />

            {/* Top Left Text */}
            <div className="absolute top-2 left-5 z-10 pointer-events-none">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="text-xl font-regular tracking-tight text-[#1a1a1a]"
                >
                    Left
                </motion.p>
            </div>

            {/* Top Right Text */}
            <div className="absolute top-2 right-5 z-10 text-right pointer-events-none">
                <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                    className="text-xl font-regular tracking-tight text-[#1a1a1a]"
                >
                    Right
                </motion.p>
            </div>

            {/* Center Content */}
            <div className="relative z-10 w-full px-5 mb-80 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    className="max-w-full flex flex-col items-start"
                >
                    <div className="w-fit">
                        <h1 className="text-[7.5vw] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[5.2vw] leading-[1.05] font-sans font-[500] tracking-[-0.02em] text-[#1a1a1a] flex flex-col">
                            <span className="text-right w-full">I&apos;m Lost Too ({formatScore(score)}). Oh shoot...</span>
                            <span className="text-left w-full">Something went screwy. Oosh, sucks. You</span>
                            <span className="text-left w-full">get the idea.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-start justify-start gap-6 mt-20 pointer-events-auto">
                        <button
                            onClick={() => router.back()}
                            className="group relative px-12 py-4 bg-[#1a1a1a] text-[#FFFFFF] rounded-full text-sm font-medium transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                        >
                            <span className="relative z-10">GO BACK</span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                        </button>

                        <Link
                            href="/"
                            className="group relative px-12 py-4 border border-black/10 text-[#1a1a1a] rounded-full text-sm font-medium transition-all duration-500 hover:bg-black/5 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                        >
                            <span className="relative z-10">GO BACK HOME</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
