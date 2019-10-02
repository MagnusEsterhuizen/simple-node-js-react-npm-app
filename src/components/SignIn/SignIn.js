//react
import React, { useState, useContext, useEffect } from "react";

//react-router
import { withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//elements
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
            },
            paper: {
                //marginTop: theme.spacing(2),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: theme.palette.text.secondary,
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: "100%", // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays Singin input form
 * @param data  - data objects
 * - data[email] - state parameter for email
 * - data[password] - state parameter for email
 * - data[isPaper] - inludes box shadow to component container
 * - data[dialogOpen] - state parameter for failed dialog open
 * - data[title] - state parameter for failed dialog title
 * - data[subTitle] - state parameter for failed dialog subtitle
 * - data[text] - state parameter for failed dialog text
 * @param control - control functions
 * - control[handleEmailChange] - email state change function
 * - control[handlePasswordChange] - password state change function
 * - control[handleLoginClick] - login function
 * - control[handleDialogClose] - dialog close function
 * - control[handleRequestClick] - navigate to Request function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const SignIn = ({ data, control, render, ...props }) => {
    const { email, password, isPaper, dialogOpen, title, subTitle, text } = data;
    const { handleEmailChange, handlePasswordChange, handleLoginClick, handleDialogClose, handleRequestClick } = control;

    const classes = getClasses();
    return <>
        <PaperCard component="div" isPaper={isPaper} className={isPaper ? classes.container : ""} id="SignIn">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {isPaper
                        ? <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        : <></>
                    }
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Typography component="h2" variant="body1" style={{ fontSize: "13px" }}>
                        <center>
                            {isPaper
                                ? "You need a viewing account to view my complete profile."
                                : " "
                            }
                        </center>
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLoginClick}
                        >
                            Sign In
                        </Button>
                        {isPaper
                            ? <center>
                                <Link style={{ cursor: "pointer" }} onClick={handleRequestClick} variant="body2">
                                    Don't have a viewing account? Request one
                            </Link>
                            </center>
                            : <></>
                        }
                    </form>
                </div>
            </Container>
        </PaperCard>
        <Dialog
            open={dialogOpen || false}
            onClose={handleDialogClose}
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
                <Button onClick={handleDialogClose} color="primary">
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

//container
/**
 * (Container Component) Displays Singin input form
 * @param history - navigation history
 * @param match - current navigation match
 * @param location - current navigation path
 * @param isPaper - inludes box shadow to component container
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ history, match, location, isPaper, ...props }) => {
    const { doLogin } = useContext(AuthorizeContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [text, setText] = useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleLoginClick(event) {
        event.preventDefault();
        const onSuccess = () => console.log("success");
        const onFail = (message) => {
            console.log("onfail", message)
            setTitle("Error");
            setSubTitle("Could not Sign-in");
            setText(message);
            setDialogOpen(true);
        }
        doLogin(email, password, onSuccess, onFail);
    }

    function handleDialogClose() {
        setDialogOpen(false);
    }

    function handleRequestClick() {
        history.push("/request")
    }

    //scroll to top when displaying component on its own (isPaper = true)
    useEffect(() => {
        if (isPaper) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    //single sign on
    useEffect(() => {
        if (match.params.authString) {
            let authString = "";

            //postfix will be added to base64 encoded string and replace the ",=,==" sybmols
            function getAuthString(string) {
                if (string.match(/Aze4aG$/)) {
                    //none
                    authString = atob(string.replace(/Aze4aG$/, ""));
                }
                else if (string.match(/Vc5P7K$/)) {
                    //=
                    authString = atob(string.replace(/Vc5P7K$/, "="));
                }
                else if (string.match(/B2y99o$/)) {
                    //==
                    authString = atob(string.replace(/B2y99o$/, "=="));
                }
                return authString;
            }

            try {
                const authString = getAuthString(match.params.authString);
                const ssoEmail = /un\:(.*?)&/.exec(authString)[1];
                const ssoPassword = /pw\:(.*?)$/.exec(authString)[1];

                const onSuccess = () => console.log("success");
                const onFail = (message) => {
                    console.log("onfail", message)
                    setTitle("Error");
                    setSubTitle("Could not Sign-in");
                    setText(message);
                    setDialogOpen(true);
                }
                doLogin(ssoEmail, ssoPassword, onSuccess, onFail);
            }
            catch (err) {
                console.log("error: " + err)
            }
        }
    }, [location.pathname]);

    return SignIn({
        ...props,
        data: {
            email,
            password,
            isPaper,
            dialogOpen,
            title,
            subTitle,
            text
        },
        control: {
            handleEmailChange,
            handlePasswordChange,
            handleLoginClick,
            handleRequestClick,
            handleDialogClose
        },
        render: {}
    });
});