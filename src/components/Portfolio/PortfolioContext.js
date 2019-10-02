//react
import React, { createContext } from "react";

//context
import { useCollectionState } from "./../../context/CollectionContext/CollectionContext";

//provider
/**
 * (Context Provider) Provides context to components for the Portfolio Collection
 * @param children - wrapped elements
 * @return JSX component
 */
const collectionName = "portfolio";
export const PortfolioContextProvider = ({ children }) => {
    const subscribeToCollection = true;
    const [collection, setCollection] = useCollectionState(collectionName, subscribeToCollection, []);
    return <>
        <PortfolioContext.Provider
            value={{ collection, setCollection, collectionName }}
        >
            {children}
        </PortfolioContext.Provider>
    </>
}

//context
const PortfolioContext = createContext({ err: "PortfolioContextProvider not set!" });
export default PortfolioContext;