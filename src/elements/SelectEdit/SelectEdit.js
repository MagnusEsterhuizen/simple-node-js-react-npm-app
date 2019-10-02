//react
import React, { useContext } from "react";

//material-ui
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

//context
import { useFieldState } from "./../../context/CollectionContext/CollectionContext";
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//presentation
/**
 * (Presentation Component) Displays a label when not in edit mode. Displays a select input when in edit mode
 * @param data  - data objects
 * - data[id] - element id
 * - data[value] - element value
 * - data[isEdit] - edit mode [true | false]
 * - data[items] - object with values
 * @param control - control functions
 * - control[handleChange] - field change
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const SelectEdit = ({ data, control, render, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { id, value, isEdit, items } = data;
    const { handleChange } = control;
    
    return <>
        {isEdit && authGroup === "admin"
            ? <FormControl fullWidth>
                <InputLabel htmlFor={id}>{id}</InputLabel>
                <Select
                    {...props}
                    value={value || ""}
                    onChange={(event) => handleChange({
                        target: {
                            id: event.target.name,
                            value: event.target.value
                        }
                    })}
                    inputProps={{
                        name: `${id}`,
                        id
                    }}
                >
                    {items.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
            : <>{value}</>
        }
    </>
}

//container
/**
 * (Container Component) Displays a label when not in edit mode. Displays a select input when in edit mode
 * @param id - element id
 * @param value - element value
 * @param liftState - document lift state
 * @param isEdit - edit mode [true | false]
 * @param items - object with values
 * @param props - props extra
 * @return JSX component
 */
export default ({ id, value, liftState, isEdit, items, ...props }) => {
    const { field, handleFieldChange } = useFieldState(id, value, liftState);

    function handleChange(event) {
        handleFieldChange(event);
    }

    return SelectEdit({
        ...props,
        data: {
            id,
            value: field[id],
            isEdit,
            items
        },
        control: {
            handleChange
        },
        render: {},
    });
}