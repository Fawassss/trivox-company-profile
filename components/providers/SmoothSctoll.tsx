"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.02,
                duration: 2.5,
                smoothWheel: true,
                wheelMultiplier: 0.4,
                touchMultiplier: 1.5,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
