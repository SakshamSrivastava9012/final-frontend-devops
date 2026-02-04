import axios, { AxiosError } from "axios"

/* ================= AXIOS INSTANCE ================= */

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
})

/* ================= AUTO JWT ATTACH ================= */
apiClient.interceptors.request.use((config) => {
  const url = config.url || ""

  // ================= PUBLIC =================
  const publicEndpoints = [
    "/generate-token",
    "/api/user-register",
    "/api/verify-otp",
  ]

  if (publicEndpoints.some(e => url.includes(e))) {
    return config
  }

  // ================= JUDGE =================
// ================= JUDGE =================
  if (url.startsWith("/judge") || url.startsWith("/api/winners")) {
    if (typeof window !== "undefined") {
      const judgeJwt = localStorage.getItem("judge_jwt")
      if (judgeJwt) config.headers.Authorization = `Bearer ${judgeJwt}`
    }
    return config
  }


  // ================= ADMIN =================
  if (url.startsWith("/admin")) {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(new RegExp("(^| )jwt=([^;]+)"))
      const adminJwt = match ? match[2] : null

      if (adminJwt) {
        config.headers.Authorization = `Bearer ${adminJwt}`
      }
    }
    return config
  }

  // ================= USER =================
  if (typeof window !== "undefined") {
    const userJwt = localStorage.getItem("jwt")
    if (userJwt) {
      config.headers.Authorization = `Bearer ${userJwt}`
    }
  }

  return config
})


const handleError = (err: unknown): never => {
  const e = err as AxiosError<any>
  console.error("API Error:", e.response?.data || e.message)
  throw e.response?.data || new Error("Network Error")
}

/* ================= TYPES ================= */

export interface Event {
  id: number
  title: string
  description: string
  imageUrl: string
}

export interface Album {
  id: number
  name: string
  thumbnailUrl: string
}

export interface GalleryItem {
  id: number
  imageUrl: string
}

/* ================= USER AUTH ================= */

export const authApi = {

  login: async (email: string, password: string): Promise<string> => {
    try {
      const res = await apiClient.post("/generate-token", {
        username: email.trim().toLowerCase(),
        password,
      })

      return res.data?.data?.accessToken || res.data?.token || res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  register: async (payload: any) => {
    try {
      const res = await apiClient.post("/api/user-register", payload)
      return res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  verifyOtp: async (payload: any): Promise<string> => {
    try {
      const res = await apiClient.post("/api/verify-otp", payload)
      return res.data?.data?.accessToken || res.data?.token || res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  logout: () => {
    document.cookie = "jwt=; Max-Age=0; path=/"
  },
}

/* ================= JUDGE ================= */

export const judgeApi = {

  login: async (email: string, password: string) => {
    try {
      const res = await apiClient.post("/judge/login", {
        email: email.trim().toLowerCase(),
        password,
      })
      return res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  verifyOtp: async (email: string, otp: string): Promise<string> => {
    try {
      const res = await apiClient.post("/judge/verify", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      })

      const token = res.data?.data

      if (!token) throw new Error("Invalid OTP")

      if (typeof window !== "undefined") {
        localStorage.setItem("judge_jwt", token)
      }

      return token
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  getRegistrations: async (eventId: number) => {
    try {
      const jwt = localStorage.getItem("judge_jwt")

      const res = await apiClient.get(`/judge/score/registrations/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      return res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  score: async (registrationId: number, score: number) => {
    try {
      const jwt = localStorage.getItem("judge_jwt")

      const res = await apiClient.post(
        "/judge/score",
        { registrationId, score },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      return res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },
  getWinners: async (eventId:number) => {
  try {
    const res = await apiClient.get(`/api/winners/${eventId}`)
    return res.data
  } catch(err){
    handleError(err)
    throw err
  }
},


  logout: () => {
    localStorage.removeItem("judge_jwt")
  },
}

/* ================= ADMIN ================= */

export const adminApi = {

 login: async (email: string, password: string) => {
    try {
      await apiClient.post("/admin/login", {
        email: email.trim().toLowerCase(),
        password,
      })
    } catch (err) {
      handleError(err)
    }
  },

verifyOtp: async (email: string, otp: string): Promise<string> => {
    try {
      const res = await apiClient.post("/admin/verify", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(), 
      })

      if (!res.data.data && res.data.success === false) {
        throw new Error(res.data.message || "Invalid OTP")
      }

      return res.data.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  createEvent: async (form: FormData) => {
    try {
      const res = await apiClient.post("/admin/events", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return res.data.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  createAlbum: async (form: FormData) => {
    try {
      const res = await apiClient.post("/admin/albums", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return res.data.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  uploadMedia: async (albumId: number, files: File[]) => {
    try {
      const form = new FormData()
      files.forEach(f => form.append("images", f))

      await apiClient.post(`/admin/albums/${albumId}/images`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  getAlbums: async (): Promise<Album[]> => {
    try {
      const res = await apiClient.get("/api/albums")
      return res.data.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },
}

/* ================= PUBLIC ================= */

export const api = {

  getEvents: async (): Promise<Event[]> => {
    try {
      const res = await apiClient.get("/api/events")
      return res.data.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  registerForEvent: async (eventId: number, payload: any) => {
    try {
      const res = await apiClient.post(`/api/events/${eventId}/register`, payload)
      return res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  getAlbums: async (): Promise<Album[]> => {
    try {
      const res = await apiClient.get("/api/albums")
      return res.data.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  getAlbumImages: async (albumId: number): Promise<GalleryItem[]> => {
    try {
      const res = await apiClient.get(`/api/albums/${albumId}/images`)
      return res.data.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },

  // ✅ PRIVATE WINNERS (JWT REQUIRED — JUDGE OR USER)
  getWinners: async (eventId: number) => {
    try {
      const jwt =
        localStorage.getItem("judge_jwt") ||
        localStorage.getItem("jwt")

      const res = await apiClient.get(`/api/winners/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      return res.data
    } catch (err) {
      handleError(err)
      throw err
    }
  },
}
