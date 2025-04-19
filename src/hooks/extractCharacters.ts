import { OpenAIClient } from "@/lib/OpenAIClient"

export const extractCharacters = async (textChunk: string) => {

    return OpenAIClient.responses.create({
        model: 'gpt-4o-mini', input: textChunk,
        instructions: `You are a literary analysis assistant.

        You will be given a raw chunk of text from a novel, play, or story. Your job is to:
        1. Identify all named **characters** in the text. Note that character names might be addressed in different formats but refer to the same character such as Romeo, Rom:, and Juliette, Jul. If a character appears with multiple spellings or ways of writing the name, consider as one character and standardize the name.
        2. Determine which characters **interact** Directly ONLY.
        3. Count how many times each character interacts with the others.
        4. Output a structured JSON ONLY representing this interaction network without ANY prefix or suffix text in the following format : 
        [{ source: "Character Talking", target: "Character being talked to", count: number }]
        .



        ### Guidelines:
        Interaction means:

        One character directly speaks to or about another.

        One character mentions another by name or clearly refers to them.

        Dialogue proximity indicates a back-and-forth exchange.

        Indirect references should be included when reasonably clear.

        If two or more variations of a character’s name are used (e.g., “Juliete” and “Juliette”), treat them as the same person. Normalize spelling using reasonable assumptions (e.g., phonetic similarity, common abbreviations).

        Ensure all names in the final output are the standardized names.

        ` })
}