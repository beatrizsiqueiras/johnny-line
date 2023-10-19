import { useContext } from "react";
import { NodesContext } from "../context/NodesContext";

export const useNodesContext = () => {

    const context = useContext(NodesContext);
    return context;
};
