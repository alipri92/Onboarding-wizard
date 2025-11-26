"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"

type FormData = {
  // Step 1: Personal Information
  firstName: string
  lastName: string
  email: string

  // Step 2: Company Details
  companyName: string
  companySize: string
  role: string

  // Step 3: Use Case
  useCase: string[]
  primaryGoal: string

  // Step 4: Preferences
  newsletter: boolean
  emailUpdates: boolean
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
    role: "",
    useCase: [],
    primaryGoal: "",
    newsletter: false,
    emailUpdates: false,
  })

  const totalSteps = 4

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    setCurrentStep(5) // Success state
  }

  const toggleUseCase = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      useCase: prev.useCase.includes(value) ? prev.useCase.filter((item) => item !== value) : [...prev.useCase, value],
    }))
  }

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.firstName.trim() && formData.lastName.trim() && formData.email.trim())
      case 2:
        return !!(formData.companyName.trim() && formData.companySize && formData.role)
      case 3:
        return !!(formData.useCase.length > 0 && formData.primaryGoal)
      case 4:
        return true // Step 4 has no required fields (preferences are optional)
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        {currentStep <= totalSteps && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step === currentStep
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-colors ${step < currentStep ? "bg-primary" : "bg-muted"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground text-center">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <h2 className="text-2xl font-semibold text-card-foreground text-balance">Personal Information</h2>
                </div>
                <p className="text-muted-foreground text-balance">
                  {"Let's start with the basics. Tell us about yourself."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@company.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <h2 className="text-2xl font-semibold text-card-foreground text-balance">Company Details</h2>
                </div>
                <p className="text-muted-foreground text-balance">Help us understand your organization better.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Inc."
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Founder / CEO</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <h2 className="text-2xl font-semibold text-card-foreground text-balance">
                    How will you use our platform?
                  </h2>
                </div>
                <p className="text-muted-foreground text-balance">
                  Select all that apply to help us customize your experience.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Use Cases (select all that apply)</Label>
                  <div className="space-y-3">
                    {[
                      {
                        value: "analytics",
                        label: "Analytics & Reporting",
                      },
                      {
                        value: "collaboration",
                        label: "Team Collaboration",
                      },
                      {
                        value: "automation",
                        label: "Workflow Automation",
                      },
                      { value: "integration", label: "API Integration" },
                      { value: "crm", label: "Customer Management" },
                    ].map((item) => (
                      <div key={item.value} className="flex items-center space-x-3">
                        <Checkbox
                          id={item.value}
                          checked={formData.useCase.includes(item.value)}
                          onCheckedChange={() => toggleUseCase(item.value)}
                        />
                        <Label htmlFor={item.value} className="text-sm font-normal cursor-pointer">
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Primary Goal</Label>
                  <RadioGroup
                    value={formData.primaryGoal}
                    onValueChange={(value) => updateFormData("primaryGoal", value)}
                  >
                    {[
                      {
                        value: "productivity",
                        label: "Increase team productivity",
                      },
                      { value: "revenue", label: "Grow revenue" },
                      { value: "efficiency", label: "Improve efficiency" },
                      {
                        value: "customer",
                        label: "Better customer experience",
                      },
                    ].map((item) => (
                      <div key={item.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={item.value} id={item.value} />
                        <Label htmlFor={item.value} className="text-sm font-normal cursor-pointer">
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <h2 className="text-2xl font-semibold text-card-foreground text-balance">
                    Communication Preferences
                  </h2>
                </div>
                <p className="text-muted-foreground text-balance">Choose how you'd like to hear from us.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-muted/30">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => updateFormData("newsletter", checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">
                        Subscribe to newsletter
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get weekly updates, tips, and best practices delivered to your inbox.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border border-border bg-muted/30">
                    <Checkbox
                      id="emailUpdates"
                      checked={formData.emailUpdates}
                      onCheckedChange={(checked) => updateFormData("emailUpdates", checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="emailUpdates" className="text-sm font-medium cursor-pointer">
                        Product updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Be the first to know about new features and improvements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <a href="#" className="underline hover:text-foreground">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-foreground">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-card-foreground text-balance">{"You're all set!"}</h2>
                <p className="text-muted-foreground text-balance max-w-md mx-auto">
                  Welcome to the platform, {formData.firstName}! {"We're"}
                  excited to have you on board.
                </p>
              </div>
              <Button size="lg" className="mt-4">
                Get Started
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep <= totalSteps && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!isStepValid()}>Complete Setup</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
