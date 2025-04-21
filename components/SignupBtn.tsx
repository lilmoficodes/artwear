import Link from "next/link"

const SignupBtn = () => {
  return (
    <button className="px-5 md:px-10 md:py-2
     hover:bg-white
     active:bg-white
     active:text-black
     hover:text-black text-white
      border 
      border-[rgba(255,255,255,0.2)]
      outline-0
      transition duration-300 
      ease-in-out 
      cursor-pointer
      rounded-full">
      <Link href={"/signup"}>
        <div>
          <h1 className="uppercase">Signup</h1>
        </div>
      </Link>
    </button>
  )
}

export default SignupBtn
