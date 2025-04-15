import { OpenAIClient } from "@/lib/OpenAIClient"
import { useMutation } from "@tanstack/react-query"

export const useFindUniqueCharacters = () => {
    return useMutation({
        mutationFn: async (allCharacters: string) => {

            const res = await OpenAIClient.responses.create({ model: 'gpt-4o-mini', input: allCharacters, instructions: 'Use the provided concatenated lists of characters that represent lists of characters from a novel to return a single array of all unique characters without any repetition' })
            return res
        }
    })
}