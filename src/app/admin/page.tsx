'use client'

import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api"

function getJwt() {
  return document.cookie
    .split("; ")
    .find(c => c.startsWith("jwt="))
    ?.split("=")[1]
}

export default function AdminPage() {

  const [albums, setAlbums] = useState<any[]>([])
  const [albumId, setAlbumId] = useState<number>()

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [eventImage,setEventImage] = useState<File|null>(null)

  const [albumName,setAlbumName] = useState("")
  const [albumThumb,setAlbumThumb] = useState<File|null>(null)

  const [media,setMedia] = useState<File[]>([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")

  /* ================= LOAD DASHBOARD ================= */

  useEffect(() => {

    const jwt = getJwt()
    if (!jwt) {
      window.location.href = "/admin/login"
      return
    }

    adminApi.getAlbums()
      .then(data => setAlbums(data || []))
      .catch(() => {
        window.location.href = "/admin/login"
      })
      .finally(() => setLoading(false))

  }, [])

  if (loading)
    return <div className="min-h-screen bg-black text-white p-12">Loading...</div>

  /* ================= ACTIONS ================= */

  const createEvent = async () => {
    try {
      if (!eventImage) return alert("Select image")

      const form = new FormData()
      form.append("title", title)
      form.append("description", description)
      form.append("image", eventImage)
      form.append("eventDate", new Date().toISOString())

      await adminApi.createEvent(form)

      alert("Event created")

      setTitle("")
      setDescription("")
      setEventImage(null)

    } catch {
      alert("Failed to create event")
    }
  }

  const createAlbum = async () => {
    try {
      if(!albumThumb) return alert("Select thumbnail")

      const form = new FormData()
      form.append("name",albumName)
      form.append("thumbnail",albumThumb)

      await adminApi.createAlbum(form)

      alert("Album created")
    } catch {
      alert("Album creation failed")
    }
  }

  const uploadMedia = async () => {
    try {
      if(!albumId || media.length === 0)
        return alert("Select album + images")

      await adminApi.uploadMedia(albumId, media)
      alert("Media uploaded")
    } catch {
      alert("Upload failed")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-12">

      <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Card title="Create Event">
          <Input placeholder="Title" onChange={setTitle}/>
          <Textarea placeholder="Description" onChange={setDescription}/>
          <input type="file" onChange={e=>setEventImage(e.target.files?.[0] || null)}/>
          <Button onClick={createEvent}>Create Event</Button>
        </Card>

        <Card title="Create Album">
          <Input placeholder="Album name" onChange={setAlbumName}/>
          <input type="file" onChange={e=>setAlbumThumb(e.target.files?.[0] || null)}/>
          <Button onClick={createAlbum}>Create Album</Button>
        </Card>

        <Card title="Upload Media">

          <select
            className="bg-neutral-900 border border-neutral-700 rounded p-2"
            onChange={e=>setAlbumId(Number(e.target.value))}
          >
            <option value="">Select Album</option>
            {albums.map(a=>(
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          <input
            type="file"
            multiple
            onChange={e=>setMedia(Array.from(e.target.files || []))}
          />

          {media.length > 0 && (
            <p className="text-sm text-neutral-400">{media.length} files selected</p>
          )}

          <Button onClick={uploadMedia}>Upload Images</Button>

        </Card>

      </div>
    </div>
  )
}

/* ================= UI HELPERS ================= */

function Card({title,children}:any){
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-4 shadow">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  )
}

function Input({placeholder,onChange}:any){
  return (
    <input
      placeholder={placeholder}
      onChange={e=>onChange(e.target.value)}
      className="bg-neutral-900 border border-neutral-700 rounded p-2 w-full"
    />
  )
}

function Textarea({placeholder,onChange}:any){
  return (
    <textarea
      placeholder={placeholder}
      onChange={e=>onChange(e.target.value)}
      className="bg-neutral-900 border border-neutral-700 rounded p-2 w-full"
    />
  )
}

function Button({children,onClick}:any){
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 transition rounded py-2"
    >
      {children}
    </button>
  )
}
