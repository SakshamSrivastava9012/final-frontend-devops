'use client'

import { useState } from "react"
import { adminApi } from "@/lib/api"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"login" | "otp">("login")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (loading) return
    setLoading(true)
    setError("")

    try {
      await adminApi.login(email, password)
      setStep("otp")
    } catch (err: any) {
      setError(err?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!otp) return setError("Enter OTP")
    if (loading) return

    setLoading(true)
    setError("")

    try {
      const token = await adminApi.verifyOtp(email, otp)
      
      // Determine if we are on localhost for Secure flag
      const isLocal = window.location.hostname === "localhost"
      const secureFlag = isLocal ? "" : "Secure;"
      
      // Use Max-Age (e.g., 1 day) so the cookie persists across session
      document.cookie = `jwt=${token}; path=/; Max-Age=86400; SameSite=Lax; ${secureFlag}`

      // Force a hard redirect to ensure middleware picks up the cookie
      window.location.href = "/admin"
    } catch (err: any) {
      setError(err?.message || "OTP Verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 w-96 space-y-4">
        <h1 className="text-xl font-bold text-center">Admin Login</h1>
        {step === "login" && (
          <>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 rounded py-2 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}
        {step === "otp" && (
          <>
            <input
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-center"
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-green-600 rounded py-2 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button 
              onClick={() => setStep("login")} 
              className="w-full text-xs text-neutral-500"
            >
              Back to Login
            </button>
          </>
        )}
        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
      </div>
    </div>
  )
}