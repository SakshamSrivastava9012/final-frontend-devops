'use client'
import { useState } from "react"
import JudgeGuard from "./components/JudgeGuard"
import EventSelector from "./components/EventSelector"
import ParticipantCard from "./components/ParticipantCard"
import WinnerPanel from "./components/WinnerPanel"
import { judgeApi, api } from "@/lib/api"

export default function JudgeDashboard() {

  const [eventId,setEventId]=useState<number>()
  const [regs,setRegs]=useState<any[]>([])
  const [winners,setWinners]=useState<Record<string,any[]>>({})

  const loadWinners = async(id:number)=>{
    const w = await api.getWinners(id)
    setWinners(w)
  }

  return (
    <JudgeGuard>

      <EventSelector onSelect={async(id)=>{
        setEventId(id)

        const data = await judgeApi.getRegistrations(id)
        setRegs(data)

        await loadWinners(id)   // load winners initially
      }}/>

      {regs.map(r=>(
        <ParticipantCard
          key={r.id}
          p={r}
          onScore={async(s)=>{
            await judgeApi.score(r.id,s)

            // 🔥 refresh winners immediately
            if(eventId) await loadWinners(eventId)
          }}
        />
      ))}

      <WinnerPanel winners={winners}/>

    </JudgeGuard>
  )
}
