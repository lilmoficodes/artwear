"use client"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"

const Hero = () => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeDiv = useRef<HTMLDivElement>(null)
  const marqueeRefother = useRef<HTMLDivElement>(null)
  const heroTexRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (heroTexRef.current) {
      const paragraphs = heroTexRef.current.querySelectorAll("p");
      gsap.from(paragraphs, {
        opacity: 0,
        x: 20,
        y: 20,
        stagger: 1,
        duration: 1,
      })
    }

    if (marqueeRef.current) {
      const distance = marqueeRef.current.scrollWidth / 2
      gsap.to(marqueeRef.current, {
        x: distance,
        duration: 20,
        ease: "linear",
        repeat: -1,
        yoyoEase: true,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % distance - distance),
        },
      })
    }

    if (marqueeRefother.current) {
      const distance = marqueeRefother.current.scrollWidth / 2
      gsap.set(marqueeRefother.current, {
        x: distance,
      })
      gsap.to(marqueeRefother.current, {
        x: -distance,
        duration: 20,
        ease: "linear",
        repeat: -1,
        yoyo: true,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % distance - distance),
        },
      })
    }

    gsap.from(marqueeDiv.current, {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
    })
  }, [])

  return (
    <section className="pb-2 -z-10">
      {/* Top Text */}
      <div className="text-center md:mt-44 mt-24 uppercase underline" ref={heroTexRef}>
        <p className="md:text-4xl text-3xl">Step into Style</p>
        <p className="md:text-4xl text-3xl">where the fashion feels good</p>
      </div>

      {/* Marquee Box */}
      <div
        ref={marqueeDiv}
        className="bg-lime-500 mt-5 rounded-md uppercase text-black flex flex-col gap-8
        px-2 pt-10 pb-20 md:pt-16 md:pb-28 md:mx-7 -z-10"
      >
        {/* Top Marquee */}
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="flex gap-6 whitespace-nowrap underline">
            <p className="text-6xl md:text-9xl">we are artwear</p>
            <p className="text-6xl md:text-9xl">we are artwear</p>
            <p className="text-6xl md:text-9xl">we are artwear</p>
            <p className="text-6xl md:text-9xl">we are artwear</p>
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="overflow-hidden">
          <div ref={marqueeRefother} className="flex gap-6 whitespace-nowrap text-6xl md:text-9xl underline">
            <p>our design walks with you</p>
            <p>our design walks with you</p>
            <p>our design walks with you</p>
            <p>our design walks with you</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
