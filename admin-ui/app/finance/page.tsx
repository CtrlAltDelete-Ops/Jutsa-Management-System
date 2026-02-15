"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { financeService, Finance } from "@/services/finance.service"
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

export default function FinancePage() {
  const [finances, setFinances] = useState<Finance[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFinance, setSelectedFinance] = useState<Finance | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchFinances()
  }, [])

  const fetchFinances = async () => {
    try {
      setLoading(true)
      const data = await financeService.getAll()
      setFinances(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch finances",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedFinance) return

    try {
      await financeService.delete(selectedFinance.id)
      toast({
        title: "Success",
        description: "Finance record deleted successfully",
      })
      fetchFinances()
      setDeleteDialogOpen(false)
      setSelectedFinance(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete finance record",
        variant: "destructive",
      })
    }
  }

  const columns = [
    {
      key: "title",
      header: "Title",
    },
    {
      key: "amount",
      header: "Amount",
      render: (value: number) => formatCurrency(value),
    },
    {
      key: "type",
      header: "Type",
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "createdAt",
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
              Finance
            </h1>
            <p className="text-muted-foreground">
              Manage financial records and transactions
            </p>
          </div>
          <Button 
            onClick={() => router.push("/finance/new")}
            className="transition-all hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Finance
          </Button>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Finance Records</CardTitle>
            <CardDescription>All financial transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={finances}
              columns={columns}
              loading={loading}
              onView={(row) => router.push(`/finance/${row.id}/detail`)}
              onEdit={(row) => router.push(`/finance/${row.id}`)}
              onDelete={(row) => {
                setSelectedFinance(row)
                setDeleteDialogOpen(true)
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Finance Record</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this finance record? This action
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
