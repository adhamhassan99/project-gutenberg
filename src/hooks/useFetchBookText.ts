import { useMutation } from "@tanstack/react-query"
import axios from 'axios'
export const useFetchBookText = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await axios.get(`https://www.gutenberg.org/files/${id}/${id}-0.txt`)
            return res.data
        },

    })
}