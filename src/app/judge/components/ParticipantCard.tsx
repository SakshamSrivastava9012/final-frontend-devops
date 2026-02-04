'use client'
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import AnimatedButton from "@/components/AnimatedButton"
import { ExternalLink } from "lucide-react"

export default function ParticipantCard({p,onScore}:{p:any,onScore:(n:number)=>void}) {

  const [score,setScore] = useState(0)

  return (
    <div className="glass-dark p-6 rounded-xl space-y-4">

      <h3 className="text-lg font-semibold">{p.fullName}</h3>

      {/* TEAM + CATEGORY */}
      <div className="text-sm text-muted-foreground">
        Team: {p.teamName} · Category: {p.category}
      </div>

      {/* GOOGLE DRIVE LINK */}
      {p.googleDriveLink && (
        <a
          href={p.googleDriveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary text-sm hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          View Submission
        </a>
      )}

      <div className="flex justify-between mt-4">
        <span>Score</span>
        <span>{score}/10</span>
      </div>

      <Slider
        defaultValue={[0]}
        max={10}
        step={1}
        onValueChange={v=>setScore(v[0])}
      />

      <AnimatedButton onClick={()=>onScore(score)}>
        Submit
      </AnimatedButton>

    </div>
  )
}
