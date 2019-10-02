//react
import React, { useContext } from "react";

//material-ui
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

//context
import { useFieldState } from "./../../context/CollectionContext/CollectionContext";
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//presentation
/**
 * (Presentation Component) Displays a label when not in edit mode. Displays a input  when in edit mode
 * @param data  - data objects
 * - data[id] - element id
 * - data[value] - element value
 * - data[isEdit] - edit mode [true | false]
 * @param control - control functions
 * - control[handleChange] - field change
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const LabelEdit = ({ data, control, render, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { id, value, isEdit } = data;
    const { handleChange } = control;
    
    return <>
        {isEdit && (authGroup === "admin" || id === "company" || id === "firstname" || id === "lastname" || id === "email" || id === "phone")
            ? <FormControl fullWidth>
                <TextField
                    {...props}
                    id={id}
                    value={value || ""}
                    onChange={handleChange}
                    margin="normal"
                />
            </FormControl>
            : <>{value}</>
        }
    </>
}

//container
/**
 * (Container Component) Displays a label when not in edit mode. Displays a input  when in edit mode
 * @param id - element id
 * @param value - element value
 * @param liftState - document lift state
 * @param isEdit - edit mode [true | false]
 * @param props - props extra
 * @return JSX component
 */
export default ({ id, value, liftState, isEdit, ...props }) => {
    const { field, handleFieldChange } = useFieldState(id, value, liftState);

    function handleChange(event) {
        handleFieldChange(event);
    }

    return LabelEdit({
        ...props,
        data: {
            id,
            value: field[id],
            isEdit
        },
        control: {
            handleChange
        },
        render: {},
    });
}