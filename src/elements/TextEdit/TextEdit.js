//react
import React, { useContext } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

//quill wysiwyg
import ReactQuill from "react-quill-2";
import "react-quill-2/dist/quill.snow.css";

//context
import { useFieldState } from "./../../context/CollectionContext/CollectionContext";
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//styles
/**
 * (Styles & Classes) Display card with icon on left side
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...(makeStyles(theme => ({
            "@global": {
                ".html p": {
                    margin: theme.spacing(0)
                },
                "a": {
                    textDecoration: "underline",
                    color: theme.palette.primary.light
                }
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays a paragraph (text/html) when not in edit mode. Displays a WYSIWYG input when in edit mode
 * @param data  - data objects
 * - data[id] - element id
 * - data[value] - element value
 * - data[isEdit] - edit mode [true | false]
 * - data[isFull] - html [true | false]
 * @param control - control functions
 * - control[handleChange] - field change
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const TextEdit = ({ data, control, render, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { id, value, isEdit, isFull } = data;
    const { handleChange } = control;

    const classes = getClasses();
    return <>
        {isEdit && authGroup === "admin"
            ? <>
                <FormControl fullWidth style={{ marginTop: 40 }}>
                    <div>{id}</div>
                    <ReactQuill
                        value={value || ""}
                        id={id}
                        onChange={(content) => {
                            handleChange({
                                target: {
                                    id,
                                    value: content
                                }
                            })
                        }}
                    />
                </FormControl>
                <br style={{ clear: "both" }} />
                <br />
                <br />
                <br />
            </>
            : !isFull
                ? value
                    ? <>{value.replace(/<[^>]*>?/gm, " ").match(/^.{80}.*?\./) + ".."}</>
                    : <></>
                : <div dangerouslySetInnerHTML={{ __html: value || "" }} className="html"></div>
        }
    </>
}

//container
/**
 * (Container Component) Displays a paragraph (text/html) when not in edit mode. Displays a WYSIWYG input when in edit mode
 * @param id - element id
 * @param value - element value
 * @param liftState - document lift state
 * @param isEdit - edit mode [true | false]
 * @param isFull - html [true | false]
 * @param props - props extra
 * @return JSX component
 */
export default ({ id, value, liftState, isEdit, isFull, ...props }) => {
    const { field, handleFieldChange } = useFieldState(id, value, liftState);

    function handleChange(event) {
        handleFieldChange(event);
    }

    return TextEdit({
        data: {
            id,
            value: field[id],
            isEdit,
            isFull
        },
        control: {
            handleChange
        },
        render: {},
        ...props
    });
}