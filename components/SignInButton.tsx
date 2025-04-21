"use client"
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
const SignInButton = () => {

    return (
        <button className="border border-[rgba(255,255,255,0.3)] w-full h-12 rounded-3xl 
        cursor-pointer hover:bg-white hover:text-black active:bg-white active:text-black  transition duration-200 ease-in-out"
         onClick={()=>signIn("google")}>
            <div className="flex items-center justify-center">
                <FcGoogle size={30} />
                <div>
                    <h1 className="mx-2">Continue with Google</h1>
                </div>
            </div>
            <div>
            </div>
        </button>
    )
}

export default SignInButton
