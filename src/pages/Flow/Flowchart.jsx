import ReactFlow, {
    ReactFlowProvider,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import Swal from "sweetalert2";
import "animate.css";
import Sidebar from "./Sidebar";
import { useNodesContext } from "../../context/NodesContext";
import ConnectionLine from "../../components/ConnectionLine/ConnectionLine";
import { RiRobot2Fill } from "react-icons/ri";
import { api } from "../../services/api";

function nodeColor(node) {
    switch (node.type) {
        case "input":
            return "#aacc00";
        case "nodeAdvance":
            return "#0041d0";
        case "nodeTurn":
            return "#ff0072";
        default:
            return "#ff0072";
    }
}

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
        setOrdenatedNodes,
    } = useNodesContext();

    const deleteNode = (e) => {
        e.preventDefault();
        nodes.map((node) => {
            if (node.selected) {
                reactFlowInstance?.deleteElements({ nodes: [node] });
            }
        });
    };

    const deleteEdge = (e) => {
        e.preventDefault();
        edges.map((edge) => {
            if (edge.selected) {
                reactFlowInstance?.deleteElements({ edges: [edge] });
            }
        });
    };

    const nodesMap = {};

    edges.forEach((edge) => {
        if (!nodesMap[edge.source]) {
            nodesMap[edge.source] = [];
        }
        nodesMap[edge.source].push(edge.target);
    });

    function generateIdsOrderedNodes() {
        const result = [];
        const visited = {};

        function visit(node) {
            if (!visited[node]) {
                visited[node] = true;
                if (nodesMap[node]) {
                    nodesMap[node].forEach(visit);
                }
                result.unshift(node);
            }
        }

        visit("0");
        return result;
    }

    let idsOrdenated = generateIdsOrderedNodes();

    const ordenatedNodes = nodes.sort((a, b) => {
        const indexA = idsOrdenated.indexOf(a.id);
        const indexB = idsOrdenated.indexOf(b.id);
        return indexA - indexB;
    });

    const handlePrintNodes = (e) => {
        e.preventDefault();
        setOrdenatedNodes(ordenatedNodes);
        Swal.fire({
            title: "Comandos enviados!",
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
        });

        api.post("/", {
            blinkInterval: 1000,
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div>
            <Sidebar />
            <div className='dndflow' style={{ height: 700, width: "100%" }}>
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
                            onEdgeDoubleClick={deleteEdge}
                            connectionLineComponent={ConnectionLine}
                        >
                            <Background
                                variant={BackgroundVariant.Cross}
                                gap={50}
                            />
                            <Controls position='top-left' />
                            <MiniMap
                                nodeColor={nodeColor}
                                nodeStrokeWidth={3}
                                zoomable
                                pannable
                                position='bottom-left'
                            />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>

                <button onClick={handlePrintNodes}>
                    <RiRobot2Fill />
                </button>
            </div>
        </div>
    );
};

export default Flowchart;
