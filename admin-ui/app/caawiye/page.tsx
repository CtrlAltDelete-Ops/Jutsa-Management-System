"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { caawiyeService, Caawiye } from "@/services/caawiye.service"
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

export default function CaawiyePage() {
  const [caawiye, setCaawiye] = useState<Caawiye[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCaawiye, setSelectedCaawiye] = useState<Caawiye | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCaawiye()
  }, [])

  const fetchCaawiye = async () => {
    try {
      setLoading(true)
      const data = await caawiyeService.getAll()
      setCaawiye(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch caawiye",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedCaawiye) return

    try {
      await caawiyeService.delete(selectedCaawiye.id)
      toast({
        title: "Success",
        description: "Caawiye deleted successfully",
      })
      fetchCaawiye()
      setDeleteDialogOpen(false)
      setSelectedCaawiye(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete caawiye",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "number", header: "Number" },
    { key: "semester", header: "Semester" },
    { key: "className", header: "Class" },
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Caawiye
            </h1>
            <p className="text-muted-foreground">
              Manage support requests
            </p>
          </div>
          <Button 
            onClick={() => router.push("/caawiye/new")}
            className="transition-all hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Caawiye
          </Button>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Caawiye</CardTitle>
            <CardDescription>All support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={caawiye}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/caawiye/${row.id}/detail`)}
              onEdit={(row) => router.push(`/caawiye/${row.id}`)}
              onDelete={(row) => {
                setSelectedCaawiye(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Caawiye</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this caawiye? This action
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
