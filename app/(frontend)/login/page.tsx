"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, ChangeEvent } from "react";
import SignInButton from "@/components/SignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
gsap.registerPlugin(useGSAP);
const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const welcomebackref = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("Signin response", res)
    if (res?.error) {
      // 🚀 User not found or invalid credentials – redirect to signup
      router.push("/signup");
    } else {
      router.push("/");
    }
  };
  useGSAP(() => {
    gsap.from(welcomebackref.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      stagger: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <main className="bg-black text-white h-[85vh] md:h-screen 
    flex items-center justify-center overflow-hidden
      bg-gradient-to-tr from-purple-900 via-black to-black">
      {/* Left Visual Section */}
      <div
        ref={imageRef}
        className="hidden md:flex flex-col justify-center items-center h-full p-10"
      >
        <h2 className="text-4xl mb-4">Elevate Your Style</h2>
        <p className="text-lg max-w-md text-gray-300 text-center">
          Discover fashion that defines you. Sign in to explore curated collections crafted just for you.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center overflow-hidden">
        <div className="shadow-2xl h-[30rem] backdrop:blur-3xl bg-transparent w-80 md:w-[28rem] rounded-xl border border-[rgba(255,255,255,0.2)]
         ">
          <div className="flex flex-col justify-center items-center h-full">

            <div className="text-center mt-6">
              <h1 className="text-xl uppercase underline" ref={welcomebackref}>
                welcome back user
              </h1>
            </div>
            <form className="px-6 mt-6">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                id="email"
                className="bg-white p-2 rounded-3xl outline-none w-full px-5 text-black"
                placeholder="abc@gmail.com"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                id="password"
                className="bg-white p-2 rounded-3xl outline-none mt-4 w-full px-5 text-black"
                placeholder="Password goes here"
              />
              <div className="text-center mt-6">
                <button
                  onClick={handleLogin}
                  disabled={!email || !password ? true : false}
                  type="button"
                  className="md:text-xl active:bg-white
                   active:text-black hover:bg-white hover:text-black border
                    border-[rgba(255,255,255,0.2)] 
                 rounded-full px-10 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                 uppercase"
          
                >
                  Login now
                </button>
                <div className="mt-2">
                  <span>Forgot password</span>
                </div>
              </div>
              <div className="text-center mt-4 text-gray-400">— or —</div>
            </form>
            <div className="mt-2 text-center px-7 w-full">
              <SignInButton />
            </div>
          </div>


        </div>
      </div>
    </main>
  );
};

export default LoginPage;
