import { NextResponse } from 'next/server'
import { handleCustomerInquiry } from '@/app/ai/customer-agent'
import { generateEmployeeTask } from '@/app/ai/employee-agent'
import { analyzeSecurityThreat } from '@/app/ai/security-agent'
import { analyzeEnvironmentalData } from '@/app/ai/data-agent'

export async function POST(request: Request) {
  const { message } = await request.json()

  try {
    // Determine which AI agent to use based on the message content
    let response
    let action = null
    let path = null

    if (message.toLowerCase().includes('security') || message.toLowerCase().includes('threat')) {
      response = await analyzeSecurityThreat(message)
    } else if (message.toLowerCase().includes('data') || message.toLowerCase().includes('analysis')) {
      response = await analyzeEnvironmentalData(message)
    } else if (message.toLowerCase().includes('employee') || message.toLowerCase().includes('task')) {
      response = await generateEmployeeTask('general', [])
    } else {
      response = await handleCustomerInquiry(message)
    }

    // Check if the response suggests navigation
    if (response.toLowerCase().includes('dashboard')) {
      action = 'navigate'
      path = '/dashboard'
    } else if (response.toLowerCase().includes('map')) {
      action = 'navigate'
      path = '/map'
    } else if (response.toLowerCase().includes('community')) {
      action = 'navigate'
      path = '/community'
    } else if (response.toLowerCase().includes('marketplace')) {
      action = 'navigate'
      path = '/marketplace'
    } else if (response.toLowerCase().includes('projects')) {
      action = 'navigate'
      path = '/projects'
    }

    return NextResponse.json({ response, action, path })
  } catch (error) {
    console.error('Error processing AI request:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
