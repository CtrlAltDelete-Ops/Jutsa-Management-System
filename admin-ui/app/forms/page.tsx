"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formService, FormVisibility } from "@/services/form.service"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FileText, Eye, EyeOff, Settings } from "lucide-react"

export default function FormsPage() {
  const [forms, setForms] = useState<FormVisibility>({})
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      setLoading(true)
      const data = await formService.getAll()
      setForms(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch forms",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (formName: string, currentValue: boolean) => {
    try {
      await formService.update(formName, !currentValue)
      setForms((prev) => ({
        ...prev,
        [formName]: !currentValue,
      }))
      toast({
        title: "Success",
        description: `Form visibility updated successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update form visibility",
        variant: "destructive",
      })
    }
  }

  const formLabels: Record<string, string> = {
    sportsForm: "Sports Form",
    presidentForm: "President Form",
    facultyForm: "Faculty Form",
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Management</h1>
          <p className="text-muted-foreground">
            Control visibility of public forms
          </p>
        </div>

        <Card className="border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/50">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Form Visibility Settings
            </CardTitle>
            <CardDescription>
              Toggle form visibility for public access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-6 w-12 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(forms).map(([formName, isVisible]) => (
                  <div
                    key={formName}
                    className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-accent/50 hover:border-primary/50 hover:shadow-md hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      {isVisible ? (
                        <Eye className="h-5 w-5 text-green-500" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <Label htmlFor={formName} className="text-base font-medium cursor-pointer">
                          {formLabels[formName] || formName}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {isVisible ? "Visible to public" : "Hidden from public"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {isVisible ? "Enabled" : "Disabled"}
                      </span>
                      <Switch
                        id={formName}
                        checked={isVisible}
                        onCheckedChange={() => handleToggle(formName, isVisible)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
