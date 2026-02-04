import React from "react";
import Link from "next/link";
import {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import FooterNewsletter from "./footer-newsletter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-accent-primary text-background flex items-center justify-center rounded-lg">
                <span className="font-serif text-lg font-bold">I</span>
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-foreground">
                Ink<span className="text-accent-primary">Flow</span>
              </span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-xs">
              A premium space for deep thinkers and storytellers. We believe in
              the power of the written word to change perspectives and build
              communities.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Github size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">
              Platform
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/explore">Explore</FooterLink>
              <FooterLink href="/trending">Trending</FooterLink>
              <FooterLink href="/series">Series</FooterLink>
              <FooterLink href="/authors">Our Writers</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">
              For Writers
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/write">Write a Story</FooterLink>
              <FooterLink href="/guidelines">Guidelines</FooterLink>
              <FooterLink href="/benefits">Creator Program</FooterLink>
              <FooterLink href="/help">Writing Tips</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">
              Stay Inspired
            </h4>
            <p className="text-foreground/60 text-sm">
              Join our weekly digest for the best stories and writing insights.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/40 font-medium">
            &copy; {currentYear} InkFlow. Made with ❤️ by{" "}
            <Link
              className="text-white underline"
              href="https://lexiz.is-a.dev"
              target="_blank"
            >
              Alexander
            </Link>
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-foreground/40 hover:text-accent-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-foreground/40 hover:text-accent-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-foreground/40 hover:text-accent-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-foreground/60 hover:text-accent-primary transition-colors flex items-center gap-1 group"
      >
        {children}
        <ArrowUpRight
          size={12}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-accent-primary hover:border-accent-primary transition-all duration-300"
    >
      {icon}
    </Link>
  );
}
