//react
import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

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
            iconContainer: {
                backgroundColor: "#ffffff", //#7986cb",
                color: "#7986cb",
                textAlign: "center",
                [theme.breakpoints.down("xs")]: {
                    textAlign: "left"
                }
            },
            iconCard: {
                [theme.breakpoints.down("xs")]: {
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "stretch"
                },
            },
            dialogImage: {
                width: "auto",
                [theme.breakpoints.down("xs")]: {
                    width: "100%",
                    height: "auto",
                    marginBottom: theme.spacing(2)
                },
            },
            paperContainer: {
                position: "relative",
                transform: "rotate(0deg)"
            },
            iconPosition: {
                top: "22px",
                position: "relative",
                left: "11px"
            },
            references: {
                ...theme.typography.h4,
                color: "#7986cb",
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Allows files to be uploaded to firebase store
 * @param data  - data objects
 * - data[icon] - icon name
 * @param control - control functions
 * @param render - render components
 * - render[children] - children
 * @param props - props extra
 * @return JSX component
 */
export const IconCard = ({ data, control, render, ...props }) => {
    const { icon } = data;
    const { children } = render;

    const classes = getClasses();
    return <>
        <Paper>
            <Grid container spacing={0} alignContent="flex-start" alignItems="stretch" className={classes.iconCard} direction="row" wrap="nowrap">
                <Grid item className={classes.iconContainer} >
                    <i className={"material-icons " + classes.iconPosition} style={{ fontSize: 58 }}>{icon}</i>
                    <Hidden smUp>
                        <span className={classes.references}>Reference</span>
                    </Hidden>
                </Grid>
                <Grid item style={{ width: "100%" }} className={classes.container}>
                    {children}
                </Grid>
            </Grid>
        </Paper>
    </>
}

//container
/**
 * (Container Component) Display card with icon on left side
 * @param icon - icon name
 * @param children - children
 * @param props - props extra
 * @return JSX component
 */
export default ({ icon, children, ...props }) => {
    return IconCard({
        data: {
            icon
        },
        control: {},
        render: {
            children
        },
        ...props,
    });
}