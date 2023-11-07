import React from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { ImSpinner11 } from "react-icons/im";

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div
                className='dndnode node-advance'
                onDragStart={(event) => onDragStart(event, "nodeAdvance")}
                draggable
            >
                <HiOutlineArrowsUpDown />
            </div>
            <div
                className='dndnode node-spin'
                onDragStart={(event) => onDragStart(event, "nodeSpin")}
                draggable
            >
                <ImSpinner11 />
            </div>
        </aside>
    );
};
