import React from "react";

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div className='description'>
                You can drag these nodes to the pane on the right.
            </div>
            <div
                className='dndnode input'
                onDragStart={(event) => onDragStart(event, "nodeRight")}
                draggable
            >
                Direita  
            </div>
            <div
                className='dndnode'
                onDragStart={(event) => onDragStart(event, "nodeLeft")}
                draggable
            >
                Esquerda
            </div>
            <div
                className='dndnode output'
                onDragStart={(event) => onDragStart(event, "nodeSpin")}
                draggable
            >
                Girar
            </div>
        </aside>
    );
};
