//react
import React, { useContext, useEffect } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

//context
import EducationContext from "./EducationContext";

//components
import EducationView from "./EducationView";

//elements
import SpinnerLoader from "./../../elements/SpinnerLoader/SpinnerLoader";

//styles
import commonListStyles from "./../_common/ListStyles";

/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses(){
    return {
        ...commonListStyles(),
        ...(makeStyles(theme => ({})))()
    };
}

//presentation
/**
 * (Presentation Component) Displays list of Education information
 * @param data  - data objects
 * - data[collection] - current components collection of documents
 * - data[template] - current components template
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const EducationList = ({ data, control, render, ...props }) => {
    const { collection, template } = data;

    const classes = getClasses();
    if (collection) {
        return collection.map((document, index) =>
            <div key={index} id="EducationList">
                <EducationView
                    documentId={document.id}
                    template={template}
                />
                <Divider id="dividerEducationList" className={classes.divider} />
            </div>
        );
    }
    else {
        return <SpinnerLoader />
    }
}

//container
/**
 * (Container Component) Displays list of Education information
 * @param template - list | view | edit
 * @param props - props extra
 * @return JSX component
 */
export default ({ template, ...props }) => {
    const { collection } = useContext(EducationContext);

    return EducationList({
        ...props,
        data: {
            collection,
            template
        },
        control: {},
        render: {}
    });
}