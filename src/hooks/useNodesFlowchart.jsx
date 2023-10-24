import { useState, useRef, useCallback, useContext } from "react";
import { addEdge, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";

import "../nodeTypes/node-style.css";
import { NodeSpin, NodeLeft, NodeRight } from "../nodeTypes/NodeBase";
import { useNodesContext } from "./useNodesContext";

const nodeTypes = {
    nodeRight: NodeRight,
    nodeLeft: NodeLeft,
    nodeSpin: NodeSpin,
};
const initialNodes = [
    {
        id: "0",
        type: "input",
        data: { label: "Start" },
        position: { x: 250, y: 5 },
    },
];

let id = 1;
const getId = () => `${id++}`;

export const useNodesFlowchart = () => {
    const reactFlowWrapper = useRef(null);
    const { nodesContext, setNodesContext } = useNodesContext();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");

            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { idNode: id - 1 },
            };
            setNodes((nds) => nds.concat(newNode));
            const newNodeContext = [newNode];
            setNodesContext((nds) => nds.concat(newNodeContext));
        },
        [reactFlowInstance]
    );
    return {
        reactFlowWrapper,
        nodes,
        edges,
        nodeTypes,
        onNodesChange,
        onEdgesChange,
        onConnect,
        setReactFlowInstance,
        onDrop,
        onDragOver,
        reactFlowInstance
    };
};
