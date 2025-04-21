"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, ChangeEvent } from "react";
import SignInButton from "@/components/SignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
gsap.registerPlugin(useGSAP);
const SignupPage = () => {
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
    try {
      // First create the user
      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // this will send email and password to api route to save into database
      });
  
      if (!signupRes.ok) {
        const data = await signupRes.json();
        console.error("Signup failed:", data.error);
        return;
      }
  
      // Then immediately sign in
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      console.log("Signup then login response:", res);
      if (res?.ok) {
        router.push("/"); // redirect to homepage or dashboard
      }
  
    } catch (error) {
      console.error("Error during signup/login:", error);
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
    <main className="bg-black text-white h-[85vh] md:h-screen flex items-center -z-10
     justify-center overflow-hidden font-neue bg-gradient-to-tr from-purple-900 via-black to-black">
      {/* Left Visual Section */}
      <div
        ref={imageRef}
        className="hidden md:flex flex-col justify-center items-center h-full p-10"
      >
        <h2 className="text-4xl font-bold mb-4">Elevate Your Style</h2>
        <p className="text-lg max-w-md text-gray-300 text-center">
          Discover fashion that defines you. Sign in to explore curated collections crafted just for you.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center">
        <div className="shadow-2xl backdrop:blur-2xl bg-transparent h-[30rem] w-80 md:w-[28rem] rounded-xl border border-[rgba(255,255,255,0.2)]
          mb-10 md:mb-0">
          <div className="flex flex-col justify-center items-center h-full">

            <div className="text-center mt-6">
              <h1 className="text-2xl font-bold" ref={welcomebackref}>
                Seems like you are new user
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
                  className="text-lg active:bg-white active:text-black hover:bg-white hover:text-black border border-[rgba(255,255,255,0.2)] 
                 rounded-full uppercase px-10 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign up
                </button>
              </div>
              <div className="text-center mt-4 text-gray-400">— or —</div>
            </form>
            <div className="mt-2 text-center px-7 w-full">
              <SignInButton/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;

