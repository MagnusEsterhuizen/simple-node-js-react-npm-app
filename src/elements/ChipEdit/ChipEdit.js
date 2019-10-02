//react
import React, { useContext } from "react";

//material-ui
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";

//elements
import ColorPicker, { lightOrDark } from "./../../elements/ColorPicker/ColorPicker";

//context
import { useFieldState } from "./../../context/CollectionContext/CollectionContext";
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//presentation
/**
 * (Presentation Component) Displays colored labels with caption
 * @param data  - data objects
 * - data[id] - element id
 * - data[value] - element value
 * - data[label] - element label
 * - data[color] - element color
 * - data[isEdit] - edit mode [true | false]
 * @param control - control functions
 * - control[handleChange] - field change
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const ChipEdit = ({ data, control, render, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { id, value, label, color, isEdit } = data;
    const { handleChange } = control;

    return <>
        {isEdit && authGroup === "admin"
            ? <Box display="flex" alignContent="flex-end" alignItems="flex-end">
                <Box flexGrow={1}>
                    <FormControl fullWidth>
                        <TextField
                            {...props}
                            id={id}
                            label={label}
                            value={value || ""}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </FormControl>
                </Box>
                <Box>
                    <ColorPicker
                        id={id.replace(/^([a-z]+)/i, "$1Color")}
                        value={color || ""}
                        onChange={handleChange}
                    />
                </Box>
            </Box>
            : <Chip
                size="small"
                label={value || ""}
                style={{
                    backgroundColor: color,
                    color: lightOrDark(color),
                    margin: "5px 0 0 10px"
                }}
                component="span"
            />
        }
    </>
}

//container
/**
 * (Container Component) Displays colored labels with caption
 * @param id - element id
 * @param value - element value
 * @param color - element color
 * @param label - element color
 * @param liftState - document lift state
 * @param isEdit - edit mode [true | false]
 * @param props - props extra
 * @return JSX component
 */
export default ({ id, value, color, label, liftState, isEdit, ...props }) => {
    const { field, handleFieldChange } = useFieldState(id, value, liftState);

    function handleChange(event) {
        handleFieldChange(event);
    }

    return ChipEdit({
        ...props,
        data: {
            id,
            value: field[id],
            color,
            label,
            isEdit
        },
        control: {
            handleChange
        },
        render: {}
    });
}