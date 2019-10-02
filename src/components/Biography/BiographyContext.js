//react
import React, { createContext } from "react";

//context
import { useCollectionState } from "./../../context/CollectionContext/CollectionContext";

const collectionName = "biography";

//provider
/**
 * (Context Provider) Provides context to components for the Biography Collection
 * @param children - wrapped elements
 * @return JSX component
 */
export const BiographyContextProvider = ({ children }) => {
    const subscribeToCollection = true;
    const [collection, setCollection] = useCollectionState(collectionName, subscribeToCollection, []);
    return <>
        <BiographyContext.Provider
            value={{ collection, setCollection, collectionName }}
        >
            {children}
        </BiographyContext.Provider>
    </>
}

//context
const BiographyContext = createContext({ err: "BiographyContextProvider not set!" });
export default BiographyContext;