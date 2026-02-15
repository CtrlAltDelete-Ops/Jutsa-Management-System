"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { financeService } from "@/services/finance.service"
import { memberService } from "@/services/member.service"
import { activityService } from "@/services/activity.service"
import { competitorService } from "@/services/competitor.service"
import { DollarSign, Users, Activity, Trophy } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalFinance: 0,
    totalMembers: 0,
    totalActivities: 0,
    totalCompetitors: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [finances, members, activities, competitors] = await Promise.all([
          financeService.getAll().catch(() => []),
          memberService.getAll().catch(() => []),
          activityService.getAll().catch(() => []),
          competitorService.getAll().catch(() => []),
        ])

        const totalFinance = finances.reduce((sum, f) => sum + f.amount, 0)

        setStats({
          totalFinance,
          totalMembers: members.length,
          totalActivities: activities.length,
          totalCompetitors: competitors.length,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Finance",
      value: formatCurrency(stats.totalFinance),
      icon: DollarSign,
      description: "Total financial transactions",
    },
    {
      title: "Members",
      value: stats.totalMembers,
      icon: Users,
      description: "Total team members",
    },
    {
      title: "Activities",
      value: stats.totalActivities,
      icon: Activity,
      description: "Total activities",
    },
    {
      title: "Competitors",
      value: stats.totalCompetitors,
      icon: Trophy,
      description: "Total competitors",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Overview of your management system
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-20" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card 
                  key={stat.title}
                  className="transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-5 w-5 text-primary transition-transform hover:scale-110" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
