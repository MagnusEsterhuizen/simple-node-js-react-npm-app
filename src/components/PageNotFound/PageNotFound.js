//react
import React, { useEffect } from "react";

//helpers
import consumeMETA from "./../../helpers/consumeMETA/consumeMETA";

//presentation
/**
 * (Presentation Component) Page not found
 * @param data - data objects
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const PageNotFound = ({ data, control, render, ...props }) => {
    return <>
        <article id="PageNotFound" className="card">
            404 - Page not found
        </article>
    </>
}

//container
/**
 * (Container Component) Page not found
 * @param props - props extra
 * @return JSX component
 */
export default (props) => {

    //updates page title
    useEffect(() => {
		consumeMETA({
			title: "404 Page not found"
		});
    });

    return PageNotFound({
        ...props,
        data: {},
        control: {},
        render: {}
    });
}