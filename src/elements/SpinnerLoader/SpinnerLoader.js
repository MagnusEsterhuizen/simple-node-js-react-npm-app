//react
import React from "react";

//presentation
/**
 * (Presentation Component) Displays a spinner image while data is loading
 * @param data  - data objects
 * - data[filePath] - image url
 * - data[width] - image withd
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const SpinnerLoader = ({ data, control, render, ...props }) => {
    const { filePath, width } = data;
    return <>
        <div style={{ width: "100%", textAlign: "center" }}>
            <img src={filePath} style={{ width }} />
        </div>
    </>
}

//container
/**
 * (Container Component) Displays a spinner image while data is loading
 * @return JSX component
 */
export default () => {
    return SpinnerLoader({
        data: {
            filePath: "/assets/spinner/spinner.gif",
            width: 32
        },
        control: {},
        render: {}
    });
}