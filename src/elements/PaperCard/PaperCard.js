//react
import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
            gutterContainer: {
                display: "flex",
                paddingTop: theme.spacing(3),
                paddingRight: theme.spacing(3),
                paddingBottom: theme.spacing(3),
                paddingLeft: 0,
                marginBottom: theme.spacing(3),
                [theme.breakpoints.down("xs")]: {
                    marginBottom: theme.spacing(2),
                    paddingLeft: theme.spacing(3),
                    display: "block",
                    "&:first-child": {
                        marginTop: theme.spacing(0)
                    },
                    "&:last-child": {
                        marginBottom: theme.spacing(0)
                    }
                },
                "&:last-child": {
                    marginBottom: theme.spacing(2),
                    marginBottom: 0,
                }
            },
            gutter: {
                width: 80,
                textAlign: "center",
                [theme.breakpoints.down("xs")]: {
                    width: "100%",
                    position: "relative",
                    height: "auto",
                    display: "block"
                },
                flexShrink: 0,
            },
            gutterIcon: {
                marginTop: 3,
                fontSize: "42px!important",
                color: theme.palette.primary.light,
            },
            content: {
                flexGrow: 1
            },
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Display card with image on left side
 * @param data  - data objects
 * - data[isPaper] - box shadow on container
 * - data[isGutter] - creates gutter on left side
 * - data[icon] - gutter icon name
 * @param control - control functions
 * @param render - render components
 * - render[children] - children
 * @param props - props extra
 * @return JSX component
 */
export const PaperCard = ({ data, control, render, ...props }) => {
    const { isPaper, isGutter, icon } = data;
    const { children } = render;

    const classes = getClasses();
    return <>
        {isPaper
            ? isGutter
                ? <Paper component="article" id="employment" className={classes.gutterContainer} {...props}>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>{icon}</i>
                    </div>
                    <div className={classes.content}>
                        {children}
                    </div>
                </Paper>
                : <Paper {...props}>
                    {children}
                </Paper>
            : <article {...props}>
                {children}
            </article>
        }
    </>
}

//container
/**
 * (Container Component) Display card that can have a gutter and icon
 * @param children - children
 * @param isPaper - box shaddow on container
 * @param isGutter - creates gutter on left side
 * @param icon - gutter icon name
 * @param props - props extra
 * @return JSX component
 */
export default ({ children, isPaper, isGutter, icon, ...props }) => {
    return PaperCard({
        data: {
            isPaper,
            isGutter,
            icon
        },
        control: {},
        render: {
            children
        },
        ...props,
    });
}