'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { judgeApi } from "@/lib/api"
import AnimatedButton from "@/components/AnimatedButton"

export default function JudgeLogin() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [otp,setOtp]=useState("")
  const [step,setStep]=useState<1|2>(1)

  const router = useRouter()

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="glass-dark p-10 rounded-2xl w-[360px] space-y-6">

        <h1 className="text-2xl font-black text-center">Judge Login</h1>

        {step===1 && (
          <>
            <input
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
              placeholder="Email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
              placeholder="Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />

            <AnimatedButton
              className="w-full"
              onClick={async()=>{
                await judgeApi.login(email,password)
                setStep(2)
              }}
            >
              Send OTP
            </AnimatedButton>
          </>
        )}

        {step===2 && (
          <>
            <input
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
              placeholder="Enter OTP"
              value={otp}
              onChange={e=>setOtp(e.target.value)}
            />

            <AnimatedButton
              className="w-full"
              onClick={async()=>{
                await judgeApi.verifyOtp(email,otp)
                router.push("/judge")
              }}
            >
              Verify OTP
            </AnimatedButton>
          </>
        )}

      </div>
    </div>
  )
}
