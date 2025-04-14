import { useMutation } from "@tanstack/react-query"
import axios from 'axios'
export const useFetchBookText = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            try {
                const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.gutenberg.org/files/${id}/${id}.txt`)
                return res.data
            } catch {
                throw new Error('failed to fetch book')
            }

        },

    })
}