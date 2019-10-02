//react
import React, { useState } from "react";

//material-ui
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

//color picker
import MaterialColorPicker from "react-material-color-picker";

//context
import { useFieldState } from "./../../context/CollectionContext/CollectionContext";

//lightOrDark
/**
 * (User Function) Displays dialog allowing color picking
 * @param bgColor  - data objects
 * @param lightColor - render components
 * @param darkColor - props extra
 * @return color
 */
export const lightOrDark = (bgColor = "#123132", lightColor = "#ffffff", darkColor = "#000000") => {
    const color = (bgColor.charAt(0) === "#") ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? darkColor : lightColor;
}

//presentation
/**
 * (Presentation Component) Displays image with title & description
 * @param data  - data objects
 * - data[id] - element id
 * - data[value] - element value
 * @param control - control functions
 * - control[handleSubmit] - color submit function
 * - control[handleReset] - cancel option funciton
 * - control[handleClick] - open dialog function
 * - control[handleClose] - close dialog function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const ColorPicker = ({ data, control, render, ...props }) => {
    const { id, value, isOpen } = data;
    const { handleSubmit, handleReset, handleClick, handleClose } = control;

    return <>
        <Button
            {...props}
            id={id}
            onClick={handleClick}
            style={{
                color: lightOrDark(value || ""),
                backgroundColor: value || ""
            }}
        >
            {value || ""}
        </Button>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isOpen}
            onClose={handleClose}
        >
            <center style={{ marginTop: "10%" }}>
                <MaterialColorPicker
                    id={id}
                    initColor={value || ""}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    style={{ width: 400, backgroundColor: "#c7c7c7" }}
                    submitLabel="Apply"
                    resetLabel="Undo"
                />
            </center>
        </Modal>
    </>
}

//container
/**
 * (Container Component) Displays dialog allowing color picking
 * @param id - element id
 * @param value - element value
 * @param liftState - document lift state
 * @param onChange - element change function
 * @param props - props extra
 * @return JSX component
 */
export default ({ id, value, liftState, onChange, ...props }) => {
    const { field, handleFieldChange } = useFieldState(id, value, liftState);
    const [isOpen, setIsOpen] = useState(false);

    function handleSubmit(event) {
        handleFieldChange(event);
        setIsOpen(!isOpen);
        if (onChange) {
            onChange(event);
        }
    }

    function handleReset(event) {
        handleFieldChange(event);
        setIsOpen(!isOpen);
        if (onChange) {
            onChange(event);
        }
    }

    function handleClick() {
        setIsOpen(!isOpen);
    }

    function handleClose() {
        setIsOpen(!isOpen);
    }

    return ColorPicker({
        ...props,
        data: {
            id,
            value: field[id],
            isOpen
        },
        control: {
            handleSubmit,
            handleReset,
            handleClick,
            handleClose
        },
        render: {}
    });
}
