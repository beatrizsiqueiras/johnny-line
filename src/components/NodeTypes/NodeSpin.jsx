import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { ImSpinner11 } from "react-icons/im";
import { useNodesContext } from "../../context/NodesContext";

export const NodeSpin = ({ id, data, isConnectable }) => {
    const { nodes } = useNodesContext();
    let nodeIndex;
    let changedObject = {};

    const handleSelectComandToTurn = useCallback((evt) => {
        nodes.map((node, key) => {
            if (node.id == id) {
                nodeIndex = key;
                changedObject = { ...node };
                evt.target.name == "direction"
                    ? (changedObject.data.direction = evt.target.value)
                    : (changedObject.data.degrees = evt.target.value);
            }
        });
        nodes[nodeIndex] = changedObject;
    }, []);

    return (
        <div>
            <div className='node'>
                <Handle
                    type='source'
                    position={Position.Right}
                    isConnectable={isConnectable}
                />
                <div className="node-spin">
                    <label htmlFor='text'>{<ImSpinner11 />}</label>
                    <select
                        name='direction'
                        id='direction'
                        onChange={handleSelectComandToTurn}
                    >
                        <option value='right'>Direita</option>
                        <option value='left'>Esquerda</option>
                    </select>
                    <select
                        name='degrees'
                        id='degrees'
                        onChange={handleSelectComandToTurn}
                        className='nodrag'
                    >
                        <option value='1'>1°</option>
                        <option value='45'>45°</option>
                        <option value='72'>72°</option>
                        <option value='90'>90°</option>
                        <option value='120'>120°</option>
                        <option value='144'>144°</option>
                    </select>
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
};
