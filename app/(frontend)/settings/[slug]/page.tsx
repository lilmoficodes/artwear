"use client"
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import SignOut from "@/components/SignOut";
const SignoutPage = () => {
    const { data: session } = useSession();
    const params = useParams();
    return (
        <main>
            <h1 className="text-center text-2xl">Seems like {session?.user?.email?.split("@")[0]} wants to {params.slug} 🫣</h1>
            <div className="text-xl flex md:flex-row flex-col items-center w-full justify-between px-4 mt-5">
                <h1>
                    We will see you soon {session?.user?.email?.split("@")[0]}
                </h1>
                <div>
                        <SignOut/>
                </div>
            </div>
        </main>
    )
}

export default SignoutPage
