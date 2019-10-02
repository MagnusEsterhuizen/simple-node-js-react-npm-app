//react
import React, { useEffect } from "react";

//react-router
import { withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

//context
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import RequestContext from "./RequestContext";

//elements
import LabelEdit from "./../../elements/LabelEdit/LabelEdit";
import DialogButton from "./../../elements/DialogButton/DialogButton";
import PaperCard from "./../../elements/PaperCard/PaperCard";

//styles
import commonViewStyles from "./../_common/ViewStyles";

/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...commonViewStyles(),
        ...(makeStyles(theme => ({
            "@global": {
                body: {
                    backgroundColor: theme.palette.common.white,
                },
                ".MuiFormLabel-root": {
                    backgroundColor: "#ffffff",
                    padding: 2
                }
            },
            container: {
                padding: theme.spacing(3),
                maxWidth: 400,
                width: "100%"
            },
            paper: {
                marginTop: theme.spacing(0),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: theme.palette.text.secondary,
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.primary.main,
            },
            form: {
                width: "100%", // Fix IE 11 issue.
                marginTop: theme.spacing(3),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
            fixPaddingTopBottom: {
                paddingTop: "0rem!important",
                paddingBottom: "0rem!important"
            },
            container: {
                padding: theme.spacing(3),
                color: theme.palette.text.secondary,
                "& a": {
                    textDecoration: "none"
                },
                textAlign: "center"
            },
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays Request Account input form
 * @param data  - data objects
 * - data[document] - current components doucment data
 * - data[isPaper] - inludes box shadow to component container
 * @param control - control functions
 * - control[handleLiftState] - lift component state to document state
 * - control[handleRequest] - save request function
 * - control[handleOkay] - close dialog function
 * - control[handleSignIn] - navigate to SingIn function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const Request = ({ data, control, render, ...props }) => {
    const { document, isPaper } = data;
    const { handleLiftState, handleRequest, handleOkay, handleSignIn } = control;

    const classes = getClasses();
    return <>
        <PaperCard component="div" isPaper={isPaper} className={isPaper ? classes.container : ""} id="Request">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {isPaper
                        ? <Avatar className={classes.avatar}>
                            <i className="material-icons">assignment_ind</i>
                        </Avatar>
                        : <></>
                    }
                    <Typography component="h1" variant="h5">
                        Request an Account
                    </Typography>
                    <Typography component="h2" variant="body1" style={{ fontSize: "13px" }}>
                        <center>
                            {isPaper
                                ? "You need a viewing account to view my complete profile. Recruitment Agents are welcome too, please indicate so below."
                                : " "
                            }
                        </center>
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} className={classes.fixPaddingTopBottom}>
                                <LabelEdit
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstname"
                                    name="firstname"
                                    label="First Name"
                                    autoComplete="firstname"
                                    autoFocus
                                    value={document.firstname}
                                    liftState={handleLiftState}
                                    isEdit={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.fixPaddingTopBottom}>
                                <LabelEdit
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    name="lastname"
                                    label="Last Name"
                                    autoComplete="lastname"
                                    value={document.lastname}
                                    liftState={handleLiftState}
                                    isEdit={true}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.fixPaddingTopBottom}>
                                <LabelEdit
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="company"
                                    name="company"
                                    label="Company Name"
                                    autoComplete="company"
                                    value={document.company}
                                    liftState={handleLiftState}
                                    isEdit={true}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.fixPaddingTopBottom}>
                                <LabelEdit
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={document.email}
                                    liftState={handleLiftState}
                                    isEdit={true}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.fixPaddingTopBottom}>
                                <LabelEdit
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="Phone Number"
                                    autoComplete="phone"
                                    value={document.phone}
                                    liftState={handleLiftState}
                                    isEdit={true}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.fixPaddingTopBottom}>
                                <FormControlLabel
                                    control={<Checkbox value="recruitmentAgent" color="primary" checked={document.recruiter} />}
                                    label={<span>Please check this box if you <br /> are a Recruitment Agent.</span>}
                                />
                            </Grid>
                        </Grid>
                        <DialogButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            title="Request Sent"
                            subTitle="Thank you for your interest. I will get in touch with you shortly!"
                            onClick={handleRequest}
                            handleOkay={handleOkay}
                        >Send Request</DialogButton>

                        {isPaper
                            ? <center>
                                <Link style={{ cursor: "pointer" }} onClick={handleSignIn} variant="body2">
                                    Already have a viewing account? Sign in
                                </Link>
                            </center>
                            : <></>
                        }
                    </form>
                </div>
            </Container>
        </PaperCard>
    </>
}

//container
/**
 * (Container Component) Displays Request Account input form
 * @param history - navigation history
 * @param location - current navigation path
 * @param isPaper - inludes box shadow to component container
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ history, location, isPaper, ...props }) => {
    const { document, setDocument, saveDocument } = useDocumentState(RequestContext, "id", "", {});

    function handleLiftState(event) {
        setDocument(event);
    }

    function handleRequest(event) {
        event.preventDefault();
        saveDocument(document);
    }

    function handleOkay(event) {
        setDocument({
            firstname: "",
            lastname: "",
            company: "",
            email: "",
            phone: ""
        });
        history.push("/");
    }

    function handleSignIn() {
        history.push("/signin")
    }

    //scroll to top when displaying component on its own (isPaper = true)
    useEffect(() => {
        if (isPaper) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return Request({
        ...props,
        data: {
            document,
            isPaper
        },
        control: {
            handleLiftState,
            handleRequest,
            handleOkay,
            handleSignIn
        },
        render: {}
    });
});