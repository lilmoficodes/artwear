"use client";
import { useEffect } from "react";
import { loadAll } from "@tsparticles/all";
import { tsParticles } from "@tsparticles/engine";
import { Particles } from "@tsparticles/react";

interface ParticlesBackgroundProps {
    zIndex?: number;
    color?: string;
}

export default function ParticlesBackground({
    zIndex = -99,
    color = "yellow",
}: ParticlesBackgroundProps) {
    useEffect(() => {
        loadAll(tsParticles); // ✅ Load engine only once here
    }, []);

    return (
        <Particles
            className="absolute top-0"
            id="tsparticles"
            options={{
                fullScreen: { enable: true, zIndex },
                background: { color: "#000" },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                    },
                    modes: {
                        repulse: {
                            distance: 100,
                            duration: 1.5,
                        }
                    }
                },
                particles: {
                    number: {
                        value: 0.2,
                        density: {
                            enable: true,
                            width: 3,
                        },
                    },
                    color: { value: color },
                    shadow :{
                        enable : true,
                        color : "#fff",
                        blur : 50
                    },
                    shape: { type: "star" },
                    opacity: {
                        value: { min: 1, max: 2 },
                        animation: {
                            enable: true,
                            speed: 0.02,
                            startValue: "max",
                            destroy: "min",
                        },
                    },
                    size: {
                        value: { min: 1, max: 9 },
                        animation: { enable: true },
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {
                            default: "out",
                        },
                    },
                },
            }}
        />
    );
}
