//react
import React, { createContext } from "react";

//context
import { useCollectionState } from "./../../context/CollectionContext/CollectionContext";

//provider
/**
 * (Context Provider) Provides context to components for the Employment Collection
 * @param children - wrapped elements
 * @return JSX component
 */
const collectionName = "employment";
export const EmploymentContextProvider = ({ children }) => {
    const subscribeToCollection = true;
    const [collection, setCollection] = useCollectionState(collectionName, subscribeToCollection, []);
    
    return <>
        <EmploymentContext.Provider
            value={{ collection, setCollection, collectionName }}
        >
            {children}
        </EmploymentContext.Provider>
    </>
}

//context
const EmploymentContext = createContext({ err: "EmploymentContextProvider not set!" });
export default EmploymentContext;