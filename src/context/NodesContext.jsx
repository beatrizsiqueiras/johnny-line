import { createContext, useState } from "react";

export const NodesContext = createContext();

export const NodesContextProvider = ({ children }) => {
    const [nodesContext, setNodesContext] = useState([]);
    return (
        <NodesContext.Provider value={{ nodesContext, setNodesContext }}>
            {children}
        </NodesContext.Provider>
    );
};
