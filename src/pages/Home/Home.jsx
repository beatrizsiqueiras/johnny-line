import ReactFlow, { ReactFlowProvider, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import { useNodesContext } from "../../context/NodesContext";

const Home = () => {
    const {
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
        reactFlowInstance,
    } = useNodesContext();

    const deleteNode = (e) => {
        e.preventDefault();
        nodes.map((node) => {
            if (node.selected) {
                reactFlowInstance?.setNodes((nds) =>
                    nds.filter((n) => n.id !== node.id)
                );
            }
        });
    };
    const handlePrintNodes = (e) => {
        e.preventDefault();
        console.log(nodes);
    };
    return (
        <div className='dndflow' style={{ height: 1000, width: "100%" }}>
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
                        onNodeDoubleClick={deleteNode}
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
