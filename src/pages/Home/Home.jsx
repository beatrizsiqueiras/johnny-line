import ReactFlow, { ReactFlowProvider, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import { useNodesFlowchart } from "../../hooks/useNodesFlowchart";
import { useNodesContext } from "../../hooks/useNodesContext";

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
    } = useNodesFlowchart();

    const { nodesContext } = useNodesContext();

    const handlePrintNodes = (e) => {
        e.preventDefault();
        console.log(nodes);
        nodes.map((node)=>{
            if(node.selected){
                reactFlowInstance?.setNodes((nds) => nds.filter((n) => n.id !== node.id))
            }
        })
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
                        onNodeDoubleClick={handlePrintNodes}
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
