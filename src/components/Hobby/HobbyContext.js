//react
import React, { createContext } from "react";

//context
import { useCollectionState } from "./../../context/CollectionContext/CollectionContext";

//provider
/**
 * (Context Provider) Provides context to components for the Hobby Collection
 * @param children - wrapped elements
 * @return JSX component
 */
const collectionName = "hobby";
export const HobbyContextProvider = ({ children }) => {
    const subscribeToCollection = true;
    const [collection, setCollection] = useCollectionState(collectionName, subscribeToCollection, []);
    
    return <>
        <HobbyContext.Provider
            value={{ collection, setCollection, collectionName }}
        >
            {children}
        </HobbyContext.Provider>
    </>
}

//context
const HobbyContext = createContext({ err: "HobbyContextProvider not set!" });
export default HobbyContext;