import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Home, LogIn, LogInIcon, LogOutIcon, Sprout } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { stackServerApp } from "@/stack/server";
import { getUserDetails } from "@/actions/user.action";
import { UserButton } from "@stackframe/stack";

export default async function Navbar() {
    const user = await stackServerApp.getUser();
    const app = stackServerApp.urls;

    return (
        <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            href={"/"}
                            className="text-xl font-bold text-primary font-mono tracking-wider"
                        >
                            🌱 Plantventory
                        </Link>
                    </div>

                    {/* Navbar component */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button
                            variant={"ghost"}
                            className="flex items-center gap-2"
                            asChild
                        >
                            <Link href={"/plants"}>
                                <Sprout className="size-4" />
                                <span className="hidden lg:inline">Plants</span>
                            </Link>
                        </Button>

                        <Button
                            variant={"ghost"}
                            className="flex items-center gap-2"
                            asChild
                        >
                            <Link href={"/"}>
                                <Home className="size-4" />
                                <span className="hidden lg:inline">Home</span>
                            </Link>
                        </Button>
                        <ModeToggle />
                        {user ? (
                            <>
                                {/* Sign Out Button */}
                                <Button
                                    variant={"ghost"}
                                    className="flex items-center gap-2"
                                    asChild
                                >
                                    <Link href={app.signOut}>
                                        <LogOutIcon className="size-4" />
                                        <span className="hidden lg:inline">
                                            Log Out
                                        </span>
                                    </Link>
                                </Button>
                                <UserButton />
                            </>
                        ) : (
                            <>
                                {/* Sign In Button */}
                                <Button
                                    variant={"ghost"}
                                    className="flex items-center gap-2"
                                    asChild
                                >
                                    <Link href={app.signIn}>
                                        <LogInIcon className="size-4" />
                                        <span className="hidden lg:inline">
                                            Sign In
                                        </span>
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
