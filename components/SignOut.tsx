import { signOut } from "next-auth/react";
const SignOut = () => {
    return (
        <button onClick={() => signOut()} className="px-5 md:px-10 md:py-2
        hover:bg-white
        hover:text-black text-white
         border 
         border-[rgba(255,255,255,0.2)]
         outline-0
         transition duration-300 
         ease-in-out 
         cursor-pointer
         rounded-full">
            <div>
                <h1 className="uppercase">Sign out</h1>
            </div>
        </button>
    )
}
export default SignOut
