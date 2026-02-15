"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { userService } from "@/services/user.service"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = userService.getToken()
    if (token) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}
