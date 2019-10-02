//react
import React, { useContext } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

//context
import BiographyContext from "./BiographyContext";

//components
import BiographyView from "./BiographyView";

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
 * (Presentation Component) Displays Biographical information
 * @param data  - data objects
 * - data[collection] - current components collection of documents
 * - data[template] - current components template
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const BiographyList = ({ data, control, render, ...props }) => {
    const { collection, template } = data;

    const classes = getClasses();
	if (collection) {
        return collection.map((document, index) =>
            <div key={index} id="BiographyList">
                <BiographyView
                    documentId={document.id}
                    template={template}
                />
                {index < collection.length - 1
                    ? <Divider className={classes.divider} />
                    : <></>
                }
            </div>
        );
    }
    else {
        return <SpinnerLoader />
    }
}

//container
/**
 * (Container Component) Displays Biographical information
 * @param template - list | view | edit
 * @param props - props extra
 * @return JSX component
 */
export default ({ template, ...props }) => {
    const { collection } = useContext(BiographyContext);

    return BiographyList({
        ...props,
        data: {
            collection,
            template
        },
        control: {},
        render: {}
    });
}