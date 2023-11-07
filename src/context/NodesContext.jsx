import {
    createContext,
    useState,
    useRef,
    useCallback,
    useContext,
} from "react";
import { addEdge, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import "../components/NodeTypes/node-style.css";
import { NodeSpin } from "../components/NodeTypes/NodeSpin";
import { NodeAdvance } from "../components/NodeTypes/NodeAdvance";
import { VscDebugStart } from "react-icons/vsc";

const nodeTypes = {
    nodeAdvance: NodeAdvance,
    nodeSpin: NodeSpin,
};
const initialNodes = [
    {
        id: "0",
        type: "input",
        data: { label: <VscDebugStart /> },
        position: { x: 0, y: 50 },
        sourcePosition: "right",
        deletable: false,
        style: {
            background: "#aacc00",
            border: "0px",
            borderRadius: "50%",
            width: "40px",
            heigh: "40px",
            color: "#FFF",
        },
    },
];

let id = 1;
const getId = () => `${id++}`;

export const NodesContext = createContext();

export const NodesContextProvider = ({ children }) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [ordenatedNodes, setOrdenatedNodes] = useState([]);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
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
                data: {},
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );
    return (
        <NodesContext.Provider
            value={{
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
                ordenatedNodes,
                setOrdenatedNodes,
            }}
        >
            {children}
        </NodesContext.Provider>
    );
};

export const useNodesContext = () => {
    const context = useContext(NodesContext);
    return context;
};
