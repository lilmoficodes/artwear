"use client"
import lenis from "lenis"
import { useEffect } from "react"

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const lenisInstance = new lenis({
            duration: 1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            syncTouch: true,
            syncTouchLerp : 1,
        });

        function raf(time: number) {
            lenisInstance.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenisInstance.destroy()
        }
    }, [])

    return <>{children}</>
}

export default LenisProvider
