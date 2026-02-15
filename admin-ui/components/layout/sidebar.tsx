"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  DollarSign,
  Users,
  UserCog,
  Trophy,
  Activity,
  HelpCircle,
  FileText,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { userService } from "@/services/user.service"
import { useRouter } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Finance",
    href: "/finance",
    icon: DollarSign,
  },
  {
    title: "Members",
    href: "/members",
    icon: Users,
  },
  {
    title: "Positions",
    href: "/positions",
    icon: UserCog,
  },
  {
    title: "Competitors",
    href: "/competitors",
    icon: Trophy,
  },
  {
    title: "Sports",
    href: "/sports",
    icon: Activity,
  },
  {
    title: "Activities",
    href: "/activities",
    icon: FileText,
  },
  {
    title: "Caawiye",
    href: "/caawiye",
    icon: HelpCircle,
  },
  {
    title: "Candidates",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "Users",
    href: "/users",
    icon: Settings,
  },
  {
    title: "Form Management",
    href: "/forms",
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    userService.logout()
    router.push("/login")
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-lg">
      <div className="flex h-16 items-center border-b px-6 bg-gradient-to-r from-primary/5 to-transparent">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Admin Panel
        </h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              )}
            >
              <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
