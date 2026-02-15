"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DetailView } from "@/components/detail-view"
import { sportService, Sport } from "@/services/sport.service"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency, formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function SportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [sport, setSport] = useState<Sport | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchSport()
    }
  }, [params.id])

  const fetchSport = async () => {
    try {
      setLoading(true)
      const data = await sportService.getById(params.id as string)
      setSport(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sport",
        variant: "destructive",
      })
      router.push("/sports")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!sport) return

    try {
      await sportService.delete(sport.id)
      toast({
        title: "Success",
        description: "Sport deleted successfully",
      })
      router.push("/sports")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete sport",
        variant: "destructive",
      })
    }
  }

  if (loading || !sport) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    )
  }

  const fields = [
    { label: "Monitor Name", value: sport.monitorName },
    { label: "Monitor Number", value: sport.monitorNumber },
    { label: "Class Name", value: sport.className },
    { label: "Description", value: sport.description },
    { label: "Amount", value: sport.amount, render: (v: number) => formatCurrency(v) },
    { label: "Created At", value: sport.createdAt, render: (v: string) => formatDate(v) },
    { label: "Updated At", value: sport.updatedAt, render: (v: string) => formatDate(v) },
  ]

  return (
    <DashboardLayout>
      <DetailView
        title="Sport Details"
        fields={fields}
        editPath={`/sports/${sport.id}`}
        backPath="/sports"
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sport</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this sport? This action cannot be
              undone.
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
