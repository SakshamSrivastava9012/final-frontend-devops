'use client'
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import AnimatedButton from "@/components/AnimatedButton"
import { ExternalLink } from "lucide-react"

export default function ParticipantCard({p,onScore}:{p:any,onScore:(n:number)=>void}) {

  const [score,setScore] = useState(0)

  return (
    <div className="glass neon rounded-2xl p-6 space-y-4 hover:scale-[1.02] transition">

      <h3 className="text-lg font-bold">{p.fullName}</h3>

      <div className="text-xs opacity-60">
        {p.teamName} · {p.category}
      </div>

      {p.googleDriveLink && (
        <a
          href={p.googleDriveLink}
          target="_blank"
          className="text-sm text-primary flex gap-2"
        >
          <ExternalLink size={16}/> Submission
        </a>
      )}

      <div className="pt-4 space-y-2">

        <div className="flex justify-between text-sm">
          <span>Score</span>
          <span>{score}/10</span>
        </div>

        <Slider
          defaultValue={[0]}
          max={10}
          step={1}
          onValueChange={v=>setScore(v[0])}
        />

        <AnimatedButton
          className="w-full mt-4"
          onClick={()=>onScore(score)}
        >
          Submit Score
        </AnimatedButton>

      </div>

    </div>
  )
}
