"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const stickerData = [
    { text: "INSTAGRAM", color: "black", width: 220, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "TWITTER", color: "white", width: 180, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "WHATSAPP", color: "white", width: 200, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "WEBSITE", color: "white", width: 190, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "GITHUB", color: "black", width: 170, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "BEHANCE", color: "white", width: 185, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "LINKEDIN", color: "black", width: 195, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "INSTAGRAM", color: "black", width: 220, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "TWITTER", color: "white", width: 180, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
    { text: "WHATSAPP", color: "white", width: 210, height: 65, url: "https://www.instagram.com/trivoxstudio/" },
];

const circleData = [
    { color: "white", size: 180 },
    { color: "black", size: 180 },
    { color: "black", size: 180 },
    { color: "white", size: 180 },
];

export default function Footer() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const engineRef = useRef<Matter.Engine>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sceneRef.current) return;

        const { Engine, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;
        const engine = Engine.create();
        engineRef.current = engine;
        engine.gravity.y = 1.5;

        const container = sceneRef.current;
        const width = container.clientWidth || window.innerWidth;
        const height = 650;
        const footerOverlap = 120;
        const groundY = height - footerOverlap + 10;
        const wallThickness = 1000;

        // Static boundaries
        const ground = Bodies.rectangle(width / 2, groundY + wallThickness / 2, width * 5, wallThickness, { isStatic: true });
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true });
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true });
        const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2 - 500, width * 5, wallThickness, { isStatic: true });

        // Create bodies
        const stickerBodies = stickerData.map((data, i) => {
            return Bodies.rectangle(
                Math.random() * (width - 200) + 100,
                Math.random() * -600 - 50,
                data.width,
                data.height,
                {
                    chamfer: { radius: 32.5 },
                    restitution: 0.5,
                    friction: 0.2,
                    frictionAir: 0.01,
                    angle: (Math.random() - 0.5) * 1,
                }
            );
        });

        const circleBodies = circleData.map((data, i) => {
            return Bodies.circle(
                Math.random() * (width - 200) + 100,
                Math.random() * -600 - 50,
                data.size / 2,
                {
                    restitution: 0.5,
                    friction: 0.2,
                    frictionAir: 0.01,
                }
            );
        });

        const allBodies = [...stickerBodies, ...circleBodies];
        World.add(engine.world, [ground, leftWall, rightWall, ceiling, ...allBodies]);

        // Mouse interaction
        const mouse = Mouse.create(container);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });
        World.add(engine.world, mouseConstraint);

        const runner = Runner.create();
        Runner.run(runner, engine);

        let requestRef: number;
        const update = () => {
            allBodies.forEach((body, i) => {
                const el = itemsRef.current[i];
                if (el) {
                    const w = i < stickerData.length ? stickerData[i].width : circleData[i - stickerData.length].size;
                    const h = i < stickerData.length ? stickerData[i].height : circleData[i - stickerData.length].size;
                    el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
                    el.style.visibility = "visible";
                    el.style.opacity = "1";
                }
            });
            requestRef = requestAnimationFrame(update);
        };
        requestRef = requestAnimationFrame(update);
        setIsLoaded(true);

        const handleResize = () => {
            if (!container) return;
            const newWidth = container.clientWidth;
            Matter.Body.setPosition(ground, { x: newWidth / 2, y: groundY + wallThickness / 2 });
            Matter.Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: height / 2 });
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(requestRef);
            Runner.stop(runner);
            Engine.clear(engine);
            World.clear(engine.world, false);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const year = new Date().getFullYear();

    return (
        <footer className="relative w-full overflow-hidden bg-white">
            <div
                ref={sceneRef}
                className="relative w-full h-[650px] mb-[-120px] z-10 select-none overflow-hidden"
            >
                {stickerData.map((sticker, i) => (
                    <div
                        key={`sticker-${i}`}
                        ref={(el) => { itemsRef.current[i] = el; }}
                        className={`absolute flex items-center justify-center rounded-full border border-black shadow-lg cursor-grab active:cursor-grabbing will-change-transform ${sticker.color === "black" ? "bg-black text-white" : "bg-white text-black"
                            }`}
                        style={{
                            width: sticker.width,
                            height: sticker.height,
                            left: 0,
                            top: 0,
                            visibility: "hidden",
                            opacity: 0,
                            zIndex: 50
                        }}
                    >
                        <a href={sticker.url} target="_blank" rel="noopener noreferrer">
                            <span className="font-anton text-[32px] md:text-[40px] uppercase leading-none pb-1 pointer-events-none">
                                {sticker.text}
                            </span>
                        </a>
                    </div>
                ))}

                {circleData.map((circle, i) => (
                    <div
                        key={`circle-${i}`}
                        ref={(el) => { itemsRef.current[stickerData.length + i] = el; }}
                        className={`absolute rounded-full flex items-center justify-center border border-black shadow-xl cursor-grab active:cursor-grabbing will-change-transform ${circle.color === "black" ? "bg-black text-white" : "bg-white text-black"
                            }`}
                        style={{
                            width: circle.size,
                            height: circle.size,
                            left: 0,
                            top: 0,
                            visibility: "hidden",
                            opacity: 0,
                            zIndex: 50
                        }}
                    >
                        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                            <svg viewBox="0 0 100 100" className="w-[150px] h-[150px]">
                                <path
                                    id={`circlePath-${i}`}
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="transparent"
                                />
                                <text className="fill-current text-[11px] uppercase font-poppins font-medium tracking-[2.2px]">
                                    <textPath xlinkHref={`#circlePath-${i}`}>
                                        Connect With Us • Connect With Us •
                                    </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#F80000]">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative w-full bg-black text-white rounded-t-[200px] pt-32 pb-16 px-6 md:px-12 lg:px-20 z-20">
                <div className="max-w-[1440px] mx-auto text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10 mb-20">
                        <div className="max-w-[320px] mx-auto md:mx-0">
                            <p className="font-poppins text-[18px] lg:text-[20px] leading-[1.3] font-normal">
                                We invite you to contact our team for more information
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <a href="mailto:hello@trivox.com" className="font-poppins text-[18px] lg:text-[20px] leading-[1.3] font-normal">
                                Let’s Connect
                            </a>
                        </div>
                        <div className="md:text-right">
                            <p className="font-poppins text-[18px] lg:text-[20px] leading-[1.3] font-normal">
                                © {year} Trivox Studio. <br className="hidden md:block" /> All Rights Reserved.
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex justify-center mb-12 overflow-hidden">
                        <h2 className="font-anton text-[80px] sm:text-[140px] md:text-[180px] lg:text-[225px] xl:text-[280px] leading-[0.8] uppercase text-white tracking-[-0.01em] whitespace-nowrap select-none pt-6 pb-4">
                            TRIVOX STUDIO
                        </h2>
                    </div>

                    <div className="flex justify-center mt-12">
                        <button onClick={scrollToTop} className="group flex flex-col items-center gap-3 font-poppins text-[18px] leading-[1.3] font-normal hover:text-[#F80000] transition-colors">
                            <span className="uppercase tracking-widest text-lg flex items-center gap-2">
                                <span>[</span>
                                <ArrowUp size={24} strokeWidth={2} />
                                <span>]</span>
                                Back to Top
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
