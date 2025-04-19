import { addEdge, Background, BackgroundVariant, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';


type Props = {
    interactions: { source: string, target: string, totalCount: number }[]
}

const InteractionVisualizer = ({ interactions }: Props) => {
    const uniqueCharacters = [...new Set(interactions.map(interaction => interaction.source))]
    const initialNodes = uniqueCharacters.map((character) => ({ id: character, position: { x: 0, y: Math.random() * 200 }, data: { label: character } }))
    console.log(initialNodes)
    const initialEdges = interactions.map(interaction => ({ id: `e${interaction.source}-${interaction.target}`, source: interaction.source, target: interaction.target }));
    console.log(initialEdges)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    )





    return (
        <ReactFlow nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect} >
            <MiniMap pannable zoomable />
            <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>

    )
}

export default InteractionVisualizer