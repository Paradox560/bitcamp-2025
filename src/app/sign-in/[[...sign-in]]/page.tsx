import { SignIn } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "../../components/navbar";

export default function SignInPage() {
    return (
        <div className="min-h-screen w-full bg-[#E8F5E9]">
            <Navbar/>
            
            <main className="container mx-auto flex flex-col items-center justify-center pt-20 pb-10 text-themeCream">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
                    Sign In
                </h1>
                <div className="w-full flex justify-center">
                    <SignIn />
                </div>
            </main>
        </div>
    )
}