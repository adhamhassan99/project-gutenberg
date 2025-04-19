
export type interaction = { "with": string, "count": number }
export type interactionEntry = {
    source: string;
    target: string
    count: number
}

export function mergeDuplicateInteractions(data: (interactionEntry[])[]): { source: string, target: string, totalCount: number }[] {
    console.log(data, ' merge input')
    const interactionMap = new Map();

    data.flat().forEach(({ source, target, count }) => {
        // Create a unique key based on sorted character names
        const key = [source, target].sort().join('↔');

        if (interactionMap.has(key)) {
            interactionMap.set(key, interactionMap.get(key) + count);
        } else {
            interactionMap.set(key, count);
        }
    });

    console.log(interactionMap, ' interaction map')

    // Convert the Map to an array of objects
    return Array.from(interactionMap.entries()).map(([pair, totalCount]) => {
        const [charA, charB] = pair.split('↔');
        return {
            source: charA,
            target: charB,
            totalCount
        };
    }).sort((a, b) => b.totalCount - a.totalCount);
}