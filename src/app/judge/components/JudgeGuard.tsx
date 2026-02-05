'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function JudgeGuard({ children }: { children: React.ReactNode }) {

  const router = useRouter()

  useEffect(() => {
    const jwt = localStorage.getItem("judge_jwt")
    if (!jwt) router.push("/judge/login")
  }, [])

  return <>{children}</>
}
