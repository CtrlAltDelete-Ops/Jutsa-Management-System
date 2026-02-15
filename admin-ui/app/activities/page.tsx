"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { activityService, Activity } from "@/services/activity.service"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const data = await activityService.getAll()
      setActivities(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch activities",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedActivity) return

    try {
      await activityService.delete(selectedActivity.id)
      toast({
        title: "Success",
        description: "Activity deleted successfully",
      })
      fetchActivities()
      setDeleteDialogOpen(false)
      setSelectedActivity(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "title", header: "Title" },
    { key: "speaker", header: "Speaker" },
    { key: "location", header: "Location" },
    { key: "type", header: "Type" },
    {
      key: "date",
      header: "Date",
      render: (value: string) => formatDate(value),
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Activities
            </h1>
            <p className="text-muted-foreground">
              Manage seminars and workshops
            </p>
          </div>
          <Button 
            onClick={() => router.push("/activities/new")}
            className="transition-all hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Activity
          </Button>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Activities</CardTitle>
            <CardDescription>All seminars and workshops</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={activities}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/activities/${row.id}/detail`)}
              onEdit={(row) => router.push(`/activities/${row.id}`)}
              onDelete={(row) => {
                setSelectedActivity(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Activity</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this activity? This action
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
      </div>
    </DashboardLayout>
  )
}
