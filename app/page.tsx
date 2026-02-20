"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { useAccess } from "@/context/AccessContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { unlocked, setUnlocked } = useAccess();
  const correctAnswer = "S";
  const options = ["A", "B", "S", "D"];
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (letter: string) => {
    setSelected(letter);

    if (letter === correctAnswer) {
      toast.success("Verification Successful", {
        duration: 1500,
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid rgba(34,197,94,0.4)",
        },
        icon: <CheckCircle size={18} />,
      });

      setTimeout(() => {
        setUnlocked(true);
      }, 1500);
    } else {
      toast.error("Incorrect answer. Try again.", {
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid rgba(239,68,68,0.4)",
        },
        icon: <XCircle size={18} />,
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1120] via-[#0f1b3d] to-[#020617] text-white px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <AnimatePresence mode="wait">

        {/* ================= LOCKED STATE ================= */}
        {!unlocked && (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Welcome to{" "}
              <span className="text-red-500">G</span>
              <span className="text-green-500">D</span>
              <span className="text-yellow-400">G</span>
              <span className="text-blue-400">C</span>{" "}
              Availability
            </h1>

            <p className="text-white/70 mb-10 text-lg">
              Let's verify you are a real GDGC committee member.
            </p>

            <h2 className="text-xl font-semibold mb-10">
              Choix bel . ?
            </h2>

            <div className="flex gap-6 flex-wrap justify-center">
              {options.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleClick(letter)}
                  className="w-20 h-20 rounded-full text-lg font-semibold
                             bg-gradient-to-br from-blue-500/20 to-indigo-500/20
                             border border-white/20 backdrop-blur-md
                             transition-all duration-300
                             hover:scale-110
                             hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                >
                  {letter}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ================= UNLOCKED STATE ================= */}
        {unlocked && (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Let’s Browse Our Features
            </h1>

            <p className="text-white/60 mb-12">
              You now have access to GDGC Availability tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <FeatureButton href="/member-availability">
                Member Availability
              </FeatureButton>

              <FeatureButton href="/committee-availability">
                Committee Availability
              </FeatureButton>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}

/* Reusable button (same style as navbar links but bigger) */
function FeatureButton({ href, children }: any) {
  return (
    <Link
      href={href}
      className="relative px-8 py-4 rounded-xl text-white font-medium
                 bg-gradient-to-r from-blue-600/20 to-indigo-600/20
                 border border-white/10 backdrop-blur-md
                 transition-all duration-300
                 hover:scale-105
                 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                 hover:bg-blue-500/20"
    >
      {children}
    </Link>
  );
}