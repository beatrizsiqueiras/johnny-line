import ReactFlow, {
    ReactFlowProvider,
    Controls,
    Background,
    MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import { useNodesContext } from "../../context/NodesContext";
import ConnectionLine from "../../components/ConnectionLine/ConnectionLine";

const Flowchart = () => {
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

    const targetIds = edges.map((edge) => edge.target);

    const deleteNode = (e) => {
        e.preventDefault();
        let nodeSelectedId = "";
        nodes.map((node) => {
            if (node.selected) {
                nodeSelectedId = node.id;
                reactFlowInstance?.setNodes((nds) =>
                    nds.filter((n) => n.id !== node.id)
                );
            }
        });

        edges.map((edge) => {
            if (edge.target == nodeSelectedId || edge.source == nodeSelectedId) {
                reactFlowInstance?.setEdges((edg) =>
                    edg.filter((e) => e.id !== edge.id)
                );
            }
        });
    };

    const nodeCommands = () => {};
    const handlePrintNodes = (e) => {
        e.preventDefault();
        console.log(reactFlowInstance.toObject());
        // console.log(nodes);
        // console.log(targetIds);
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
                        connectionLineComponent={ConnectionLine}
                    >
                        <Background />
                        <Controls />
                        <MiniMap nodeStrokeWidth={3} zoomable pannable />
                    </ReactFlow>
                </div>
                <Sidebar />
                <button onClick={handlePrintNodes}>Ver comandos</button>
            </ReactFlowProvider>
        </div>
    );
};

export default Flowchart;
