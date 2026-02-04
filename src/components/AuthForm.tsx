'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle, Mail, Lock, User, School } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import AnimatedButton from './AnimatedButton'
import { authApi } from '@/lib/api'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'login' | 'signup'
}

export default function AuthModal({ onClose, type: initialType }: AuthModalProps) {

  const [type] = useState(initialType)
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loginAction = useAuthStore(s => s.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [university, setUniversity] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [otp, setOtp] = useState('')

  // ---------------- LOGIN ----------------
const handleLogin = async (e: any) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    const token = await authApi.login(email, password)

    // STORE USER JWT
    localStorage.setItem("jwt", token)

    // Update Zustand
    loginAction(
      { id: "1", email, name: email.split("@")[0], role: "USER" },
      token
    )

    onClose()
  } catch (err: any) {
    setError(err?.message || "Invalid credentials")
  } finally {
    setLoading(false)
  }
}


  // ---------------- SIGNUP ----------------

  const handleSignup = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {

      await authApi.register({
        firstName,
        lastName,
        email,
        university,
        course,
        year,
        password
      })

      setStep("otp")

    } catch (err:any) {
      setError(err?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  // ---------------- OTP ----------------

  const handleOtpVerify = async (e: any) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    // ONLY send what backend expects
    const token = await authApi.verifyOtp({
  email,
  otp,
  password,
  firstName,
  lastName,
  university,
  course,
  year,
})

    // STORE USER JWT (important)
    localStorage.setItem("jwt", token)

    // Update Zustand
    loginAction(
      { id: "1", email, name: firstName || email.split("@")[0], role: "USER" },
      token
    )

    onClose()
  } catch (err: any) {
    setError(err?.message || "Invalid OTP")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="text-center">
        <motion.h2
          initial={{ y:-10, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          className="text-2xl font-bold"
        >
          {step === 'otp' ? "Verify OTP" : type === "login" ? "Welcome Back" : "Create Account"}
        </motion.h2>

        <p className="text-muted-foreground mt-2 text-sm">
          DevOps Hub Authentication
        </p>
      </div>

      {/* Progress */}

      {type === "signup" && (
        <div className="flex gap-2">
          <div className={`h-1 flex-1 rounded ${step === "form" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-1 flex-1 rounded ${step === "otp" ? "bg-primary" : "bg-muted"}`} />
        </div>
      )}

      <AnimatePresence mode="wait">

        <motion.form
          key={step}
          initial={{ opacity:0, y:15 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0 }}
          onSubmit={type === "login" ? handleLogin : step === "form" ? handleSignup : handleOtpVerify}
          className="space-y-4"
        >

          {type === "signup" && step === "form" && (
            <div className="grid grid-cols-2 gap-3">

              <Input icon={<User size={16}/>} value={firstName} set={setFirstName} placeholder="First name"/>
              <Input icon={<User size={16}/>} value={lastName} set={setLastName} placeholder="Last name"/>
              <Input icon={<School size={16}/>} value={university} set={setUniversity} placeholder="University"/>
              <Input icon={<School size={16}/>} value={course} set={setCourse} placeholder="Course"/>
              <Input icon={<School size={16}/>} value={year} set={setYear} placeholder="Year"/>

            </div>
          )}

          {step !== "otp" && (
            <>
              <Input icon={<Mail size={16}/>} value={email} set={setEmail} placeholder="Email"/>
              <Input icon={<Lock size={16}/>} value={password} set={setPassword} placeholder="Password" type="password"/>
            </>
          )}

          {step === "otp" && (
            <input
              value={otp}
              onChange={e=>setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full text-center text-xl tracking-widest bg-background border rounded-xl py-4"
            />
          )}

          {error && (
            <div className="text-red-500 text-sm flex gap-2">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <AnimatedButton type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin"/> :
              step === "otp" ? "Verify OTP" :
              type === "login" ? "Login" : "Register"}
          </AnimatedButton>

        </motion.form>

      </AnimatePresence>

    </div>
  )
}

function Input({ value, set, placeholder, icon, type="text" }: any) {
  return (
    <div className="flex items-center gap-2 bg-background border rounded-xl px-3 py-2">
      {icon}
      <input
        type={type}
        value={value}
        onChange={e=>{
          set(e.target.value)
        }}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full"
      />
    </div>
  )
}
