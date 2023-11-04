import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { useNodesContext } from "../../context/NodesContext";

export const NodeAdvance = ({ id, data, isConnectable }) => {
    const { nodes } = useNodesContext();
    let nodeIndex;
    let changedObject = {};

    const handleDistanceToMove = useCallback((evt) => {
        nodes.map((node, key) => {
            if (node.id == id) {
                nodeIndex = key;
                changedObject = { ...node };
                evt.target.name == "direction"
                    ? (changedObject.data.direction = evt.target.value)
                    : (changedObject.data.length = evt.target.value);
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
                <div>
                    <div>
                        <label>{<PiArrowFatLinesUpFill />}</label>
                        <select
                            name='direction'
                            id='direction'
                            onChange={handleDistanceToMove}
                        >
                            <option value='forward'>Mover para frente</option>
                            <option value='backward'>Mover para trás</option>
                        </select>
                        <label>
                            <input
                                type='number'
                                name='length'
                                id='length'
                                placeholder='Distância'
                                onChange={handleDistanceToMove}
                            />
                        </label>
                    </div>
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
