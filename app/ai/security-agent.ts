import { getGeminiResponse } from '@/src/lib/gemini-api'

export async function analyzeSecurityThreat(threat: string) {
  const prompt = `You are a security analyst for Eco-Track, an app that handles user data and environmental information. Analyze the following potential security threat:
    "${threat}"
    Provide an assessment of the threat level, potential impacts, and recommended actions to mitigate the risk.`

  const analysis = await getGeminiResponse(prompt)
  return analysis
}