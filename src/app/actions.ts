"use server";
import { summarizeTrailer, SummarizeTrailerInput } from "@/ai/flows/trailer-summarization";

export async function getTrailerSummary(input: SummarizeTrailerInput) {
    try {
        const result = await summarizeTrailer(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error summarizing trailer:", error);
        return { success: false, error: "Failed to summarize trailer." };
    }
}
