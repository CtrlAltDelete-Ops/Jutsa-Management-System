"use client"

import { useState, useEffect } from "react"
import { userService } from "@/services/user.service"
import { User } from "@/services/user.service"

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(userService.getCurrentUser())
  }, [])

  if (!mounted) {
    return (
      <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Loading...
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            ...
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Welcome back, {user?.name || user?.email || "Guest"}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {user?.role || "USER"}
        </div>
      </div>
    </header>
  )
}
