'use client'
import { useEffect,useState } from "react"
import { api } from "@/lib/api"

export default function EventSelector({onSelect}:{onSelect:(id:number)=>void}) {

  const [events,setEvents]=useState<any[]>([])

  useEffect(()=>{
    api.getEvents().then(setEvents)
  },[])

  return (
    <select className="glass-dark p-3 rounded-xl"
      onChange={e=>onSelect(Number(e.target.value))}>
      <option>Select Event</option>
      {events.map(e=>(
        <option key={e.id} value={e.id}>{e.title}</option>
      ))}
    </select>
  )
}
