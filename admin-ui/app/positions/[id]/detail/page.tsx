"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DetailView } from "@/components/detail-view"
import { positionService, Position } from "@/services/position.service"
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

export default function PositionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [position, setPosition] = useState<Position | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchPosition()
    }
  }, [params.id])

  const fetchPosition = async () => {
    try {
      setLoading(true)
      const data = await positionService.getById(params.id as string)
      setPosition(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch position",
        variant: "destructive",
      })
      router.push("/positions")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!position) return

    try {
      await positionService.delete(position.id)
      toast({
        title: "Success",
        description: "Position deleted successfully",
      })
      router.push("/positions")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete position",
        variant: "destructive",
      })
    }
  }

  if (loading || !position) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    )
  }

  const fields = [
    { label: "Title", value: position.title },
    { label: "Description", value: position.description },
    { label: "Created At", value: position.createdAt, render: (v: string) => formatDate(v) },
    { label: "Updated At", value: position.updatedAt, render: (v: string) => formatDate(v) },
  ]

  return (
    <DashboardLayout>
      <DetailView
        title="Position Details"
        fields={fields}
        editPath={`/positions/${position.id}`}
        backPath="/positions"
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Position</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this position? This action cannot
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
