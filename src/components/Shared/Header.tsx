"use client"

import Image from "next/image"
import Link from "next/link"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"

const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "Market", href: "/market" },
    { label: "Sessions", href: "/sessions" },
    { label: "Profile", href: "/profile" },
]

export default function Header() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-border/40 glass-effect shadow-[0px_20px_40px_rgba(44,47,49,0.06)]">
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
                <Link
                    href="#"
                    className="font-headline text-xl font-bold tracking-tight gradient-text"
                >
                    SkillBarter
                </Link>

                <nav className="hidden items-center gap-8 font-headline text-sm font-medium tracking-wide md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={
                                item.active
                                    ? "border-b-2 border-primary pb-1 text-primary"
                                    : "text-muted-foreground transition-colors hover:text-primary"
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label="Notifications"
                    >
                        <Bell className="size-5" />
                    </Button>

                    <div className="size-10 overflow-hidden rounded-full border-2 border-primary-container">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLJT4168KaZPrh7aPxkrI4P_60hACSgf_xCOTire6QCXMNVT4WqgDE8Q7oWvGAOeFWleCH3dTAYkUVeiNasxAxetbs0H2K106a5Pg51wugtdx0IVCexILyVqvvWoGJlXTSYmJEiHhvguM4XUUYhIkaGe-JZoEcA2V0ZQkVNbJil_JPFGw5oYyF5n3Byl1O1UkRF5kNVPzxdDNhPSAgW-_CvsC5q0LSY7RCTsJWINMFRN-7QbA8D8OCmKj7MMXJRrAsBxIEWym_iu9E"
                            alt="User profile avatar"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
};
