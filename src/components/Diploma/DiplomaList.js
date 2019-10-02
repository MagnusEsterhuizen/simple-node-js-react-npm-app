//react
import React, { useContext } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";

//context
import EducationContext from "./../../components/Education/EducationContext";

//components
import DiplomaView from "./DiplomaView";

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
        ...(makeStyles(theme => ({})))()
    };
}

//presentation
/**
 * (Presentation Component) Displays list of diplomas
 * @param data  - data objects
 * - data[collection] - current components collection of documents
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const DiplomaList = ({ data, control, render, ...props }) => {
    const { collection } = data;

    const classes = getClasses();
    if (collection) {
        return collection.map((document, index) =>
            <div key={index} id="DiplomaList">
                <DiplomaView
                    documentId={document.id}
                />
            </div>
        );
    }
    else {
        return <SpinnerLoader />
    }
}

//container
/**
 * (Container Component) Displays list of diplomas
 * @param props - props extra
 * @return JSX component
 */
export default (props) => {
    const { collection } = useContext(EducationContext);

    return DiplomaList({
        ...props,
        data: {
            collection
        },
        control: {},
        render: {}
    });
}