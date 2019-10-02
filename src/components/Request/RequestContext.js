//react
import React, { createContext } from "react";

//context
import { useCollectionState } from "./../../context/CollectionContext/CollectionContext";

//provider
/**
 * (Context Provider) Provides context to components for the Request Collection
 * @param children - wrapped elements
 * @return JSX component
 */
const collectionName = "request";
export const RequestContextProvider = ({ children }) => {
    const subscribeToCollection = false; //do not subscribe
    const [collection, setCollection] = useCollectionState(collectionName, subscribeToCollection, []);
    return <>
        <RequestContext.Provider
            value={{ collection, setCollection, collectionName }}
        >
            {children}
        </RequestContext.Provider>
    </>
}

//context
const RequestContext = createContext({ err: "RequestContextProvider not set!" });
export default RequestContext;