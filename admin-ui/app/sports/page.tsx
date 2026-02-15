"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { sportService, Sport } from "@/services/sport.service"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatCurrency, formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SportsPage() {
  const [sports, setSports] = useState<Sport[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchSports()
  }, [])

  const fetchSports = async () => {
    try {
      setLoading(true)
      const data = await sportService.getAll()
      setSports(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sports",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedSport) return

    try {
      await sportService.delete(selectedSport.id)
      toast({
        title: "Success",
        description: "Sport deleted successfully",
      })
      fetchSports()
      setDeleteDialogOpen(false)
      setSelectedSport(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete sport",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { key: "monitorName", header: "Monitor Name" },
    { key: "monitorNumber", header: "Monitor Number" },
    { key: "className", header: "Class" },
    { key: "description", header: "Description" },
    {
      key: "amount",
      header: "Amount",
      render: (value: number) => formatCurrency(value),
    },
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
              Sports
            </h1>
            <p className="text-muted-foreground">
              Manage sports activities
            </p>
          </div>
          <Button 
            onClick={() => router.push("/sports/new")}
            className="transition-all hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Sport
          </Button>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Sports</CardTitle>
            <CardDescription>All sports activities</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={sports}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/sports/${row.id}/detail`)}
              onEdit={(row) => router.push(`/sports/${row.id}`)}
              onDelete={(row) => {
                setSelectedSport(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Sport</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this sport? This action cannot
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
      </div>
    </DashboardLayout>
  )
}
