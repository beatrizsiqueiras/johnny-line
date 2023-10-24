import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import { ImSpinner11 } from "react-icons/im";
import { useNodesContext } from "../context/NodesContext";

function NodeBase({ id, data, isConnectable, label }) {
    const { nodes } = useNodesContext();
    let idNode = `input${id}`;
    let nodeIndex;
    let changedObject = {};

    const onChange = useCallback((evt) => {
        nodes.map((node, key) => {
            if (node.id == data.idNode) {
                nodeIndex = key;
                changedObject = { ...node };
                changedObject.data.inputValue = evt.target.value;
            }
        });
        nodes[nodeIndex] = changedObject;
    }, []);

    return (
        <div>
            <div className='input-node'>
                <Handle
                    type='source'
                    position={Position.Right}
                    isConnectable={isConnectable}
                />
                <div>
                    <label htmlFor='text'>{label}</label>
                    <input
                        id={idNode}
                        name='text'
                        onChange={onChange}
                        className='nodrag'
                    />
                </div>
                <Handle
                    type='target'
                    position={Position.Left}
                    id='b'
                    isConnectable={isConnectable}
                />
            </div>
        </div>
    );
}

function NodeRight({ id, data, isConnectable }) {
    return (
        <NodeBase
            isConnectable={isConnectable}
            label={<HiArrowRight />}
            data={data}
        />
    );
}

function NodeLeft({ id, data, isConnectable }) {
    return (
        <NodeBase
            isConnectable={isConnectable}
            label={<HiArrowLeft />}
            data={data}
        />
    );
}

function NodeSpin({ id, data, isConnectable }) {
    return (
        <NodeBase
            isConnectable={isConnectable}
            label={<ImSpinner11 />}
            data={data}
        />
    );
}

export { NodeRight, NodeLeft, NodeSpin, NodeBase };
