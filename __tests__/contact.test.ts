import { submitContactForm } from '../app/actions/contact'

describe('Contact Form Tests', () => {
  test('validates email format', async () => {
    const formData = new FormData()
    formData.append('name', 'Test User')
    formData.append('email', 'invalid-email')
    formData.append('message', 'Test message')
    
    const response = await submitContactForm(formData)
    expect(response.success).toBe(false)
    expect(response.message).toContain('valid email')
  })
})