"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Search,
  PenSquare,
  Moon,
  Sun,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-300 py-3 ${
        isScrolled
          ? "bg-bg-secondary border-b border-text-primary"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-primary flex items-center justify-center rounded-xl transform group-hover:rotate-6 transition-transform">
            <span className="font-serif text-lg sm:text-xl font-bold">I</span>
          </div>
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-foreground">
            Ink<span className="text-accent-primary">Flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLink href="/explore">Explore</NavLink>
          <NavLink href="/trending">Trending</NavLink>
          <NavLink href="/categories">Categories</NavLink>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-foreground/5 rounded-full transition-colors text-foreground cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted &&
              (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
          </button>

          <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block" />

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-foreground text-background px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:opacity-90 transition-all cursor-pointer">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/writer/dashboard"
                className="p-2 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                title="Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>

              <Link
                href="/write"
                className="flex items-center gap-2 text-sm font-bold bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all cursor-pointer"
              >
                <PenSquare size={18} />
                <span className="hidden sm:inline">Write</span>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <button
              className="md:hidden p-2 text-foreground cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 top-[64px] z-50 bg-background md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 h-full border-t border-border">
          <Link
            href="/explore"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif font-medium border-b border-border pb-4"
          >
            Explore
          </Link>
          <Link
            href="/trending"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif font-medium border-b border-border pb-4"
          >
            Trending
          </Link>
          <Link
            href="/categories"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif font-medium border-b border-border pb-4"
          >
            Categories
          </Link>

          <SignedIn>
            <Link
              href="/writer/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-2xl font-serif font-medium border-b border-border pb-4 text-accent-primary"
            >
              <LayoutDashboard size={24} /> Dashboard
            </Link>
          </SignedIn>

          <div className="mt-auto space-y-4 pb-10">
            <button className="flex items-center gap-3 text-lg font-medium w-full p-4 bg-foreground/5 rounded-xl cursor-pointer">
              <Search size={20} /> Search Articles
            </button>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full py-4 text-center font-bold border border-foreground rounded-xl cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group cursor-pointer"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-primary transition-all group-hover:w-full" />
    </Link>
  );
}
