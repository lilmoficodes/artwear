"use client"
import LoginBtn from "./LoginBtn";
import { RxHamburgerMenu } from "react-icons/rx";
import SignupBtn from "./SignupBtn"
import { useSession } from "next-auth/react"
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="rounded-md backdrop-blur-md bg-transparent flex items-center justify-between px-3 p-8 z-50 sticky top-0
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
            <Link href={"/aboutus"}>
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
            <RxHamburgerMenu size={30} />
          </div>
        </>
      ) : (
        <div className="flex gap-3">
          <SignupBtn/>
          <LoginBtn />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
