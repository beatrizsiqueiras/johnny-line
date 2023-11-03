import React from "react";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { ImSpinner11 } from "react-icons/im";

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div
                className='dndnode input'
                onDragStart={(event) => onDragStart(event, "nodeAdvance")}
                draggable
            >
                <PiArrowFatLinesUpFill />
            </div>
            <div
                className='dndnode output'
                onDragStart={(event) => onDragStart(event, "nodeSpin")}
                draggable
            >
                <ImSpinner11 />
            </div>
        </aside>
    );
};
