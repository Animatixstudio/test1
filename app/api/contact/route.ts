import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        // Add request validation
        if (!request.body) {
            return NextResponse.json({
                success: false,
                message: 'Invalid request body'
            }, { status: 400 })
        }

        const formData = await request.formData()
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const message = formData.get('message') as string

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json({
                success: false,
                message: 'All fields are required'
            }, { status: 400 })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid email format'
            }, { status: 400 })
        }

        // Add environment variable validation
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.error('Missing email configuration')
            return NextResponse.json({
                success: false,
                message: 'Server configuration error'
            }, { status: 500 })
        }

        console.log('Contact form submission:', { name, email, message })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        })

        const mailOptions = {
            from: `"${name}" <${process.env.GMAIL_USER}>`,  // using your Gmail to avoid spam blocks
            to: process.env.GMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message:
${message}
    `,
        }

        try {
            const info = await transporter.sendMail(mailOptions)
            console.log('✅ Email sent successfully!')
            return NextResponse.json({ success: true, message: 'Message sent successfully!' })
        } catch (error) {
            console.error('❌ Error sending email:', error)
            return NextResponse.json({
                success: false,
                message: 'Failed to send message. Please try again later.',
            }, { status: 500 })
        }
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 })
    }
}
