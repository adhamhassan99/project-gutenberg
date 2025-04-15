import { splitTextIntoChunks } from "@/lib/splitText"
import { useFetchBookText } from "./useFetchBookText"
import { extractCharacters } from "./extractCharacters"
import { useFindUniqueCharacters } from "./useFindUniqueCharacters"
import { Response } from "openai/resources/responses/responses.mjs"

export const useAnalyzeBook = () => {
    const { mutateAsync } = useFetchBookText()
    const { mutateAsync: getUniqueCharacters, data } = useFindUniqueCharacters()
    const analyzeBook = async (id: string) => {

        const promises: Promise<Response & {
            _request_id?: string | null;
        }>[] = []

        try {
            const bookText = await mutateAsync(id) as string

            splitTextIntoChunks(bookText).map((entry) => {
                promises.push(extractCharacters(entry))
            })

            const res = await Promise.all(promises)

            const joined = res.map(entry => entry.output_text).join('//,//')
            getUniqueCharacters(joined, {
                onSuccess(data) {
                    console.log(data, ' unique')
                },
            })
            return joined
        }


        catch {
            throw new Error('error')
        }

    }
    return { analyzeBook, uniqueCharacters: data }
}