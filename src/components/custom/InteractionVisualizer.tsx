/* eslint-disable @typescript-eslint/no-explicit-any */
import { addEdge, Background, BackgroundVariant, MiniMap, Panel, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import Dagre from '@dagrejs/dagre';

import '@xyflow/react/dist/style.css';
import { useCallback, useEffect } from 'react';
import { Button } from '../ui/button';


type Props = {
    interactions: { source: string, target: string, totalCount: number }[]
}

const getLayoutedElements = (nodes: any, edges: any, options: any) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge: { source: Dagre.Edge; target: string | { [key: string]: any; } | undefined; }) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node: any) =>
        g.setNode(node.id, {
            ...node,
            width: node.measured?.width ?? 0,
            height: node.measured?.height ?? 0,
        }),
    );

    Dagre.layout(g);

    return {
        nodes: nodes.map((node: { id: string | Dagre.Label; measured: { width: any; height: any; }; }) => {
            const position = g.node(node.id);
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            const x = position.x - (node.measured?.width ?? 0) / 2;
            const y = position.y - (node.measured?.height ?? 0) / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};


const InteractionVisualizer = ({ interactions }: Props) => {
    const { fitView } = useReactFlow()
    const uniqueCharacters = [...new Set(interactions.map(interaction => interaction.source))]
    const initialNodes = uniqueCharacters.map((character) => ({ id: character, position: { x: Math.random() * 400, y: Math.random() * 400 }, data: { label: character }, deletable: false }))
    const initialEdges = interactions.map(interaction => ({ id: `e${interaction.source}-${interaction.target}`, source: interaction.source, target: interaction.target, deletable: false, label: interaction.totalCount }));
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    )


    useEffect(() => {

        const layouted = getLayoutedElements(nodes, edges, { direction: 'TB' });

        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);

        fitView();

    }, [])





    const onLayout = useCallback(
        (direction: string) => {
            console.log(nodes);
            const layouted = getLayoutedElements(nodes, edges, { direction });

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            fitView();
        },
        [nodes, edges, setNodes, setEdges, fitView],
    );

    return (
        <ReactFlow className='rounded-md' style={{ backgroundColor: 'white' }} onNodesDelete={() => { }} nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect} fitView>
            <Panel position="top-left" className='flex gap-3'>
                <Button variant={'outline'} onClick={() => onLayout('LR')}>vertical layout</Button>
                <Button variant={'outline'} onClick={() => onLayout('TB')}>horizontal layout</Button>
            </Panel>
            <MiniMap pannable zoomable />
            <Background variant={BackgroundVariant.Dots} size={2} />
        </ReactFlow>

    )
}

const FlowWithProvider = ({ interactions }: Props) => {
    return (
        <ReactFlowProvider>
            <InteractionVisualizer interactions={interactions} />
        </ReactFlowProvider>
    )
}

export default FlowWithProvider