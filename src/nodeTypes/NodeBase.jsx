import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import { ImSpinner11 } from "react-icons/im";
const handleStyle = { left: 10 };

function NodeBase({ data, isConnectable, label }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className='text-updater-node'>
            <Handle
                type='target'
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div>
                <label htmlFor='text'>{label}</label>
                <input
                    id='text'
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

function NodeRight({ data, isConnectable }) {
    return <NodeBase isConnectable={isConnectable} label={<HiArrowRight />} />;
}

function NodeLeft({ data, isConnectable }) {
    return <NodeBase isConnectable={isConnectable} label={<HiArrowLeft />} />;
}

function NodeSpin({ data, isConnectable }) {
    return (
        <NodeBase
            isConnectable={isConnectable}
            label={<ImSpinner11 />}
        />
    );
}

export { NodeRight, NodeLeft, NodeSpin };
