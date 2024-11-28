import Link from "next/link";
import LoginButton from "./ui/login-button";
import RegisterForm from "./ui/signup-button";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div id = 'landing-topbar' className = "fixed top-0 left-0 flex flex-row h-14 w-screen bg-white justify-end gap-4 items-center z-10 pr-4">
      <Link 
          href="/login"
          className="bg-white text-black border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition-colors"
        >
          Log in
        </Link>
        <Link 
          href="/register"
          className="bg-black text-white border border-black px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors"
        >
          Sign up
        </Link>
      </div>
      <div id = 'landing-img' className = "flex flex-row w-screen h-5/6">
        <Image src = "/landing.png" alt = "landing-img" layout = "fill" objectFit = "cover"/>
      </div>
    </div>
  );
}
