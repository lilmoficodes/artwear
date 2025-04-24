"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ParticlesBackground from "@/components/ParticlesBackground";
import Link from "next/link";

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string | undefined>("");
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  if (status === "loading") {
    return <div className="text-white text-center text-2xl">Loading...</div>;
  }

  return (
    <>
      <ParticlesBackground />
      <main className="">
        <div className="sticky top-0 text-white text-lg backdrop-blur-2xl
         bg-transparent py-8 border border-white/30 rounded-lg">
          <div className="text-2xl underline md:text-3xl text-center">
            Welcome {email && email.split("@")[0] || "No username found"}
          </div>
        </div>
        <div className="border border-white/20 mt-5 rounded-md">
          <h1 className="text-2xl my-3 uppercase underline  text-center">Account Settings🔔</h1>
          <div>
            <ol className="text-lg uppercase underline decoration-white/30">
             <Link href={"settings/signout"}>
             <li className="border border-white/10 text-white/60
               active:text-white hover:text-white transition duration-200
                ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Sign Out</li>              
             </Link>
             <Link href={"settings/changepassword"}>
             <li className="border border-white/10 text-white/60
               active:text-white hover:text-white transition duration-200
                ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Change Password</li>   
             </Link>
             <Link href={"settings/twofa"}>
             <li className="border border-white/10 text-white/60
               active:text-white hover:text-white transition duration-200
                ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Two-Factor Authentication (2FA)</li>             
             </Link>
             <Link href={"settings/updateusername"}>
             <li className="border border-white/10 text-white/60
                active:text-white hover:text-white transition duration-200 
                ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Update Username</li>
             </Link>
             <Link href={"settings/deactivate"}>
             <li className="border border-white/10 text-white/60
               active:text-white hover:text-white transition duration-200
                ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Deactivate Account</li>
             </Link>  
             <Link href={"settings/delete"}>
             <li className="border border-white/10 text-white/60
               active:text-white hover:text-white transition duration-200
                ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Delete Account</li>
             </Link>    
            </ol>
          </div>
        </div>
        <div className="mt-7 py-3 border border-white/20 rounded-md">
          <h1 className="text-center uppercase underline text-2xl">🎨 Appearance / Theme</h1>
          <ol className="uppercase text-lg underline decoration-white/30 mt-2 ">
            <li className="border border-white/20 text-white/60 active:text-white
             hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Light / Dark Mode Toggle</li>
            <li className="border  border-white/20 text-white/60
             active:text-white hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Theme Customization (colors, fonts, layout density)</li>
          </ol>
        </div>
        <div className="mt-7 py-3 border border-white/20 rounded-md">
          <h1 className="text-center uppercase underline text-xl">🌍 Language & Localization</h1>
          <ol className="uppercase text-lg underline decoration-white/30 mt-2 ">
          {["Language Selection", "Timezone Settings", "Date & Time Format"].map((item, i) => (
            <li key={i} className="border border-white/10 text-white/60 active:text-white hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">
              {item}
            </li>
          ))}
           </ol>
        </div>
      </main>
    </>

  );
}

export default SettingsPage;
