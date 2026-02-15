"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { memberService, MemberCreate } from "@/services/member.service"
import { positionService } from "@/services/position.service"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MemberFormPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isEdit = params.id !== "new"
  const [loading, setLoading] = useState(false)
  const [positions, setPositions] = useState<any[]>([])
  const [formData, setFormData] = useState<MemberCreate>({
    name: "",
    address: "",
    email: "",
    semester: "",
    studentId: "",
    year: "",
    position_Id: "",
  })

  useEffect(() => {
    fetchPositions()
    if (isEdit && params.id) {
      fetchMember()
    }
  }, [isEdit, params.id])

  const fetchPositions = async () => {
    try {
      const data = await positionService.getAll()
      setPositions(data)
    } catch (error) {
      console.error("Failed to fetch positions:", error)
    }
  }

  const fetchMember = async () => {
    try {
      setLoading(true)
      const member = await memberService.getById(params.id as string)
      setFormData({
        name: member.name,
        address: member.address,
        email: member.email,
        semester: member.semester,
        studentId: member.studentId,
        year: member.year,
        position_Id: member.position_Id,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch member",
        variant: "destructive",
      })
      router.push("/members")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit) {
        await memberService.update(params.id as string, formData)
        toast({
          title: "Success",
          description: "Member updated successfully",
        })
      } else {
        await memberService.create(formData)
        toast({
          title: "Success",
          description: "Member created successfully",
        })
      }
      router.push("/members")
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
            {isEdit ? "Edit Member" : "Add Member"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({ ...formData, semester: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position_Id">Position</Label>
                  <Select
                    value={formData.position_Id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, position_Id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos.id} value={pos.id}>
                          {pos.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
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
