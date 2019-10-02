//react
import React, { useContext } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";

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
            sliderContainer: {
                position: "relative",
                width: "100%",
                height: 12,
                //borderWidth: 1,
                borderWidth: 0,
                borderRadius: 5,
                borderStyle: "solid",
                borderColor: "#c5cae9", //indigo[100]
                backgroundColor: "transparent" //indigo[50]
                //backgroundColor: "#e8eaf6" //indigo[50]
            },
            slider: {
                position: "relative",
                width: 0,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#7986cb" //indigo[300]
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays a bar chart when not in edit mode. Displays a slider input when in edit mode
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
export const SliderEdit = ({ data, control, render, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { id, value, isEdit } = data;
    const { handleChange } = control;

    const classes = getClasses();
    return <>
        {isEdit && authGroup === "admin"
            ? <FormControl fullWidth>
                <Slider
                    {...props}
                    id={id}
                    step={5}
                    value={value || 0}
                    onChange={handleChange}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="on"
                />
            </FormControl>
            : <div className={classes.sliderContainer}>
                <div className={classes.slider} style={{ width: `${value}%` }}></div>
            </div>
        }
    </>
}

//container
/**
 * (Container Component) Displays a bar chart when not in edit mode. Displays a slider input when in edit mode
 * @param id - element id
 * @param value - element value
 * @param liftState - document lift state
 * @param isEdit - edit mode [true | false]
 * @param props - props extra
 * @return JSX component
 */
export default ({ id, value, liftState, isEdit, ...props }) => {
    const { field, handleFieldChange } = useFieldState(id, value, liftState);

    function handleChange(event, newValue) {
        handleFieldChange({
            target: {
                id,
                value: newValue
            }
        });
    }

    return SliderEdit({
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