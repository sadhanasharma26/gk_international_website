"use client";
import Link from "next/link";
import { useState } from "react";
import { company } from "@/config/company";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-base font-semibold">
          <Image src="/logo.png" alt="GK International logo" width={36} height={36} />
          <span>{company.name}</span>
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="i-[ ]">☰</span>
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-neutral-200 px-6 py-3 text-sm dark:border-neutral-800 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


