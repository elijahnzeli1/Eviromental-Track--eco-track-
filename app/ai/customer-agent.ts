import { getGeminiResponse } from '@/src/lib/gemini-api'

export async function handleCustomerInquiry(inquiry: string) {
  const prompt = `You are a customer service agent for Eco-Track, an app that encourages environmental cleanup. Please respond to the following customer inquiry:
    "${inquiry}"
    Provide a helpful and friendly response that addresses the customer's concerns and promotes the app's mission.`

  const response = await getGeminiResponse(prompt)
  return response
}