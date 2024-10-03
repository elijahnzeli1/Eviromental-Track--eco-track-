import { getGeminiResponse } from '@/src/lib/gemini-api'

export async function generateEmployeeTask(employeeRole: string, currentProjects: string[]) {
  const prompt = `You are an AI assistant for Eco-Track, an app that promotes environmental cleanup. Generate a task for an employee with the following role:
    "${employeeRole}"
    Current projects: ${JSON.stringify(currentProjects)}
    Provide a specific, actionable task that aligns with the employee's role and contributes to the company's mission.`

  const task = await getGeminiResponse(prompt)
  return task
}