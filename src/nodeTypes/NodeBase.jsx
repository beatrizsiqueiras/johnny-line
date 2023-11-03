import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { ImSpinner11 } from "react-icons/im";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { useNodesContext } from "../context/NodesContext";

function NodeBase({ id, data, isConnectable, label }) {
    const { nodes } = useNodesContext();
    let idNode = `input${id}`;
    let nodeIndex;
    let changedObject = {};

    const onChange = useCallback((evt) => {
        nodes.map((node, key) => {
            if (node.id == id) {
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

function NodeAdvance({ id, data, isConnectable }) {
    return (
        <NodeAdvance
            isConnectable={isConnectable}
            label={<PiArrowFatLinesUpFill />}
            data={data}
            id={id}
        />
    );
}

function NodeSpin({ id, data, isConnectable }) {
    return (
        <NodeBase
            isConnectable={isConnectable}
            label={<ImSpinner11 />}
            data={data}
            id={id}
        />
    );
}

export { NodeAdvance, NodeSpin, NodeBase };
