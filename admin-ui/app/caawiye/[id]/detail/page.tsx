"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DetailView } from "@/components/detail-view"
import { caawiyeService, Caawiye } from "@/services/caawiye.service"
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

export default function CaawiyeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [caawiye, setCaawiye] = useState<Caawiye | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchCaawiye()
    }
  }, [params.id])

  const fetchCaawiye = async () => {
    try {
      setLoading(true)
      const data = await caawiyeService.getById(params.id as string)
      setCaawiye(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch caawiye",
        variant: "destructive",
      })
      router.push("/caawiye")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!caawiye) return

    try {
      await caawiyeService.delete(caawiye.id)
      toast({
        title: "Success",
        description: "Caawiye deleted successfully",
      })
      router.push("/caawiye")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete caawiye",
        variant: "destructive",
      })
    }
  }

  if (loading || !caawiye) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    )
  }

  const fields = [
    { label: "Name", value: caawiye.name },
    { label: "Number", value: caawiye.number },
    { label: "Semester", value: caawiye.semester },
    { label: "Class Name", value: caawiye.className },
    { label: "Status", value: caawiye.status },
    { label: "Problems", value: caawiye.problems },
    { label: "Solutions", value: caawiye.solutions },
    { label: "Created At", value: caawiye.createdAt, render: (v: string) => formatDate(v) },
    { label: "Updated At", value: caawiye.updatedAt, render: (v: string) => formatDate(v) },
  ]

  return (
    <DashboardLayout>
      <DetailView
        title="Caawiye Details"
        fields={fields}
        editPath={`/caawiye/${caawiye.id}`}
        backPath="/caawiye"
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Caawiye</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this caawiye? This action cannot
              be undone.
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
