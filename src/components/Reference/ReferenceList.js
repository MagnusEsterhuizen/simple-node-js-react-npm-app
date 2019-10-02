//react
import React, { useContext } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

//context
import EmploymentContext from "./../../components/Employment/EmploymentContext";

//components
import ReferenceView from "./ReferenceView";

//elements
import SpinnerLoader from "./../../elements/SpinnerLoader/SpinnerLoader";

//styles
import commonListStyles from "./../_common/ListStyles";

/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...commonListStyles(),
        ...(makeStyles(theme => ({
            "@global": {
                "#ReferenceList:last-child #dividerReferenceList": {
                    backgroundColor: "transparent!important",
                    marginBottom: 0
                }
            }
        })))()
    };
}

//presentation
/**
 * (Presentation Component) Displays list of References
 * @param data  - data objects
 * - data[collection] - current components collection of documents
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const ReferenceList = ({ data, control, render, ...props }) => {
    const { collection, showReadMoreLink } = data;

    const classes = getClasses();
    if (collection) {
        return collection.map((document, index) => document.referenceName
            ? <div key={index} id="ReferenceList">
                {document.referenceName2
                    ? <>
                        <ReferenceView
                            documentId={document.id}
                            reference2={true}
                            isPaper={false}
                            showReadMoreLink={showReadMoreLink}
                        />
                        {showReadMoreLink
                            ? <Divider id="dividerReferenceList" className={classes.divider} />
                            : <>
                                <br />
                                <br />
                            </>
                        }
                    </>
                    : <></>
                }
                <ReferenceView
                    documentId={document.id}
                    showReadMoreLink={showReadMoreLink}
                />
                {showReadMoreLink
                    ? <Divider id="dividerReferenceList" className={classes.divider} />
                    : <>
                        <br />
                        <br />
                    </>
                }
            </div>
            : false
        );
    }
    else {
        return <SpinnerLoader />
    }
}

//container
/**
 * (Container Component) Displays list of References
 * @param documentId - optional - if you wish to show only the document's references
 * @param props - props extra
 * @return JSX component
 */
export default ({ documentId, ...props }) => {
    const { collection } = useContext(EmploymentContext);

    let filteredCollection = {};
    let showReadMoreLink = true;
    if (collection) {
        if (documentId) {
            //only for document
            filteredCollection = collection.filter(document => {
                if (document.id === documentId) {
                    return true;
                }
                return false;
            });
            showReadMoreLink = false;
        }
        else {
            //show all
            filteredCollection = collection.concat().sort((a, b) => {
                if (!a.referencePath) {
                    a.referencePath = "";
                }
                if (!a.referencePath2) {
                    a.referencePath2 = "";
                }
                if (!b.referencePath) {
                    b.referencePath = "";
                }
                if (!b.referencePath2) {
                    b.referencePath2 = "";
                }

                if (a.referencePath > b.referencePath) {
                    if (a.dateFrom > b.dateFrom) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                if (a.referencePath2 > b.referencePath) {
                    if (a.dateFrom > b.dateFrom) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                if (a.referencePath > b.referencePath2) {
                    if (a.dateFrom > b.dateFrom) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                if (a.referencePath2 > b.referencePath2) {
                    if (a.dateFrom > b.dateFrom) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                return -1;
            });
        }
    }

    return ReferenceList({
        ...props,
        data: {
            collection: filteredCollection,
            showReadMoreLink
        },
        control: {},
        render: {}
    });
}