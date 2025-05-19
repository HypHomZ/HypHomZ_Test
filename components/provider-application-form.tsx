"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Upload, X, FileText, ImageIcon, File, Check } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

type FileWithPreview = {
  file: File
  preview: string
  type: "image" | "document" | "other"
}

const availableServices = [
  { value: "cleaning", label: "Cleaning Services" },
  { value: "repair", label: "Repair & Maintenance" },
  { value: "maid", label: "Maid Services" },
  { value: "laundry", label: "Laundry Services" },
  { value: "meal", label: "Meal Preparation" },
  { value: "installation", label: "Installation Services" },
  { value: "carpentry", label: "Carpentry" },
  { value: "electrical", label: "Electrical Services" },
  { value: "plumbing", label: "Plumbing" },
  { value: "painting", label: "Painting" },
  { value: "car-washing", label: "Car Washing" },
  { value: "gardening", label: "Gardening" },
  { value: "furniture", label: "Furniture Assembly" },
  { value: "internet", label: "Internet Setup" },
]

export default function ProviderApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    currentAddress: "",
    permanentAddress: "",
    phoneNumber: "",
    email: "",
    experience: "",
    selectedServices: [] as string[],
  })
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const newFiles: FileWithPreview[] = []

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i]
      const fileType = file.type.startsWith("image/")
        ? "image"
        : file.type.includes("pdf") || file.type.includes("word") || file.type.includes("text")
          ? "document"
          : "other"

      // Create preview URL for images
      const preview = fileType === "image" ? URL.createObjectURL(file) : ""

      newFiles.push({
        file,
        preview,
        type: fileType,
      })
    }

    setFiles((prev) => [...prev, ...newFiles])
    e.target.value = "" // Reset input
  }

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      // Revoke object URL to avoid memory leaks
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleServiceSelection = (service: string) => {
    setFormData((prev) => {
      const currentServices = [...prev.selectedServices]

      if (currentServices.includes(service)) {
        return {
          ...prev,
          selectedServices: currentServices.filter((s) => s !== service),
        }
      } else {
        return {
          ...prev,
          selectedServices: [...currentServices, service],
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert("Please accept the terms and conditions to continue.")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      // Reset form
      setFormData({
        fullName: "",
        currentAddress: "",
        permanentAddress: "",
        phoneNumber: "",
        email: "",
        experience: "",
        selectedServices: [],
      })
      setFiles([])
      setAcceptTerms(false)
    }, 1500)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "document":
        return <FileText className="h-6 w-6 text-green-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  if (submitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Application Submitted!</CardTitle>
          <CardDescription className="text-center">
            Thank you for applying to become a service provider with HypHomZ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <p>
            We have received your application and will review it shortly. You will receive an email confirmation with
            further instructions.
          </p>
          <p className="text-sm text-muted-foreground">
            If you have any questions, please contact our support team at support@hyphomz.com
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setSubmitted(false)}>
            Submit Another Application
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Service Provider Application</CardTitle>
        <CardDescription>Fill out the form below to apply to become a service provider with HypHomZ.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="currentAddress">Current Address</Label>
              <Textarea
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                placeholder="Enter your current address"
                required
              />
            </div>

            <div>
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="Enter your permanent address (if different from current)"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Professional Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Describe your professional experience and qualifications"
                required
              />
            </div>

            <div>
              <Label htmlFor="services">Services You Can Provide</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full justify-between h-auto min-h-10 py-2">
                    {formData.selectedServices.length > 0
                      ? `${formData.selectedServices.length} service${formData.selectedServices.length > 1 ? "s" : ""} selected`
                      : "Select services..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search services..." />
                    <CommandList>
                      <CommandEmpty>No services found.</CommandEmpty>
                      <CommandGroup>
                        {availableServices.map((service) => (
                          <CommandItem
                            key={service.value}
                            value={service.value}
                            onSelect={() => handleServiceSelection(service.value)}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "mr-2 h-4 w-4 flex items-center justify-center rounded-sm border",
                                  formData.selectedServices.includes(service.value)
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50",
                                )}
                              >
                                {formData.selectedServices.includes(service.value) && <Check className="h-3 w-3" />}
                              </div>
                              {service.label}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {formData.selectedServices.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.selectedServices.map((service) => {
                    const serviceLabel = availableServices.find((s) => s.value === service)?.label
                    return (
                      <Badge key={service} variant="secondary" className="px-2 py-1">
                        {serviceLabel}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 px-1 ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() => handleServiceSelection(service)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {serviceLabel}</span>
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Upload Documents</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors",
                  files.length > 0 && "border-primary/50",
                )}
              >
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <Label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <span className="font-medium">Click to upload or drag and drop</span>
                  <span className="text-xs text-muted-foreground">
                    Upload your ID, certifications, portfolio, and other relevant documents
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (Multiple files supported: Images, PDF, DOC, DOCX, TXT)
                  </span>
                </Label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Uploaded Files ({files.length})</Label>
                  <div className="max-h-40 overflow-y-auto space-y-2 p-2 border rounded-md">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {getFileIcon(file.type)}
                          <span className="text-sm truncate">{file.file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.file.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Terms and Conditions
                </Label>
                <p className="text-xs text-muted-foreground">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    terms of service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    privacy policy
                  </a>
                  . I understand that my personal information will be processed in accordance with HypHomZ's privacy
                  policy.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading || !acceptTerms}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
