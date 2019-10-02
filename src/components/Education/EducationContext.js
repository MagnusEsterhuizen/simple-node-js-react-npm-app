//react
import React, { createContext } from "react";

//context
import { useCollectionState } from "./../../context/CollectionContext/CollectionContext";

//provider
/**
 * (Context Provider) Provides context to components for the Education Collection
 * @param children - wrapped elements
 * @return JSX component
 */
const collectionName = "education";
export const EducationContextProvider = ({ children }) => {
    const subscribeToCollection = true;
    const [collection, setCollection] = useCollectionState(collectionName, subscribeToCollection, []);
    
    return <>
        <EducationContext.Provider
            value={{ collection, setCollection, collectionName }}
        >
            {children}
        </EducationContext.Provider>
    </>
}

//context
const EducationContext = createContext({ err: "EducationContextProvider not set!" });
export default EducationContext;