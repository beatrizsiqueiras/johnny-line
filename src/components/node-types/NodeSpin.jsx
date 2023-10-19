import { useCallback, useState } from "react";
import { Handle, Position, useNodesState } from "reactflow";
import { ImSpinner11 } from "react-icons/im";

const handleStyle = { left: 10 };

function NodeSpin({ data, isConnectable }) {
    const [nodes, setNodes] = useNodesState();
    const onChange = useCallback((evt) => {
        console.log(data.idNode);
    }, []);

    // const [inputsSpin, setInputsSpin] = useState();
    return (
        <div className='text-updater-node'>
            <Handle
                type='target'
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div>
                <label htmlFor='text'>
                    <ImSpinner11 />
                </label>
                <input
                    id= {"text" + data.idNode}
                    name='text'
                    onChange={onChange}
                    className='nodrag'
                />
            </div>
            <Handle
                type='source'
                position={Position.Bottom}
                id='b'
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default NodeSpin;
