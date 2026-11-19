"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { authClient, signOut } from "@/lib/auth-client"

const links = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

 // Log the session data to the console

function NavLink({
  href,
  label,
  pathname,
  className,
}: {
  href: string
  label: string
  pathname: string
  className?: string
}) {
  const active = pathname === href

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-sm text-muted-foreground transition-colors hover:text-foreground",
        active && "font-semibold text-foreground",
        className
      )}
    >
      {label}
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()

  const {data: session} = authClient.useSession();

  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="HireLoop home">
          <Image
            src="/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            className="h-9 w-auto"
            preload
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.href} {...link} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span aria-hidden className="h-6 w-px bg-border" />
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Button variant="outline" nativeButton={false} render={<Link href="/profile" />}>
                {session.user.name}
              </Button>
              <Button variant="outline" nativeButton={false} render={<Link href="/sign-out" />} onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" nativeButton={false} render={<Link href="/sign-in" />}>
                Sign In
              </Button>
              <Button nativeButton={false} render={<Link href="/sign-up" />}>
                Get Started
              </Button>
            </> 
          )}
        </div>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 sm:max-w-xs">
            <SheetTitle>Menu</SheetTitle>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  {...link}
                  pathname={pathname}
                  className="rounded-lg px-3 py-2 hover:bg-muted"
                />
              ))}
            </nav>
            <span aria-hidden className="h-px w-full bg-border" />
            <div className="flex flex-col gap-2 px-1">
              {session?.user ? (
                <div className="flex items-center gap-3">
              <Button variant="outline" nativeButton={false} render={<Link href="/profile" />}>
                {session.user.name}
              </Button>
              <Button variant="outline" nativeButton={false} render={<Link href="/sign-out" />} onClick={handleSignOut}>
                Sign Out
              </Button>
            </div> 
              ) : (
                <>
                  <Button className="h-9 w-full" variant="outline" nativeButton={false} render={<Link href="/sign-in" />}>
                    Sign In
                  </Button>
                  <Button className="h-9 w-full" nativeButton={false} render={<Link href="/sign-up" />}>
                    Get Started
                  </Button>
                </> 
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
