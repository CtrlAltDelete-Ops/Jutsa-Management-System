"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { candidateService, Candidate } from "@/services/candidate.service"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const data = await candidateService.getAll()
      setCandidates(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch candidates. The endpoint may not be available.",
        variant: "destructive",
      })
      setCandidates([])
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "studentID", header: "Student ID" },
    { key: "gpa", header: "GPA" },
    { key: "department", header: "Department" },
    { key: "status", header: "Status" },
    {
      key: "createdAt",
      header: "Created",
      render: (value: string) => formatDate(value),
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Candidates
          </h1>
          <p className="text-muted-foreground">
            View candidate applications
          </p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Candidates</CardTitle>
            <CardDescription>All candidate applications</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={candidates}
              columns={columns}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
