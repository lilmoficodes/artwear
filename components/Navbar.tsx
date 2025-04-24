"use client"
import { useState, useRef, useEffect } from "react";
import LoginBtn from "./LoginBtn";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import SignupBtn from "./SignupBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ParticlesBackground from "./ParticlesBackground";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isDropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
          transformOrigin: "top center",
        }
      );
    }
    else if(!isDropdownOpen){
      gsap.from(
        dropdownRef.current,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        }
      );
    }
  }, [isDropdownOpen]);

  return (
    <>
   <nav>
   {isDropdownOpen && (
              <>
              <ul
                ref={dropdownRef}
                className=" absolute top-0 h-full w-full text-center bg-black text-white flex
                 flex-col gap-6 justify-center items-center overflow-hidden z-[999]" >
                 <ParticlesBackground/>
                <div className="absolute top-8 right-0 pr-3">
                  <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)}>
                    <RxCross2 size={40}/>
                  </button>
                </div>
                <Link href={"/products"} onClick={() => setIsDropdownOpen(false)}>
                  <li className="text-xl hover:text-yellow-300">Products</li>
                </Link>
                <Link href={"/aboutus"} onClick={() => setIsDropdownOpen(false)}>
                  <li className="text-xl hover:text-yellow-300">About us</li>
                </Link>
                <Link href={"/services"} onClick={() => setIsDropdownOpen(false)}>
                  <li className="text-xl hover:text-yellow-300">Services</li>
                </Link>
                <Link href={"/settings"} onClick={() => setIsDropdownOpen(false)}>
                  <li className="text-xl hover:text-yellow-300 flex justify-center items-center gap-2">
                    <IoSettingsOutline size={20} /> Settings
                  </li>
                </Link>
              </ul>
              </>
            
            )}
   </nav>
    <nav className="rounded-md backdrop-blur-md bg-transparent 
    flex items-center justify-between px-3 p-8 z-50 sticky top-0
     border border-[rgba(255,255,255,0.3)] uppercase">
      <div>
        <Link href={"/"}>
          <h1 className="text-xl md:text-3xl">Artwear</h1>
        </Link>
      </div>

      {status === "loading" ? (
        <div className="w-full flex-1" />
      ) : session?.user ? (
        <>
          <ul className="hidden md:flex gap-3 items-center">
            <Link href={"/products"}>
              <li>Products</li>
            </Link>
            <Link href={"/about"}>
              <li>About us</li>
            </Link>
            <Link href={"/services"}>
              <li>Services</li>
            </Link>
            <Link href={"/settings"}>
              <li><IoSettingsOutline size={20} /></li>
            </Link>
          </ul>

          <div className="block md:hidden">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <RxHamburgerMenu size={30} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-3">
          <SignupBtn />
          <LoginBtn />
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
