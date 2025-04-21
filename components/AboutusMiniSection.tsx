"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GoArrowUpRight } from "react-icons/go";
import { useRef } from "react"
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);
const AboutusMiniSection = () => {
  const aboutRef = useRef<HTMLParagraphElement | HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(aboutRef.current, {
      x: 15,
      opacity: 0,
      scale: 0,
      duration: 1,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
      }
    })
  }, [])
  return (
    <>
      <div ref={aboutRef} className="bg-amber-100 md:mx-6 rounded-lg py-2 text-black uppercase px-2 underline font-bold md:font-normal 
    md:text-5xl  text-xl">
        <p>We are
          a fashion-forward clothing
          brand proudly rooted in Assam, India where tradition meets trend.
          Our mission is to craft unique,
          high-quality apparel that blends modern streetwear aesthetics with cultural essence.
          Whether you &apos; re making moves in the city or chilling with your crew,
          our designs help you express your boldest, most authentic self. Wear the vibe. Own your story
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="uppercase text-center md:text-2xl text-xl underline decoration-amber-50 mt-3">So what are you waiting for?</p>
        <Link href={"/products"}>
          <button className="hover:bg-white hover:text-black transition duration-200 ease-in-out active:bg-white active:text-black flex items-center gap-1
        uppercase border
         border-[rgba(255,255,255,0.4)] px-5 py-1 mt-2 rounded-full cursor-pointer">
            view products
            <GoArrowUpRight size={20} stroke="#fff" />
          </button>
        </Link>
      </div>
    </>
  )
}

export default AboutusMiniSection
