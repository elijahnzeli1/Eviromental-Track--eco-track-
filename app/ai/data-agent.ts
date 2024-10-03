import { getGeminiResponse } from '@/src/lib/gemini-api'

export async function analyzeEnvironmentalData(data: any) {
  const prompt = `Analyze the following environmental data and provide insights:
    ${JSON.stringify(data)}
    Please provide a summary of the data, identify any trends or patterns, and suggest potential actions based on the analysis.`

  const analysis = await getGeminiResponse(prompt)
  return analysis
}
// </antArt>