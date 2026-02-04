'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Instagram,
  Image,
  Calendar,
  GraduationCap
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* LEFT — DevOps Copy */}
          <div className="text-center lg:text-left max-w-md">
            <p className="text-xs uppercase tracking-[0.3em] font-black text-primary mb-2">
              DevOps Club
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineering real infrastructure. Automating everything.
              Training operators for production-grade systems.
            </p>
          </div>

          {/* CENTER — Links */}
          <div className="flex items-center gap-8">

            <FooterLink href="/gallery" icon={Image} label="Gallery" />
            <FooterLink href="/events" icon={Calendar} label="Events" />
            <FooterLink href="/alumni" icon={GraduationCap} label="Alumni" />

          </div>

          {/* RIGHT — Social */}
          <div className="flex gap-5">

            {[
              { icon: Github, url: "https://github.com" },
              { icon: Linkedin, url: "https://linkedin.com" },
              { icon: Instagram, url: "https://instagram.com" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                target="_blank"
                whileHover={{ y: -4, scale: 1.15 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10 hover:border-primary transition"
              >
                <item.icon className="w-4 h-4" />
              </motion.a>
            ))}

          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center text-[10px] uppercase tracking-widest text-muted-foreground font-black">
          Built by Operators • Shipped on Cloud • Powered by Automation
        </div>

      </div>
    </footer>
  )
}

function FooterLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: any
  label: string
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-primary transition cursor-pointer"
      >
        <Icon className="w-4 h-4" />
        {label}
      </motion.div>
    </Link>
  )
}
