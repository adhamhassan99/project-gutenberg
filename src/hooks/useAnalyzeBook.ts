import { splitTextIntoChunks } from "@/lib/splitText"
import { useFetchBookText } from "./useFetchBookText"
import { extractCharacters } from "./extractCharacters"
import { Response } from "openai/resources/responses/responses.mjs"
import { interactionEntry, mergeDuplicateInteractions } from "@/lib/mergeInteractions"

export const useAnalyzeBook = () => {
    const { mutateAsync } = useFetchBookText()
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

            const joined = res.map(entry => JSON.parse(entry.output_text.replace("```json", "").replace("```", "")) as interactionEntry[])

            try {
                const finalArray = mergeDuplicateInteractions(joined)
                return finalArray

            } catch (error) {
                console.error(error, 'merge error')
            }


            // getUniqueCharacters(joined, {
            //     onSuccess(data) {
            //         console.log(data, ' unique')
            //     },
            // })
        }


        catch (error) {
            console.error(error, ' errrrr')
            throw new Error('error')
        }

    }
    return { analyzeBook }
}