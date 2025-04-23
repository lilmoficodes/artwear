"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ParticlesBackground from "@/components/ParticlesBackground";

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
        <div className="sticky top-0 text-white text-lg backdrop-blur-2xl bg-transparent py-5 border border-white/30">
          <div className="text-2xl underline md:text-3xl text-center">
            Welcome {email && email.split("@")[0] || "No username found"}
          </div>
        </div>
        <div className="border border-white/20 mt-5 rounded-md">
          <h1 className="text-2xl my-3 uppercase underline  text-center">Account Settings🔔</h1>
          <div>
            <ol className="text-lg uppercase underline decoration-white/30">
              <li className="border border-white/10 active:text-slate-400 hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Change Password</li>
              <li className="border border-white/10 active:text-slate-400 hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Two-Factor Authentication (2FA)</li>
              <li className="border border-white/10 active:text-slate-400 hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Username Update</li>
              <li className="border border-white/10 active:text-slate-400 hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Delete Account / Deactivate</li>
            </ol>
          </div>
        </div>
        <div className="mt-7 py-3 border border-white/20 rounded-md">
          <h1 className="text-center uppercase underline text-2xl">🎨 Appearance / Theme</h1>
          <ol className="uppercase text-lg underline decoration-white/30 mt-2 ">
            <li className="border border-white/10 active:text-slate-400 hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Light / Dark Mode Toggle</li>
            <li className="border border-white/10 active:text-slate-400 hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer rounded-sm text-center my-3 p-1">Theme Customization (colors, fonts, layout density)</li>
          </ol>
        </div>
        <div className="mt-7 py-3 border border-white/20 rounded-md">
          <h1 className="text-center uppercase underline text-xl">🌍 Language & Localization</h1>
          <ol className="uppercase text-lg underline decoration-white/30 mt-2 ">
            <li className="border border-white/10 active:text-slate-400
           hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer
            rounded-sm text-center my-3 p-1">Language Selection</li>
            <li className="border border-white/10 active:text-slate-400
           hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer 
           rounded-sm text-center my-3 p-1">Timezone Settings</li>

            <li className="border border-white/10 active:text-slate-400
           hover:text-slate-400 transition duration-200 ease-in-out cursor-pointer 
           rounded-sm text-center my-3 p-1">Date & Time Format</li>
          </ol>
        </div>
      </main>
    </>

  );
}

export default SettingsPage;
