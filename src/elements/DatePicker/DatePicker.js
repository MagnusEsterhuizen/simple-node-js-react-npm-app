//react
import React, { useContext } from "react";

//material-ui
import FormControl from "@material-ui/core/FormControl";

//date picker
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker as DatePickerMui } from "@material-ui/pickers";

//context
import { useFieldState } from "./../../context/CollectionContext/CollectionContext";
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//fixFirebaseDate
/**
 * (User Function) Fix firebase date to be similar to javascript date object
 * @param date  - date object
 * @return date object
 */
export const fixFirebaseDate = (date) => {
    return !date.seconds
        ? date
        : new Date(date.seconds * 1000);
}

//dayMonthYear
/**
 * (User Function) Get day, month and year from date object
 * @param date  - date object
 * @return day month year
 */
export const dayMonthYear = (date) => {
    date = fixFirebaseDate(date || new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

//monthYear
/**
 * (User Function) Get month and year from date object
 * @param date  - date object
 * @return month year
 */
export const monthYear = (date) => {
    date = fixFirebaseDate(date || new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = date.getFullYear();
    const month = months[date.getMonth()].substr(0, 3);
    return `${month} ${year}`;
}

//yearOnly
/**
 * (User Function) Get year from date object
 * @param date  - date object
 * @return year
 */
export const yearOnly = (date) => {
    date = fixFirebaseDate(date || new Date());
    const year = date.getFullYear();
    return `${year}`;
}

//presentation
/**
 * (Presentation Component) Displays dialog allowing date picking
 * @param data  - data objects
 * - data[id] - element id
 * - data[value] - element value
 * - data[isEdit] - edit mode [true | false]
 * @param control - control functions
 * - control[handleChange] - element change
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const DatePicker = ({ data, control, render, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { id, value, isEdit } = data;
    const { handleChange } = control;

    return <>
        {isEdit && authGroup === "admin"
            ? <FormControl fullWidth>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePickerMui
                        {...props}
                        margin="normal"
                        id={id}
                        value={fixFirebaseDate(value || new Date())}
                        format="YYYY-MM-DD"
                        onChange={({ _d }) => {
                            handleChange({
                                target: {
                                    id,
                                    value: _d
                                }
                            });
                        }}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
            : <>{monthYear(value)}</>
        }
    </>
}

//container
/**
 * (Container Component) Displays dialog allowing date picking
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

    return DatePicker({
        data: {
            id,
            value: field[id],
            isEdit
        },
        control: {
            handleChange
        },
        render: {},
        ...props
    });
}