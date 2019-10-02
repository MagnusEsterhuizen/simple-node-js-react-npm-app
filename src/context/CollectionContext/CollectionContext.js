//react
import React, { createContext, useContext, useReducer, useEffect } from "react";

//database
import { doSubscribe, doInsert, doUpdate, doDelete, doUpload, doDrop, doExport, doDuplicate } from "./../../database/firebase/firebase";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

let debounceTimout;
//debounce
/**
 * (User Funtion) Waits for a few miliseconds before updating document state from field state
 * @param state - current state
 * @param action - action parameter
 */
const debounce = (func, msec = 1500) => {
    if (debounceTimout) {
        clearTimeout(debounceTimout);
    }
    debounceTimout = setTimeout(func, msec);
}

//collection
/**
 * (Component Collection Reducer) Performs collection state change
 * @param state - current state
 * @param action - action parameter
 */
const collectionReducer = (state, action) => {
    const { type, document } = action;
    switch (type) {
        case "state": {
            //get
            return state;
        }
        case "setState": {
            //set
            const newState = [
                ...document
            ];
            return newState;
        }
        default:
            return state;
    }
};

/**
 * (Component Document State) Provides document state for components
 * @param collectionName - collection name from component
 * @param subscribe - should the collection be subscribed to
 * @param initialState - set initial state
 * @return state - get collection
 * @return setState - set collection method
 */
export const useCollectionState = (collectionName, subscribe, initialState = []) => {
    const { authGroup } = useContext(AuthorizeContext);
    const [state, dispatch] = useReducer(collectionReducer, initialState);

    function setState(document) {
        dispatch({
            type: "setState",
            document
        });
    };

    //subscribe to firebase - unload remove subsription
    useEffect(() => {
        if (subscribe === true) {
            const unsubscribe = doSubscribe(collectionName, setState, authGroup);
            return () => {
                console.log(collectionName + "...unsubscribing...");
                unsubscribe();
            }
        }
        else {
            //use localstorage (TODO!)
        }
    }, []);

    return [state, setState];
};

//document
/**
 * (Component Document Reducer) Performs document state change
 * @param state - current state
 * @param action - action parameter
 */
const documentReducer = (state, action) => {
    const { type, document, collectionName, setCollection, filename, file, onSuccess } = action;
    switch (type) {
        case "state":
            //get
            return state;

        case "setState":
            //set
            const newState = {
                ...state,
                ...document
            };

            //liftState
            /*if (setCollection) {
                setCollection(newState);
            }*/

            return newState;

        case "saveDocument":
            if (!document.id) {
                //insert
                if (true) {
                    doInsert(collectionName, document);
                }
                else {
                    //use localstorage (TODO!)
                }
            }
            else {
                //update
                if (true) {
                    doUpdate(collectionName, document);
                }
                else {
                    //use localstorage (TODO!)
                }
            }
            return state;

        case "removeDocument":
            //delete
            if (true) {
                doDelete(collectionName, document);
            }
            else {
                //use localstorage (TODO!)
            }
            return state;

        case "uploadFile":
            //upload
            if (true) {
                doUpload(collectionName, filename, file, onSuccess);
            }
            else {
                //use localstorage (TODO!)
            }
            return state;

        case "dropFile":
            //delete
            if (true) {
                doDrop(collectionName, filename, onSuccess);
            }
            else {
                //use localstorage (TODO!)
            }
            return state;

        case "exportDB":
            //delete
            if (true) {
                doExport();
            }
            else {
                //use localstorage (TODO!)
            }
            return state;


        case "duplicateDB":
            //delete
            if (true) {
                doDuplicate();
            }
            else {
                //use localstorage (TODO!)
            }
            return state;

        default:
            return state;
    }
};

/**
 * (Component Document State) Provides document state for components
 * @param CollectionContext - collection context from component
 * @param docKey - document key
 * @param docVal - document value
 * @param initialState - set initial state
 * @return collection - collection array of documents for subscribed collection
 * @return setCollection - set collection method
 * @return collectionName - the name of the collection
 * @return document - document for components
 * @return setDocument - set document method
 * @return loadDocument - load document data
 * @return newDocument - new document
 * @return getDocument - get document data
 * @return saveDocument - save document data
 * @return removeDocument - delete document data
 * @return uploadFile - upload file to firebase store
 * @return dropFile - delete file from firebase store
 */
export const useDocumentState = (CollectionContext, docKey, docVal, initialState) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { collection, setCollection, collectionName } = useContext(CollectionContext);
    const [state, dispatch] = useReducer(documentReducer, initialState);

    function setState(document) {
        dispatch({
            type: "setState",
            document,
            setCollection
        });
    };

    function newDocument() {
        let document = {};
        if (collection[0]) {

            //use first collection as key template to create new empty collection
            document = Object.keys(collection[0]).map((key) => {
                return key
            }).reduce((field, key) => Object.assign(field, { [key]: "" }), {});

            document.id = "";
            dispatch({
                type: "setState",
                document
            });
        }
    }

    function getDocument(key, val) {
        const document = collection.filter((document) => document[key] === val)[0];
        return document;
    }

    function loadState(key, val) {
        const document = getDocument(key, val);
        dispatch({
            type: "setState",
            document
        });
    }

    function saveDocument(document) {
        dispatch({
            type: "saveDocument",
            collectionName,
            document
        });
    };

    function removeDocument(document) {
        dispatch({
            type: "removeDocument",
            collectionName,
            document
        });
    };

    function uploadFile(filename, file, onSuccess = null) {
        dispatch({
            type: "uploadFile",
            collectionName,
            filename,
            file,
            onSuccess
        });
    };

    function dropFile(filename, onSuccess = null) {
        dispatch({
            type: "dropFile",
            collectionName,
            filename,
            onSuccess
        });
    };

    function exportDB() {
        dispatch({
            type: "exportDB"
        });
    };

    function duplicateDB() {
        dispatch({
            type: "duplicateDB"
        });
    };

    //load data into state when collection updates
    useEffect(() => {
        if (docVal) {
            loadState(docKey, docVal);
        }
        else {
            newDocument();
        }
    }, [collection]);

    return {
        collection, setCollection, collectionName,
        document: state,
        setDocument: setState,
        loadDocument: loadState,
        newDocument, getDocument,
        saveDocument, removeDocument,
        uploadFile, dropFile,
        exportDB, duplicateDB
    };
};

//field
/**
 * (Component Field Reducer) Performs field state change
 * @param state - current state
 * @param action - action parameter
 */
const fieldReducer = (state, action) => {
    const { type, field } = action;
    switch (type) {
        case "state":
            //get
            return state;

        case "setState":
            //set
            const newState = {
                ...state,
                ...field
            };
            return newState;

        default:
            return state;
    }
};

/**
 * (Component Field State) Provides field state for components and lifts state to document after set debounce time
 * @param id - field id
 * @param value - field default value
 * @param setDocument - liftState function
 * @return field - state value
 * @return setField - set state value
 * @return handleFieldChange - event listener for field change
 */
export const useFieldState = (id, value, setDocument) => {
    const [state, dispatch] = useReducer(fieldReducer, { [id]: value });

    function setState(field) {
        dispatch({
            type: "setState",
            field
        });

        //liftState
        if (setDocument) {
            debounce(() => {
                setDocument(field);
            }, 200);
        }
    };

    function handleChange(event) {
        setState({ [event.target.id]: event.target.value });
    }

    //update field value when it changes
    useEffect(() => {
        if (value !== state[id]) {
            setState({ [id]: value });
        }
    }, [value]);

    return {
        field: state,
        setField: setState,
        handleFieldChange: handleChange
    };
}

//provider
/**
 * (Context Provider) Provides context to components for subscribed collection
 * @param children - wrapped elements
 * @return JSX component
 */
export const CollectionContextProvider = ({ collectionName, children }) => {
    const subscribeToCollection = true;
    const [collection, setCollection] = useCollectionState(collectionName, subscribeToCollection, []);

    return <>
        <CollectionContext.Provider
            value={{ collection, setCollection, collectionName }}
        >
            {children}
        </CollectionContext.Provider>
    </>
}

//context
const CollectionContext = createContext({ err: "CollectionContextProvider not set!" });
export default CollectionContext;
