//react
import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import BiographyContext from "./../../components/Biography/BiographyContext";

//styles
/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...(makeStyles(theme => ({
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
                "& a": {
                    textDecoration: "none",
                    color: "#ffffff"
                },
            },
            menuButton: {
            },
            title: {
                flexGrow: 1,
            },
            hideSmall: {
                color: "rgba(255, 255, 255, 0.7)",
                [theme.breakpoints.down(360)]: {
                    display: "none"
                }
            },
            listAnchor: {
                textDecoration: "none",
                color: theme.palette.text.primary,
            },
            list: {
                width: 250,
            },
            active: {
                color: theme.palette.primary.light,
                "& i": {
                    color: theme.palette.primary.light,
                },
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays Navigation Menu and Page Heading
 * @param data  - data objects
 * - data[document] - current components doucment data
 * - data[authGroup] - authorized user group
 * - data[drawerOpen] - state attribute for opening menu
 * - data[pageTitle] - current page title
 * - data[personal] - personal information data object
 * - data[professional] - personal information data object
 * - data[credentials] - contact information data object
 * - data[social] - social information data object
 * @param control - control functions
 * - control[handleLogout] - logout function
 * - control[handleSignIn] - login function
 * - control[handleDrawerOpen] - open nav menu function
 * - control[handleDrawerClose] - close nav menu function
 * - control[handleNavigate] - navigation function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
const NavBar = ({ data, control, render, ...props }) => {
    const { document, authGroup, drawerOpen, pageTitle, personal, professional, social, credentials } = data;
    const { handleLogout, handleSignIn, handleDrawerOpen, handleDrawerClose, handleNavigate } = control;

    const classes = getClasses();
    return <>
        <AppBar position="fixed" className={classes.appBar} id="NavBar">
            <Toolbar>
                <Typography className={classes.title} noWrap>
                    <Typography variant="h6" component="span" noWrap>
                        <Link to={"/"}>
                            {document.firstname} <Hidden xsDown>{document.secondname ? document.secondname : ""}</Hidden> {document.lastname}
                        </Link>
                    </Typography>
                    <Typography variant="body1" component="span" noWrap className={classes.hideSmall}>
                        &nbsp; - {pageTitle}
                    </Typography>
                </Typography>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={handleDrawerClose}
                        onKeyDown={handleDrawerClose}
                    >
                        <List>
                            {personal.map((link, index) => (
                                <NavLink key={index} exact className={classes.listAnchor} activeClassName={classes.active} to={link.to}>
                                    <ListItem button onClick={() => handleNavigate(link)}>
                                        <ListItemIcon><i className="material-icons">{link.icon}</i></ListItemIcon>
                                        <ListItemText primary={link.text} />
                                    </ListItem>
                                </NavLink>
                            ))}
                        </List>
                        {professional.length > 0
                            ? <>
                                <Divider />
                                <List>
                                    {professional.map((link, index) => (
                                        <NavLink key={index} exact className={classes.listAnchor} activeClassName={classes.active} to={link.to}>
                                            <ListItem button onClick={() => handleNavigate(link)}>
                                                <ListItemIcon><i className="material-icons">{link.icon}</i></ListItemIcon>
                                                <ListItemText primary={link.text} />
                                            </ListItem>
                                        </NavLink>
                                    ))}
                                </List>
                            </>
                            : <></>
                        }
                        {social.length > 0
                            ? <>
                                <Divider />
                                <List>
                                    {social.map((link, index) => (
                                        <NavLink key={index} exact className={classes.listAnchor} activeClassName={classes.active} to={link.to}>
                                            <ListItem button onClick={() => handleNavigate(link)}>
                                                <ListItemIcon><i className="material-icons">{link.icon}</i></ListItemIcon>
                                                <ListItemText primary={link.text} />
                                            </ListItem>
                                        </NavLink>
                                    ))}
                                </List>
                            </>
                            : <></>
                        }
                        {credentials.length > 0
                            ? <>
                                <Divider />
                                <List>
                                    {credentials.map((link, index) => (
                                        <NavLink key={index} exact className={classes.listAnchor} activeClassName={classes.active} to={link.to}>
                                            <ListItem button onClick={() => handleNavigate(link)}>
                                                <ListItemIcon><i className="material-icons" style={link.icon === "post_add" ? { transform: "rotate(180deg)" } : {}}>{link.icon}</i></ListItemIcon>
                                                <ListItemText primary={link.text} />
                                            </ListItem>
                                        </NavLink>
                                    ))}
                                </List>
                            </>
                            : <></>
                        }
                        {authGroup !== "guest"
                            ? <>
                                <Divider />
                                <List>
                                    <ListItem button onClick={handleLogout}>
                                        <ListItemIcon><i className="material-icons">logout</i></ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </List>
                            </>
                            : <>
                                <Divider />
                                <List>
                                    <ListItem button onClick={handleSignIn}>
                                        <ListItemIcon><i className="material-icons">account_circle</i></ListItemIcon>
                                        <ListItemText primary="Sign In" />
                                    </ListItem>
                                </List>
                            </>
                        }
                    </div>
                </Drawer>
            </Toolbar>
        </AppBar >
    </>
}

//container
/**
 * (Container Component) Displays Navigation Menu and Page Heading
 * @param history - navigation history
 * @param location - current navigation path
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ history, location, ...props }) => {
    const { authGroup, doLogout } = useContext(AuthorizeContext);
    const { document } = useDocumentState(BiographyContext, "id", props.documentId, {});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("Curriculum Vitae");

    const personal = [
        { text: "Home", to: "/", icon: "home" },
        { text: "Cover Letter", to: "/coverletter", icon: "description" },
        { text: "Biography", to: "/biography", icon: "person" }
    ];

    const professional = [
        { text: "Employment", to: "/employment", icon: "work" },
        { text: "Education", to: "/education", icon: "school" },
        { text: "Portfolio", to: "/portfolio", icon: "dashboard" }
    ];

    const social = [
        //{ text: "Pet Projects", to: "/projects", icon: "code" },
        { text: "Hobbies", to: "/hobbies", icon: "golf_course" }
    ];

    const credentials = [
        { text: "Diplomas", to: "/diplomas", icon: "post_add" },
        { text: "References", to: "/references", icon: "contact_phone" }
    ];


    function handleDrawerOpen() {
        setDrawerOpen(true);
    };

    function handleDrawerClose() {
        setDrawerOpen(false);
    };

    function handleNavigate(link) {
        if (link.text === "Home") {
            link.text = "Curriculum Vitae";
        }
    };

    function handleLogout() {
        doLogout();
    }

    function handleSignIn() {
        history.push("/signin");
    }

    //give Dom access to setPageTitle
    useEffect(() => {
        window.setPageTitle = setPageTitle;
    }, []);

    return NavBar({
        ...props,
        data: {
            document,
            authGroup,
            drawerOpen,
            pageTitle,
            personal,
            professional,
            credentials,
            social
        },
        control: {
            handleLogout,
            handleSignIn,
            handleDrawerOpen,
            handleDrawerClose,
            handleNavigate
        },
        render: {}
    });
});