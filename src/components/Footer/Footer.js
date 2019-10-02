//react
import React from "react";

//react-router
import { Link } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//styles
import commonViewStyles from "./../_common/ViewStyles";

/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses(){
    return {
        ...commonViewStyles(),
        ...(makeStyles(theme => ({
            "@global": {
                "a": {
                    color: theme.palette.common.white,
                }
            },
            footerContainer: {
                marginTop: theme.spacing(3),
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
            },
            footer1: {
                ...theme.typography.h5,
                margin: theme.spacing(0),
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.7)"
            },
            footer2: {
                ...theme.typography.h4,
                marginTop: theme.spacing(0),
                textAlign: "center",
                color: theme.palette.common.white,
            },
            img: {
                width: "100%",
                maxWidth: "48px"
            },
            technologyContainer: {
            },
            technologyHeading: {
                ...theme.typography.h5,
                margin: theme.spacing(0)
            },
            technology: {
                ...theme.typography.h6,
                alignSelf: "center",
                textAlign: "left",
                color: "rgba(255, 255, 255, 0.7)"
            },
            featuresContainer: {
                borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                [theme.breakpoints.down("xs")]: {
                    borderRight: "0",
                }
            },
            featuresHeading: {
                ...theme.typography.h6,
                margin: theme.spacing(0)
            },
            features: {
                ...theme.typography.body1,
                alignSelf: "top",
                textAlign: "left",
                color: "rgba(255, 255, 255, 0.7)"
            },
            readMore: {
                listStyle: "none",
                "& a": {
                    ...theme.typography.h6,
                    color: theme.palette.common.white,
                }
            },
            copyright: {
                ...theme.typography.body2,
                marginTop: theme.spacing(3),
                color: theme.palette.common.white,
            },
        })))()
    };
}

//presentation
/**
 * (Presentation Component) Displays Footer Block
 * @param data
 * @param control
 * @param render
 * @param props - props extra
 * @return JSX component
 */
const Footer = ({ data, control, render, ...props }) => {
    const classes = getClasses();
    return <>
        <Paper className={classes.container + " " + classes.footerContainer} id="Footer">
            <header>
                <h4 className={classes.footer1}><b>Online Résumé System</b> developed by</h4>
                <h3 className={classes.footer2}>Magnus Esterhuizen</h3>
            </header>
            <Grid container component="section" direction="row" alignContent="center" alignItems="flex-start" spacing={2} style={{ textAlign: "center" }}>
                <Grid item xs={12} sm={6} className={classes.featuresContainer}>
                    <h5 className={classes.featuresHeading}>System Features</h5>
                    <ul className={classes.features}>
                        <li>Content Management System</li>
                        <li>User Authentication</li>
                        <li>Browser History on scroll</li>
                        <li>Sticky-slidy Aside</li>
                        <li>Material UI integration</li>
                        <li>React Hooks</li>
                        <li>React Router</li>
                        <li className={classes.readMore}><Link to="/portfolio/Online Résumé System">See more features &raquo;</Link></li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.technologyContainer}>
                    <h5 className={classes.featuresHeading}>Technology used</h5>
                    <Grid container direction="row" component="a" href="https://reactjs.org/" target="_blank">
                        <Grid item xs={4}  >
                            <img className={classes.img} src="/assets/footerIcons/react-logo.png" alt="React Logo" />
                        </Grid>
                        <Grid item xs={8} className={classes.technology}>
                            React.js
                        </Grid>
                    </Grid>
                    <Grid container direction="row" component="a" href="https://firebase.google.com/" target="_blank">
                        <Grid item xs={4}  >
                            <img className={classes.img} src="/assets/footerIcons/firebase-logo.png" alt="Firebase Logo" />
                        </Grid>
                        <Grid item xs={8} className={classes.technology}>
                            Firebase
                        </Grid>
                    </Grid>
                    <Grid container direction="row" component="a" href="https://material-ui.com/" target="_blank">
                        <Grid item xs={4}  >
                            <img className={classes.img} src="/assets/footerIcons/material-ui-logo.png" alt="Material-UI Logo" />
                        </Grid>
                        <Grid item xs={8} className={classes.technology}>
                            Material-UI
                        </Grid>
                    </Grid>
                    <Grid container direction="row" component="a" href="https://nodejs.org/" target="_blank">
                        <Grid item xs={4}  >
                            <img className={classes.img} src="/assets/footerIcons/node-logo.png" alt="Node Logo" />
                        </Grid>
                        <Grid item xs={8} className={classes.technology}>
                            Node.js
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <center className={classes.copyright}>
                Copyright &copy; Magnus Esterhuizen {new Date().getFullYear()}
            </center>
        </Paper >
    </>
}

//container
/**
 * (Container Component) Displays Footer Block
 * @param props - props extra
 * @return JSX component
 */
export default (props) => {
    return Footer({
        ...props,
        data: {},
        control: {},
        render: {}
    });
}