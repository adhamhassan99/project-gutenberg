import { INSTRUCTIONS } from "@/constants/AI"
import { OpenAIClient } from "@/lib/OpenAIClient"

export const extractCharacters = async (textChunk: string) => {

    return OpenAIClient.responses.create({ model: 'gpt-4o-mini', input: textChunk, instructions: INSTRUCTIONS })
}