import { createContext, useState } from "react";

export const NodesContext = createContext();

export const NodesContextProvider = ({ children }) => {
    const [nodes, setNodes] = useState([]);
    return (
        <NodesContext.Provider value={{ nodes, setNodes }}>
            {children}
        </NodesContext.Provider>
    );
};
