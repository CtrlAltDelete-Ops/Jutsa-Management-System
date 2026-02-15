"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DetailView } from "@/components/detail-view"
import { financeService, Finance } from "@/services/finance.service"
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

export default function FinanceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [finance, setFinance] = useState<Finance | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchFinance()
    }
  }, [params.id])

  const fetchFinance = async () => {
    try {
      setLoading(true)
      const data = await financeService.getById(params.id as string)
      setFinance(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch finance record",
        variant: "destructive",
      })
      router.push("/finance")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!finance) return

    try {
      await financeService.delete(finance.id)
      toast({
        title: "Success",
        description: "Finance record deleted successfully",
      })
      router.push("/finance")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete finance record",
        variant: "destructive",
      })
    }
  }

  if (loading || !finance) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    )
  }

  const fields = [
    { label: "Title", value: finance.title },
    { label: "Amount", value: finance.amount, render: (v: number) => formatCurrency(v) },
    { label: "Type", value: finance.type },
    { label: "Category", value: finance.category },
    { label: "Created At", value: finance.createdAt, render: (v: string) => formatDate(v) },
    { label: "Updated At", value: finance.updatedAt, render: (v: string) => formatDate(v) },
  ]

  return (
    <DashboardLayout>
      <DetailView
        title="Finance Details"
        fields={fields}
        editPath={`/finance/${finance.id}`}
        backPath="/finance"
        onDelete={() => setDeleteDialogOpen(true)}
      />

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
    </DashboardLayout>
  )
}
