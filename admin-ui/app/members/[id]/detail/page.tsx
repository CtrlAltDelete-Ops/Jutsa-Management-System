"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DetailView } from "@/components/detail-view"
import { memberService, Member } from "@/services/member.service"
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

export default function MemberDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchMember()
    }
  }, [params.id])

  const fetchMember = async () => {
    try {
      setLoading(true)
      const data = await memberService.getById(params.id as string)
      setMember(data)
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

  const handleDelete = async () => {
    if (!member) return

    try {
      await memberService.delete(member.id)
      toast({
        title: "Success",
        description: "Member deleted successfully",
      })
      router.push("/members")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      })
    }
  }

  if (loading || !member) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    )
  }

  const fields = [
    { label: "Name", value: member.name },
    { label: "Email", value: member.email },
    { label: "Student ID", value: member.studentId },
    { label: "Semester", value: member.semester },
    { label: "Year", value: member.year },
    { label: "Address", value: member.address },
    { label: "Position", value: member.position?.title || "N/A" },
    { label: "Created At", value: member.createdAt, render: (v: string) => formatDate(v) },
    { label: "Updated At", value: member.updatedAt, render: (v: string) => formatDate(v) },
  ]

  return (
    <DashboardLayout>
      <DetailView
        title="Member Details"
        fields={fields}
        editPath={`/members/${member.id}`}
        backPath="/members"
        onDelete={() => setDeleteDialogOpen(true)}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot
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
