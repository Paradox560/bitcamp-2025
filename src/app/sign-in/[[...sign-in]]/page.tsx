import { SignIn } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignInPage() {
    return (
        <div className="min-h-screen w-full bg-themeRed">
            <header className="w-full bg-[#B37238] fixed left-0 top-0">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div>
                        <Button variant="link" asChild className="text-white p-0">
                            <Link href="/" className="text-xl tracking-wide font-medium hover:no-underline">
                                MacroTerpitech
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button variant="ghost" asChild className="text-white hover:text-white hover:bg-white/20">
                            <Link href="/sign-up">
                                Sign Up
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto flex flex-col items-center justify-center pt-20 pb-10 text-themeCream">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
                    Sign In
                </h1>
                <div className="w-full max-w-md">
                    <SignIn />
                </div>
            </main>
        </div>
    )
}