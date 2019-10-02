//react
import React, { useState } from "react";

//material-ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//presentation
/**
 * (Presentation Component) Displays dialog with title and text
 * @param data  - data objects
 * - data[title] - dialog title
 * - data[subTitle] - dialog subTitle
 * - data[text] - dialog text
 * - data[dialogOpen] - dialog open state
 * @param control - control functions
 * - control[handleOpen] - dialog open function
 * - control[handleClose] - dialog close function
 * - control[handleOkay] - dialog okay function
 * - control[handleCancel] - dialog cancel function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const DialogButton = ({ data, control, render, ...props }) => {
    const { title, subTitle, text, dialogOpen } = data;
    const { handleOpen, handleClose, handleOkay, handleCancel } = control;
    const { children } = render;

    return <>
        <Button
            {...props}
            onClick={handleOpen}
        >
            {children}
        </Button>
        <Dialog
            open={dialogOpen || false}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <strong>{subTitle}</strong>
                </DialogContentText>
                {text
                    ? <DialogContentText>{text}</DialogContentText>
                    : <></>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOkay} color="primary">
                    Okay
                </Button>
                {handleCancel
                    ? <Button onClick={handleCancel} color="primary" autoFocus>Cancel</Button>
                    : <></>
                }
            </DialogActions>
        </Dialog>
    </>
}

//container
/**
 * (Container Component) Displays dialog with title and text
 * @param title - dialog title
 * @param subTitle - dialog subTitle
 * @param text - dialog text
 * @param children - children
 * @param handleOkay - okay button function
 * @param handleCancel - cancel button function
 * @param props - props extra
 * @return JSX component
 */
export default ({ title, subTitle, text, children, handleOkay: props_handleOkay, handleCancel: props_handleCancel, ...props }) => {
    const [dialogOpen, setDialogOpen] = useState();

    function handleOpen(event) {
        event.preventDefault();
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
    }

    function handleOkay(event) {
        if (props_handleOkay) {
            props_handleOkay(event);
        }
        handleClose();
    }

    function handleCancel(event) {
        if (props_handleCancel) {
            props_handleCancel(event);
        }
        handleClose();
    }

    return DialogButton({
        ...props,
        data: {
            title,
            subTitle,
            text,
            dialogOpen
        },
        control: {
            handleOpen,
            handleClose,
            handleOkay,
            handleCancel: props_handleCancel ? handleCancel : false
        },
        render: {
            children
        }
    });
}