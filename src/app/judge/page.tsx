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

      <div className="p-12 max-w-7xl mx-auto space-y-10">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black">Judge Control Panel</h1>

          <EventSelector onSelect={async(id)=>{
            setEventId(id)
            const data = await judgeApi.getRegistrations(id)
            setRegs(data)
            await loadWinners(id)
          }}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {regs.map(r=>(
            <ParticipantCard
              key={r.id}
              p={r}
              onScore={async(s)=>{
                await judgeApi.score(r.id,s)
                if(eventId) await loadWinners(eventId)
              }}
            />
          ))}
        </div>

        <WinnerPanel winners={winners}/>

      </div>

    </JudgeGuard>
  )
}
