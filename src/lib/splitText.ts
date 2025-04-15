/**
 * Splits a text string into chunks of specified size
 * @param text The input text to split
 * @param chunkSize The size of each chunk (default: 2000)
 * @returns Array of text chunks
 */
export function splitTextIntoChunks(text: string, chunkSize: number = 20000): string[] {
    const chunks: string[] = [];

    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }

    return chunks;
}
