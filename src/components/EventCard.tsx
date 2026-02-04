'use client';

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, ExternalLink, X } from 'lucide-react';
import { Event, api } from '@/lib/api';
import AnimatedButton from './AnimatedButton';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {

  const [open,setOpen] = useState(false)

  const [fullName,setFullName] = useState("")
  const [gender,setGender] = useState("")
  const [teamName,setTeamName] = useState("")
  const [category,setCategory] = useState("")
  const [googleDriveLink,setDrive] = useState("")
  const [loading,setLoading] = useState(false)

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const submit = async () => {

  const jwt = localStorage.getItem("jwt")

  if(!jwt){
    alert("Please login first")
    return
  }

  if(!fullName || !teamName || !category || !googleDriveLink){
    alert("Fill all fields")
    return
  }

  setLoading(true)

  try{
    await api.registerForEvent(event.id,{
      fullName,
      gender,
      teamName,
      category,
      googleDriveLink,
      profileImage:""
    })

    alert("Registered successfully")
    setOpen(false)

  }catch(e){
    alert("Registration failed")

  }finally{
    setLoading(false)
  }
}


  return (
    <>
    {/* CARD */}
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[450px] w-full rounded-2xl glass-dark border border-white/10 overflow-hidden cursor-pointer"
      onClick={()=>setOpen(true)}
    >

      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-1/2 w-full overflow-hidden bg-black">
        <img src={event.imageUrl} className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-40" />

        <motion.img
          src={event.imageUrl}
          className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col h-1/2 justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3"/> Coming Soon
          </div>

          <h3 className="text-xl font-bold mt-2">{event.title}</h3>
          <p className="text-sm opacity-70 line-clamp-2">{event.description}</p>
        </div>

        <AnimatedButton size="sm">
          Register <ArrowRight className="w-4 h-4 ml-1"/>
        </AnimatedButton>
      </div>
    </motion.div>

    {/* MODAL */}
    {open && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

        <div className="glass-dark p-8 rounded-xl w-[360px] space-y-4 relative">

          <X className="absolute right-4 top-4 cursor-pointer" onClick={()=>setOpen(false)}/>

          <h2 className="font-bold text-xl">Register</h2>

          <input placeholder="Full Name" className="w-full p-3 rounded bg-black/40"
            value={fullName} onChange={e=>setFullName(e.target.value)}/>

          <input placeholder="Gender" className="w-full p-3 rounded bg-black/40"
            value={gender} onChange={e=>setGender(e.target.value)}/>

          <input placeholder="Team Name" className="w-full p-3 rounded bg-black/40"
            value={teamName} onChange={e=>setTeamName(e.target.value)}/>

          {/* ONLY 3 CATEGORIES */}
          <select className="w-full p-3 rounded bg-black/40"
            value={category} onChange={e=>setCategory(e.target.value)}>

            <option value="">Select Category</option>
            <option value="Brainrot">Brainrot</option>
            <option value="Branding">Branding</option>
            <option value="Anime">Anime</option>

          </select>

          <input placeholder="Google Drive Link" className="w-full p-3 rounded bg-black/40"
            value={googleDriveLink} onChange={e=>setDrive(e.target.value)}/>

          <AnimatedButton className="w-full" disabled={loading} onClick={submit}>
            {loading ? "Submitting..." : "Submit"}
          </AnimatedButton>

        </div>
      </div>
    )}
    </>
  )
}
