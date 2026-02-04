'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import AppLayout from '@/components/AppLayout'
import EventCard from '@/components/EventCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Loader2, CheckCircle2 } from 'lucide-react'
import AnimatedButton from '@/components/AnimatedButton'

export default function EventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: api.getEvents,
  })

  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // ✅ FORM STATE
  const [fullName, setFullName] = useState("")
  const [gender, setGender] = useState("Male")
  const [profileImage, setProfileImage] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()

  const token = localStorage.getItem("jwt")

  if (!token) {
    alert("Please login to register for this event.")
    return
  }

  setIsRegistering(true)

  try {
    await api.registerForEvent(selectedEvent.id, {
      fullName,
      gender,
      profileImage
    })

    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
      setSelectedEvent(null)
    }, 2000)

  } catch (err: any) {

    const status = err?.status || err?.response?.status
    const msg = err?.message || err?.response?.message

    // 🔐 Not logged in / token expired
    if (status === 401) {
      alert("Session expired. Please login again.")
      localStorage.removeItem("jwt")
      return
    }

    // 🚫 Already registered
    if (msg === "ALREADY_REGISTERED") {
      alert("You already registered for this event.")
      return
    }

    // fallback
    alert("Registration failed. Try again.")

  } finally {
    setIsRegistering(false)
  }
}


  return (
    <AppLayout>
      <div className="pt-32 pb-20 container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 hero-gradient">
            Upcoming Events
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Join our DevOps workshops and hands-on sessions.
          </p>
        </motion.div>

        {/* Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[420px] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-card rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedEvent.imageUrl}
                className="h-60 w-full object-cover"
                alt={selectedEvent.title}
              />

              <div className="p-8 space-y-6">

                <h2 className="text-2xl font-black">
                  {selectedEvent.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedEvent.description}
                </p>

                {isSuccess ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    <p className="font-bold">Registered Successfully</p>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">

                    <input
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                    />

                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>

                    <input
                      value={profileImage}
                      onChange={e => setProfileImage(e.target.value)}
                      placeholder="Profile Image URL"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                    />

                    <AnimatedButton type="submit" disabled={isRegistering} className="w-full py-4">
                      {isRegistering ? <Loader2 className="animate-spin" /> : 'Register'}
                    </AnimatedButton>

                  </form>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </AppLayout>
  )
}
