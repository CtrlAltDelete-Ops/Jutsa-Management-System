"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DetailView } from "@/components/detail-view"
import { competitorService, Competitor } from "@/services/competitor.service"
import { useToast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function CompetitorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [competitor, setCompetitor] = useState<Competitor | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchCompetitor()
    }
  }, [params.id])

  const fetchCompetitor = async () => {
    try {
      setLoading(true)
      const data = await competitorService.getById(params.id as string)
      setCompetitor(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch competitor",
        variant: "destructive",
      })
      router.push("/competitors")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!competitor) return

    try {
      await competitorService.delete(competitor.id)
      toast({
        title: "Success",
        description: "Competitor deleted successfully",
      })
      router.push("/competitors")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete competitor",
        variant: "destructive",
      })
    }
  }

  if (loading || !competitor) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    )
  }

  const fields = [
    { label: "Name", value: competitor.name },
    { label: "Email", value: competitor.email },
    { label: "Number", value: competitor.number },
    { label: "Semester", value: competitor.semester },
    { label: "Class Name", value: competitor.className },
    { label: "ID Number", value: competitor.idNumber },
    { label: "Type", value: competitor.type },
    { label: "Skill", value: competitor.skill },
    { label: "Project Name", value: competitor.projectName },
    { label: "Technologies", value: competitor.technologies },
    { label: "Status", value: competitor.status },
    { label: "Created At", value: competitor.createdAt, render: (v: string) => formatDate(v) },
  ]

  return (
    <DashboardLayout>
      <DetailView
        title="Competitor Details"
        fields={fields}
        editPath={`/competitors/${competitor.id}`}
        backPath="/competitors"
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Competitor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this competitor? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
