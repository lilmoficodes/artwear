import Link from "next/link"

const LoginBtn = () => {
  return (
    <button className="px-5 py-1 md:px-10 md:py-2 hover:bg-white
    hover:text-black
     text-white border 
     active:bg-white
     active:text-black+
     border-[rgba(255,255,255,0.2)]
     transition duration-300 
     ease-in-out 
     cursor-pointer
     rounded-full">
      <Link href={"/login"}>
        <div>
          <h1 className="uppercase">Login</h1>
        </div>
      </Link>

    </button>
  )
}
export default LoginBtn
