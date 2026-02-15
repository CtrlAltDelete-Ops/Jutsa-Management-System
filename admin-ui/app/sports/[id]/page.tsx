"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sportService, SportCreate } from "@/services/sport.service"
import { useToast } from "@/components/ui/use-toast"

export default function SportFormPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isEdit = params.id !== "new"
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<SportCreate>({
    monitorName: "",
    monitorNumber: "",
    className: "",
    description: "",
    amount: 0,
  })

  useEffect(() => {
    if (isEdit && params.id) {
      fetchSport()
    }
  }, [isEdit, params.id])

  const fetchSport = async () => {
    try {
      setLoading(true)
      const sport = await sportService.getById(params.id as string)
      setFormData({
        monitorName: sport.monitorName,
        monitorNumber: sport.monitorNumber,
        className: sport.className,
        description: sport.description,
        amount: sport.amount,
      })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit) {
        await sportService.update(params.id as string, formData)
        toast({
          title: "Success",
          description: "Sport updated successfully",
        })
      } else {
        await sportService.create(formData)
        toast({
          title: "Success",
          description: "Sport created successfully",
        })
      }
      router.push("/sports")
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
            {isEdit ? "Edit Sport" : "Add Sport"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sport Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="monitorName">Monitor Name</Label>
                  <Input
                    id="monitorName"
                    value={formData.monitorName}
                    onChange={(e) =>
                      setFormData({ ...formData, monitorName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monitorNumber">Monitor Number</Label>
                  <Input
                    id="monitorNumber"
                    value={formData.monitorNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, monitorNumber: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    value={formData.className}
                    onChange={(e) =>
                      setFormData({ ...formData, className: e.target.value })
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
                      setFormData({ ...formData, amount: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
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
