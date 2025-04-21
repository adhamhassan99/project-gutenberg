import { useMutation } from "@tanstack/react-query"
import axios from 'axios'
export const useFetchBookText = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            try {
                const res = await axios.get(`https://www.gutenberg.org/files/${id}/${id}.txt`)
                return res.data
            } catch {
                try {
                    const res = await axios.get(`https://www.gutenberg.org/files/${id}/${id}-0.txt`)
                    return res.data

                } catch {
                    throw new Error('failed to fetch book')

                }

            }

        },

    })
}