"use client"
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger)
import { useRef } from "react";
const Footer = () => {
  const footertextRefdiv = useRef<HTMLDivElement>(null);
  const footertextRefheading = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    if (footertextRefheading.current) {
      gsap.from(footertextRefheading.current, {
        rotate: 180,
        opacity: 0,
        duration: 2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: footertextRefheading?.current,

        }
      })
    }
    if (footertextRefdiv.current) {
      gsap.from(footertextRefdiv.current, {
        opacity: 0,
        x: 5,
        duration: 2,
        ease: "power3.inOut",
        stagger: 1,
        scrollTrigger: {
          trigger: footertextRefheading?.current,
          start: "bottom 100%"
        }
      })
    }
  }, [])
  return (
    <footer className="h-auto mt-4  md:mx-4">
      <div className="bg-slate-50 rounded-lg">
        <div className="text-black text-3xl md:text-5xl text-center uppercase underline">Follow us on</div>
        <div className="icons mt-10 border-b-2 border-cyan-950 pb-3">
          <div className="flex justify-around" ref={footertextRefdiv}>
            <BsTwitterX size={30} color="#000" />
            <FaInstagram size={30} color="#000" />
            <FaFacebookF size={30} color="#000" />
          </div>
        </div>
        <div>
          <h1 ref={footertextRefheading} className="text-4xl md:text-6xl underline text-center 
          text-black uppercase md:mt-4 p-2">since 2025</h1>
        </div>
      </div>
      <div className="h-24 bg-slate-900 rounded-lg text-gray-400 px-1">
        <div className="grid md:grid-cols-3 grid-cols-3 gap-y-3
       uppercase
       text-xs
       md:text-base">
          <span className="hover:underline active:underline w-fit  cursor-pointer decoration-white">contact us</span>
          <span className="hover:underline active:underline w-fit  cursor-pointer decoration-white">faq</span>
          <span className="hover:underline active:underline w-fit  cursor-pointer decoration-white">about artwear</span>
          <span className="hover:underline active:underline w-fit  cursor-pointer decoration-white">privacy policy</span>
          <span className="hover:underline active:underline w-fit  cursor-pointer decoration-white">terms and conditions</span>
          <span className="hover:underline active:underline w-fit  ease-in-out cursor-pointer decoration-white">book appointment</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
