import { OpenAIClient } from "@/lib/OpenAIClient"
import { useMutation } from "@tanstack/react-query"

export const useFindUniqueCharacters = () => {
    return useMutation({
        mutationFn: async (allCharacters: string) => {

            const res = await OpenAIClient.responses.create({ model: 'gpt-4o-mini', input: allCharacters, instructions: 'Use the provided concatenated lists of characters that represent lists of characters from a novel to return a single array of all unique characters without any repetition.return the result in a form of a valid array of strings only without any extra text or explanation, just an array of character names for example: ["character 1", "character 2",...etc]' })
            return res
        }
    })
}