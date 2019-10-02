//react
import React, { useState } from "react";

//material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

//presentation
/**
 * (Presentation Component) Displays dialog with title and text
 * @param data  - data objects
 * - data[dialogOpen] - dialog open state
 * @param control - control functions
 * - control[handleOpen] - dialog open function
 * - control[handleClose] - dialog close function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const DialogButton = ({ data, control, render, ...props }) => {
    const { dialogOpen } = data;
    const { handleOpen, handleClose } = control;

    return <>
        <img
            {...props}
            onClick={handleOpen}
            style={{ ...props.style, cursor: "pointer" }}
        />
        <Dialog
            open={dialogOpen || false}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent>
                <img
                    {...props}
                    style={{ width: "100%" }}
                />
            </DialogContent>
        </Dialog>
    </>
}

//container
/**
 * (Container Component) Displays thumbnail image that can be clicked on to display bigger image in dialog
 * @param title - dialog title
 * @param subTitle - dialog subTitle
 * @param text - dialog text
 * @param children - children
 * @param handleOkay - okay button function
 * @param handleCancel - cancel button function
 * @param props - props extra
 * @return JSX component
 */
export default (props) => {
    const [dialogOpen, setDialogOpen] = useState();

    function handleOpen() {
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
    }
    
    return DialogButton({
        ...props,
        data: {
            dialogOpen
        },
        control: {
            handleOpen,
            handleClose
        },
        render: {}
    });
}