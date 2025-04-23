"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState<string | undefined>("");

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session.user.name);
    }
  }, [session]);

  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <main className="p-4">
      <div className="text-white text-lg block">
       <div className="text-3xl text-center">
       Welcome {username || "No username found"}
        </div>  
      </div>
    </main>
  );
}

export default SettingsPage;
