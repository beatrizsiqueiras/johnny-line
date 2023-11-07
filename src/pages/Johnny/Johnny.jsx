import { useEffect } from "react";
import { useNodesContext } from "../../context/NodesContext";

const Johnny = () => {
    const { ordenatedNodes } = useNodesContext();
    useEffect(() => {
        console.log(ordenatedNodes);
    }, [ordenatedNodes]);
};

export default Johnny;
