"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DetailView } from "@/components/detail-view"
import { activityService, Activity } from "@/services/activity.service"
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

export default function ActivityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchActivity()
    }
  }, [params.id])

  const fetchActivity = async () => {
    try {
      setLoading(true)
      const data = await activityService.getById(params.id as string)
      setActivity(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch activity",
        variant: "destructive",
      })
      router.push("/activities")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!activity) return

    try {
      await activityService.delete(activity.id)
      toast({
        title: "Success",
        description: "Activity deleted successfully",
      })
      router.push("/activities")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      })
    }
  }

  if (loading || !activity) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    )
  }

  const fields = [
    { label: "Title", value: activity.title },
    { label: "Description", value: activity.description },
    { label: "Speaker", value: activity.speaker },
    { label: "Location", value: activity.location },
    { label: "Type", value: activity.type },
    { label: "Date", value: activity.date, render: (v: string) => formatDate(v) },
    { label: "Created At", value: activity.createdAt, render: (v: string) => formatDate(v) },
    { label: "Updated At", value: activity.updatedAt, render: (v: string) => formatDate(v) },
  ]

  return (
    <DashboardLayout>
      <DetailView
        title="Activity Details"
        fields={fields}
        editPath={`/activities/${activity.id}`}
        backPath="/activities"
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Activity</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this activity? This action cannot
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
