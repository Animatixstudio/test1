"use server"

export type ContactFormData = {
  name: string
  email: string
  message: string
}

export type ContactFormResponse = {
  success: boolean
  message: string
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResponse> {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!name || name.trim() === "") {
      return { success: false, message: "Please enter your name" }
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    if (!message || message.trim() === "") {
      return { success: false, message: "Please enter a message" }
    }

    // Log the submission (for demonstration purposes)
    console.log("Contact form submission:", { name, email, message })

    // Simulate a delay to make the submission feel more realistic
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you would send this data to your backend or email service
    // For now, we'll just simulate a successful submission

    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error processing form:", error)
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    }
  }
}
