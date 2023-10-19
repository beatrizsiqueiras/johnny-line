import React, { useState, useRef, useCallback, useContext } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import NodeRight from "../../components/node-types/NodeRight";
import "../../components/node-types/node-style.css";
import NodeLeft from "../../components/node-types/NodeLeft";
import NodeSpin from "../../components/node-types/NodeSpin";
import {NodesContext} from "../../context/NodesContext";

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

const Home = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {node, setNode} = useContext(NodesContext);
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
            // check if the dropped element is valid
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
                data: { idNode: id },
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );
    const handlePrintNodes = (e) => {
        e.preventDefault();
        nodes.map((node) => {
            console.log(node);
        });
    };
    return (
        <div className='dndflow' style={{ height: 1000, width: "100%" }}>
            <h1>Nodes :{node}</h1>
            <ReactFlowProvider>
                <div className='reactflow-wrapper' ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                        nodeTypes={nodeTypes}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
                <Sidebar />
                <button onClick={handlePrintNodes}>Ver comandos</button>
            </ReactFlowProvider>
        </div>
    );
};

export default Home;
