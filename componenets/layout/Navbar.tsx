"use client";

import Link from "next/link";
import { useAccess } from "@/context/AccessContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { unlocked } = useAccess();

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {!unlocked ? (
        // Locked: only logo
        <div className="h-20 flex items-center justify-center">
          <div className="flex text-2xl font-extrabold tracking-wider">
            <span className="text-red-500">G</span>
            <span className="text-green-500">D</span>
            <span className="text-yellow-400">G</span>
            <span className="text-blue-400">C</span>
          </div>
        </div>
      ) : (
        // Unlocked navbar
        <motion.nav
          initial={{ opacity: 0, rotateX: -90, y: -40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="backdrop-blur-xl bg-gradient-to-r from-[#0f172a]/80 via-[#0b1120]/80 to-[#0f172a]/80 border-b border-white/10 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link href="/" className="flex text-xl font-extrabold tracking-wide">
                <span className="text-red-500">G</span>
                <span className="text-green-500">D</span>
                <span className="text-yellow-400">G</span>
                <span className="text-blue-400">C</span>
              </Link>

              {/* Links */}
              <div className="flex items-center gap-8 text-sm font-medium">
                <NavItem href="/member-availability">Member Availability</NavItem>
                <NavItem href="/committee-availability">Committee Availability</NavItem>
              </div>

            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

function NavItem({ href, children }: any) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 rounded-lg text-white/80 transition-all duration-300
                 hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]
                 before:absolute before:inset-0 before:rounded-lg
                 before:bg-gradient-to-r before:from-blue-500/0 before:to-indigo-500/0
                 hover:before:from-blue-500/10 hover:before:to-indigo-500/10
                 before:transition-all before:duration-300"
    >
      {children}
    </Link>
  );
}