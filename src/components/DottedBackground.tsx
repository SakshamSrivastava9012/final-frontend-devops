'use client'

import { motion } from "framer-motion"

export default function DottedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0b0f14] overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: "radial-gradient(#ffffff22 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Soft gradient blobs */}
      <div className="absolute -left-40 -top-40 w-[500px] h-[500px] bg-blue-500/20 blur-[140px]" />
      <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px]" />

      {/* Floating Dev icons */}
      {["∞", "{}", "☁", "⚡", "</>"].map((v, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-400/30 text-3xl font-bold"
          initial={{
            x: Math.random() * 1200,
            y: Math.random() * 800,
          }}
          animate={{
            y: [0, -40, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {v}
        </motion.div>
      ))}
    </div>
  )
}
