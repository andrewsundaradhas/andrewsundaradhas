"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactWindow() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )
      const mailtoLink = `mailto:andrewsundaradhas56@gmail.com?subject=${subject}&body=${body}`

      // Open default email client
      window.location.href = mailtoLink

      // Show success message
      setTimeout(() => {
        toast({
          title: "Message Prepared Successfully! ✈️",
          description: "Your email client should open with the message ready to send.",
        })
        setFormData({ name: "", email: "", message: "" })
        setErrors({})
        setIsSubmitting(false)
      }, 1000)
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <div className="text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-center text-white tracking-tight">Get In Touch</h2>
        <p className="text-center text-gray-400 text-sm mt-2 font-semibold">
          Send me a message and I&apos;ll get back to you soon!
        </p>
      </div>

      {/* Contact Form */}
      <div className="scroll-container" style={{ maxHeight: "320px" }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-bold mb-2 text-white tracking-tight">
              Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`bg-white/8 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 rounded-lg font-semibold ${
                errors.name ? "border-red-400 focus:border-red-400" : ""
              }`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-white tracking-tight">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`bg-white/8 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 rounded-lg font-semibold ${
                errors.email ? "border-red-400 focus:border-red-400" : ""
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="block text-sm font-bold mb-2 text-white tracking-tight">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`bg-white/8 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 resize-none rounded-lg font-semibold ${
                errors.message ? "border-red-400 focus:border-red-400" : ""
              }`}
              placeholder="Tell me about your project or just say hello! (minimum 10 characters)"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Preparing...</span>
              </div>
            ) : (
              "Send Message ✈️"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400 font-semibold">
            This will open your default email client with the message ready to send to{" "}
            <span className="text-blue-400 font-mono font-bold">andrewsundaradhas56@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  )
}
