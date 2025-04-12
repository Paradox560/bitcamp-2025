"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between mx-auto max-w-7xl px-2.5">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="">
                        <span className="font-bold text-xl">MacroTerpitect</span>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="/"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <SignedIn>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        href="/enter-info"
                                                    >
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            Enter Macros
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Manage your macros and keep on pace to achieve
                                                            your goal
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                        href="/recipes"
                                                    >
                                                        <div className="text-sm font-medium leading-none">
                                                            Recipes
                                                        </div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                            Find recipes based on ingredients you already have
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                        href="/saved-recipes"
                                                    >
                                                        <div className="text-sm font-medium leading-none">
                                                            Saved Recipes
                                                        </div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                            See previously generated recipes
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </SignedIn>
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="/contact"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    About Us
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-2">
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-10 w-10",
                                },
                            }}
                        />
                    </SignedIn>
                    <SignedOut>
                        <Button asChild variant="outline" className="mr-2">
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}

export default Navbar;