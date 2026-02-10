"use server"

import { submitIdea } from "@/lib/airtable"

export async function submitIdeaAction(prevState: any, formData: FormData) {
    const title = formData.get("title") as string
    const problem = formData.get("problem") as string
    const solution = formData.get("solution") as string
    const resources = formData.get("resources") as string
    const category = formData.get("category") as string

    if (!title || !problem || !solution || !category) {
        return { success: false, message: "Please fill in all required fields." }
    }

    try {
        const result = await submitIdea({
            title,
            problem,
            solution,
            resources,
            category,
        })

        if (result.success) {
            return { success: true, message: "Idea submitted successfully!" }
        } else {
            // Log the error for debugging (server-side)
            console.error("Submission failed:", result.error);
            return {
                success: false,
                message: result.error || "Failed to submit. Please try again."
            }
        }
    } catch (error) {
        console.error("Unexpected error in server action:", error);
        return { success: false, message: "An unexpected error occurred." }
    }
}
