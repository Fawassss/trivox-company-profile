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

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!sceneRef.current) return;

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const { Engine, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;
        const engine = Engine.create();
        engineRef.current = engine;
        engine.gravity.y = 1.5;

        const container = sceneRef.current;
        const width = container.clientWidth || window.innerWidth;
        const mobile = window.innerWidth < 768;
        const height = mobile ? 550 : 650;
        const footerOverlap = mobile ? 80 : 120;
        const groundY = height - footerOverlap + 10;
        const wallThickness = 1000;

        // Static boundaries
        const ground = Bodies.rectangle(width / 2, groundY + wallThickness / 2, width * 5, wallThickness, { isStatic: true });
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true });
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true });
        const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2 - 500, width * 5, wallThickness, { isStatic: true });

        // Create bodies
        const stickerBodies = stickerData.map((data, i) => {
            const w = mobile ? data.width * 0.5 : data.width;
            const h = mobile ? data.height * 0.5 : data.height;
            return Bodies.rectangle(
                Math.random() * (width - 100) + 50,
                Math.random() * -1000 - 100,
                w,
                h,
                {
                    chamfer: { radius: mobile ? 16 : 32.5 },
                    restitution: 0.5,
                    friction: 0.2,
                    frictionAir: 0.01,
                    angle: (Math.random() - 0.5) * 2,
                }
            );
        });

        const circleBodies = circleData.map((data, i) => {
            const s = mobile ? data.size * 0.5 : data.size;
            return Bodies.circle(
                Math.random() * (width - 100) + 50,
                Math.random() * -1000 - 100,
                s / 2,
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
                    const w = i < stickerData.length
                        ? (mobile ? stickerData[i].width * 0.5 : stickerData[i].width)
                        : (mobile ? circleData[i - stickerData.length].size * 0.5 : circleData[i - stickerData.length].size);
                    const h = i < stickerData.length
                        ? (mobile ? stickerData[i].height * 0.5 : stickerData[i].height)
                        : (mobile ? circleData[i - stickerData.length].size * 0.5 : circleData[i - stickerData.length].size);
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
                className="relative w-full h-[550px] md:h-[650px] mb-[-80px] md:mb-[-120px] z-10 select-none overflow-hidden"
            >
                {stickerData.map((sticker, i) => (
                    <div
                        key={`sticker-${i}`}
                        ref={(el) => { itemsRef.current[i] = el; }}
                        className={`absolute flex items-center justify-center rounded-full border border-black shadow-lg cursor-grab active:cursor-grabbing will-change-transform ${sticker.color === "black" ? "bg-black text-white" : "bg-white text-black"
                            }`}
                        style={{
                            width: isMobile ? sticker.width * 0.5 : sticker.width,
                            height: isMobile ? sticker.height * 0.5 : sticker.height,
                            left: 0,
                            top: 0,
                            visibility: "hidden",
                            opacity: 0,
                            zIndex: 50
                        }}
                    >
                        <a href={sticker.url} target="_blank" rel="noopener noreferrer">
                            <span className="font-anton text-[18px] md:text-[40px] uppercase leading-none pb-1 pointer-events-none">
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
                            width: isMobile ? circle.size * 0.5 : circle.size,
                            height: isMobile ? circle.size * 0.5 : circle.size,
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

            <div className="relative w-full bg-black text-white rounded-t-[20vw] md:rounded-t-[15vw] pt-[20vw] md:pt-[10vw] pb-[12vw] md:pb-[4vw] px-[8vw] md:px-[10vw] z-20">
                <div className="mx-auto w-full">
                    <div className="flex flex-col gap-[10vw] md:gap-0 md:grid md:grid-cols-3 md:items-start md:mb-[8vw] mb-[15vw]">
                        {/* Invitation text - Top centered on mobile */}
                        <div className="w-full md:max-w-[22vw] text-center md:text-left order-1">
                            <p className="font-poppins text-[4vw] md:text-[1.2vw] leading-[1.4] md:leading-[1.3] font-normal opacity-90">
                                We invite you to contact our team for more information
                            </p>
                        </div>

                        {/* Let's Connect and Copyright - Row on mobile */}
                        <div className="w-full flex justify-between items-baseline order-2 md:contents">
                            <div className="flex justify-center md:block">
                                <a href="mailto:hello@trivox.com" className="font-poppins text-[4vw] md:text-[1.2vw] leading-[1.3] font-normal hover:text-[#F80000] transition-colors whitespace-nowrap">
                                    Let’s Connect
                                </a>
                            </div>
                            <div className="text-right">
                                <p className="font-poppins text-[3.2vw] md:text-[1.2vw] leading-[1.4] md:leading-[1.3] font-normal opacity-70">
                                    © {year} Trivox Studio. <br className="hidden md:block" /> All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Title Center */}
                    <div className="w-full flex justify-center mb-[10vw] md:mb-[6vw] overflow-hidden">
                        <h2 className="font-anton text-[13.5vw] sm:text-[19vw] md:text-[19.2vw] lg:text-[18vw] xl:text-[15.5vw] leading-[0.8] uppercase text-white tracking-[-0.01em] whitespace-nowrap select-none pt-[2vw] pb-[1vw]">
                            TRIVOX STUDIO
                        </h2>
                    </div>

                    {/* Back to Top */}
                    <div className="flex justify-center mt-[4vw]">
                        <button onClick={scrollToTop} className="group cursor-pointer flex flex-col items-center gap-[2vw] md:gap-[1vw] font-poppins text-[4vw] md:text-[1.1vw] leading-[1.3] font-normal hover:text-[#F80000] transition-colors">
                            <span className="uppercase tracking-[0.2em] flex items-center gap-[0.5vw]">
                                <span>[</span>
                                <ArrowUp className="w-[4.5vw] h-[4.5vw] md:w-[1.5vw] md:h-[1.5vw]" strokeWidth={2} />
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
