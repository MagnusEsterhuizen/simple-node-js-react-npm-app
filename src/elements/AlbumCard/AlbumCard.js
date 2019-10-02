//react
import React, { useState } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

//styles
/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...(makeStyles(theme => ({
            card: {
                height: "100%",
                display: "flex",
                flexDirection: "column",
            },
            cardMedia: {
                paddingTop: "56.25%", // 16:9
                cursor: "pointer"
            },
            cardContent: {
                flexGrow: 1,
            },
            subheading: {
                ...theme.typography.body1,
                ...{
                    color: theme.palette.primary.light,
                    marginTop: 0,
                    marginBottom: 0,
                    fontWeight: 500
                },
            },
            description: {
                ...theme.typography.body2,
                color: theme.palette.text.secondary,
            },
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays image with title & description
 * @param data  - data objects
 * - data[image] - image url path
 * - data[title] - main title
 * - data[description] - image description
 * - data[dialogOpen] - state of image click to view
 * @param control - control functions
 * - control[handleOpen] - open dialog function
 * - control[handleClose] - close dialog function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const AlbumCard = ({ data, control, render, ...props }) => {
    const { image, title, description, dialogOpen } = data;
    const { handleOpen, handleClose } = control;

    const classes = getClasses();
    return <>
        <Grid item xs={6} sm={6}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={title}
                    onClick={handleOpen}
                />
                <CardContent className={classes.cardContent}>
                    <h5 className={classes.subheading}>
                        {title}
                    </h5>
                    {description
                        ? <p className={classes.description}>
                            {description}
                        </p>
                        : <></>
                    }
                </CardContent>
            </Card>
        </Grid>
        <Dialog
            open={dialogOpen || false}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent>
                <img
                    src={image}
                    style={{ width: "100%" }}
                />
            </DialogContent>
        </Dialog>
    </>
}

//container
/**
 * (Container Component) Displays image with title & description
 * @param image - image url path
 * @param title - main title
 * @param description - image description
 * @param props - props extra
 * @return JSX component
 */
export default ({ image, title, description, ...props }) => {
    const [dialogOpen, setDialogOpen] = useState();

    function handleOpen() {
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
    }

    return AlbumCard({
        ...props,
        data: {
            image,
            title,
            description,
            dialogOpen
        },
        control: {
            handleOpen,
            handleClose
        },
        render: {}
    });
}