"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"

interface DetailField {
  label: string
  value: string | number | null | undefined
  render?: (value: any) => React.ReactNode
}

interface DetailViewProps {
  title: string
  fields: DetailField[]
  onEdit?: () => void
  onDelete?: () => void
  editPath?: string
  backPath: string
}

export function DetailView({
  title,
  fields,
  onEdit,
  onDelete,
  editPath,
  backPath,
}: DetailViewProps) {
  const router = useRouter()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(backPath)}
            className="transition-all hover:scale-110"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">View detailed information</p>
          </div>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button
              onClick={onEdit}
              className="transition-all hover:scale-105"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {editPath && (
            <Button
              onClick={() => router.push(editPath)}
              className="transition-all hover:scale-105"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              onClick={onDelete}
              className="transition-all hover:scale-105"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      <Card className="border-2 shadow-lg transition-shadow hover:shadow-xl">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {fields.map((field, index) => (
              <div
                key={index}
                className="space-y-2 p-4 rounded-lg bg-muted/50 transition-all hover:bg-muted"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {field.label}
                </p>
                <p className="text-base font-semibold">
                  {field.render
                    ? field.render(field.value)
                    : field.value ?? "N/A"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
