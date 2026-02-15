"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { financeService, FinanceCreate } from "@/services/finance.service"
import { useToast } from "@/components/ui/use-toast"
import { userService } from "@/services/user.service"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FinanceFormPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isEdit = params.id !== "new"
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FinanceCreate>({
    title: "",
    amount: 0,
    type: "",
    category: "",
    userId: "",
  })

  useEffect(() => {
    if (isEdit && params.id) {
      fetchFinance()
    } else {
      const user = userService.getCurrentUser()
      if (user) {
        setFormData((prev) => ({ ...prev, userId: user.id }))
      }
    }
  }, [isEdit, params.id])

  const fetchFinance = async () => {
    try {
      setLoading(true)
      const finance = await financeService.getById(params.id as string)
      setFormData({
        title: finance.title,
        amount: finance.amount,
        type: finance.type,
        category: finance.category,
        userId: finance.userId,
      })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit) {
        await financeService.update(params.id as string, formData)
        toast({
          title: "Success",
          description: "Finance record updated successfully",
        })
      } else {
        await financeService.create(formData)
        toast({
          title: "Success",
          description: "Finance record created successfully",
        })
      }
      router.push("/finance")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Operation failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Finance" : "Add Finance"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit
              ? "Update finance record details"
              : "Create a new finance record"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Finance Details</CardTitle>
            <CardDescription>
              Fill in the information below to {isEdit ? "update" : "create"} a
              finance record
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading
                    ? isEdit
                      ? "Updating..."
                      : "Creating..."
                    : isEdit
                    ? "Update"
                    : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
