//react
import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//elements
import DialogImage from "./../../elements/DialogImage/DialogImage";

//styles
import commonViewStyles from "./../../components/_common/ViewStyles";

/**
 * (Styles & Classes) Display card with icon on left side
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...commonViewStyles(),
        ...(makeStyles(theme => ({
            imageContainer: {
                margin: theme.spacing(0, 2, 0, 0),
                [theme.breakpoints.down(730)]: {
                    margin: theme.spacing(2, 0),
                }
            },
            imageCard: {
                [theme.breakpoints.down(730)]: {
                    flexDirection: "column-reverse",
                    alignContent: "center",
                    alignItems: "center"
                },
            },
            dialogImage: {
                width: "auto",
                [theme.breakpoints.down(730)]: {
                    width: "100%",
                    height: "auto",
                    marginBottom: theme.spacing(2)
                },
            },
            paperContainer: {
                position: "relative",
                transform: "rotate(0deg)"
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Display card with image on left side
 * @param data  - data objects
 * - data[src] - image url
 * - data[component] - component name
 * @param control - control functions
 * @param render - render components
 * - render[children] - children
 * @param props - props extra
 * @return JSX component
 */
export const ImageCard = ({ data, control, render, ...props }) => {
    const { src, component } = data;
    const { children } = render;

    const classes = getClasses();
    return <>
        <Paper component={component} className={classes.paperContainer}>
            <Grid container spacing={0} alignContent="flex-start" alignItems="stretch" className={classes.container + " " + classes.imageCard} direction="row" wrap="nowrap">
                <Grid item className={classes.imageContainer} >
                    <DialogImage src={src} className={classes.dialogImage} style={{ height: 170 }} />
                </Grid>
                <Grid item style={{ width: "100%" }}>
                    {children}
                </Grid>
            </Grid>
        </Paper>
    </>
}

//container
/**
 * (Container Component) Display card with image on left side
 * @param src - image url
 * @param component - component name
 * @param children - children
 * @param props - props extra
 * @return JSX component
 */
export default ({ src, component, children, ...props }) => {
    return ImageCard({
        data: {
            src,
            component
        },
        control: {},
        render: {
            children
        },
        ...props,
    });
}