//react
import React, { useEffect, useContext } from "react";

//react-router
import { withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

//elements
import LabelEdit from "./../../elements/LabelEdit/LabelEdit";
import PaperCard from "./../../elements/PaperCard/PaperCard";
import FileUploader from "./../../elements/FileUploader/FileUploader";
import SliderEdit from "./../../elements/SliderEdit/SliderEdit";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import BiographyContext from "./../../components/Biography/BiographyContext";

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
                ".aside-xs": {
                    display: "block",
                    [theme.breakpoints.down("xs")]: {
                        display: "none!important",
                    }
                }
            },
            coverContainer: {
                position: "relative"
            },
            coverName: {
                ...theme.typography.subtitle1,
                width: "100%",
                textAlign: "center",
                color: theme.palette.common.white,
                fontWeight: "bold",
                fontSize: "1.3rem",
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(0),
            },
            coverTitle: {
                ...theme.typography.subtitle1,
                width: "100%",
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1.0rem",
                marginTop: 0,
                marginBottom: theme.spacing(0),
            },
            email: {
                ...theme.typography.subtitle2,
                marginTop: theme.spacing(2),
                //color: "rgba(255, 255, 255, 0.7)",
                color: theme.palette.common.white,
                "& a": {
                    // color: "rgba(255, 255, 255, 0.7)",
                    color: theme.palette.common.white,
                    textDecoration: "none"
                },
                "&:hover a": {
                    color: theme.palette.common.white
                },
                "&:hover i": {
                    color: theme.palette.common.white
                }
            },
            phone: {
                ...theme.typography.subtitle1,
                marginTop: theme.spacing(2),
                //color: "rgba(255, 255, 255, 0.7)",
                color: theme.palette.common.white,
                "& a": {
                    //color: "rgba(255, 255, 255, 0.7)",
                    color: theme.palette.common.white,
                    textDecoration: "none"
                },
                "&:hover a": {
                    color: theme.palette.common.white
                },
                "&:hover i": {
                    color: theme.palette.common.white
                }
            },
            language: {
                ...theme.typography.subtitle1,
                //color: "rgba(255, 255, 255, 0.7)",
                color: theme.palette.common.white,
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(2),
                "&:hover a": {
                    color: theme.palette.common.white
                }
            },
            experienceContainer: {
                marginTop: theme.spacing(5),
                marginBottom: theme.spacing(4)
            },
            experience: {
                ...theme.typography.subtitle1,
                color: theme.palette.common.white
            },
            footer: {
                width: "100%",
                display: "flex",
                alignItems: "space-between",
                justifyContent: "center"
            },
            social: {
                textAlign: "center",
                flexGrow: 1,
                "& i": {
                    fontSize: 30,
                    color: "rgba(255, 255, 255, 0.7)"
                },
                "&:hover i": {
                    color: theme.palette.common.white
                }
            },
            downloadButton: {
                ...theme.props.MuiButton
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Shows all pages in one scrollable view
 * @param data  - data objects
 * - data[document] - authorized user group
 * - data[isPaper] - inludes box shadow to component container
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const Aside = ({ data, control, render, ...props }) => {
    const { authGroup, document, isPaper } = data;

    const classes = getClasses();
    return <>
        <PaperCard component="article" id="Aside" isPaper={isPaper}>
            <header className={classes.coverContainer}>
                <FileUploader
                    id={`coverImage`}
                    label={`coverImage`}
                    value={document[`coverImage`]}
                    filename={`/${document.id}/coverImage`}
                    maxWidth="100%"
                />
                <h1 className={classes.coverName}>
                    <LabelEdit
                        id="firstname"
                        label="firstname"
                        value={document.firstname}
                    />
                    &nbsp;
                <LabelEdit
                        id="lastname"
                        label="lastname"
                        value={document.lastname}
                    />
                </h1>
                <h2 className={classes.coverTitle}>
                    <LabelEdit
                        id="coverTitle"
                        label="coverTitle"
                        value={document.coverTitle}
                    />
                </h2>
            </header>
            <div className={classes.container}>

                <section>
                    <div>
                        <div className={classes.email}>
                            <span style={{ verticalAlign: "middle" }}>
                                <i className={"material-icons"} style={{ verticalAlign: "middle" }}>email</i>
                                &nbsp;&nbsp;
                            </span>
                            <span style={{ verticalAlign: "middle", position: "relative", }}>
                                <a href={`mailto:${document.email}?subject=Interview request from: &body=Hi ${document.firstname}, we would like to request an interview with you. Regards, `} target="_blank" >
                                    <LabelEdit
                                        id="email"
                                        label="email"
                                        value={document.email}
                                    />
                                </a>
                            </span>
                        </div>
                        <div className={classes.phone}>
                            <span style={{ verticalAlign: "middle" }}>
                                <i className={"material-icons"} style={{ verticalAlign: "middle" }}>phone</i>
                                &nbsp;&nbsp;
                            </span>
                            <span style={{ verticalAlign: "middle" }}>
                                <a href={`tel:${document.phone ? document.phone.replace(/\s/g, "") : ""}`} target="_blank">
                                    <LabelEdit
                                        id="phone"
                                        label="phone"
                                        value={document.phone}
                                    />
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className={classes.languageContainer}>
                        {[...Array(1).keys()].map((index) => {
                            index++;
                            if (document[`language${index}`]) {
                                return <div className={classes.language} key={index}>
                                    <span style={{ verticalAlign: "middle" }}>
                                        <i className={"material-icons"} style={{ verticalAlign: "middle" }}>{index === 1 ? "record_voice_over" : "_"}</i>
                                        &nbsp;&nbsp;
                                    </span>
                                    <span style={{ verticalAlign: "middle" }}>
                                        <LabelEdit
                                            id={`language${index}`}
                                            label={`language${index}`}
                                            value={document[`language${index}`]}
                                        />
                                    </span>
                                </div>
                            }
                        })}
                    </div>
                    {/*<Hidden xsDown>*/}
                        <div className={classes.experienceContainer}>
                            {[...Array(10).keys()].map((index) => {
                                index++;
                                if (document[`experience${index}`]) {
                                    return <div key={index} style={{ marginBottom: 16 }}>
                                        <span className={classes.experience}>
                                            <LabelEdit
                                                id={`experience${index}`}
                                                label={`experience${index}`}
                                                value={document[`experience${index}`]}
                                            />
                                        </span>
                                        <span className={classes.experience}>
                                            <SliderEdit
                                                id={`experienceLevel${index}`}
                                                label={`experienceLevel${index}`}
                                                value={document[`experienceLevel${index}`]}
                                            />
                                        </span>
                                    </div>
                                }
                            })}
                        </div>
                    {/*</Hidden>*/}
                </section>
                <section style={{ textAlign: "center" }}>
                    <div className={classes.phone} style={{ textAlign: "left", marginBottom: 10 }}><strong>DOWNLOAD:</strong></div>
                    {authGroup && authGroup === "viewer" && document.pdfViewer || authGroup === "admin" && document.pdfGuest
                        ? <>
                            <Button href={document.pdfViewer} target="_blank" variant="contained" color="secondary" className={classes.button} style={{ width: 160 }}>
                                Complete CV
                                &nbsp;
                                <i className="fa fa-file-pdf" style={{ fontSize: 20 }}></i>
                            </Button>
                            {document.pdfSummary
                                ? <>
                                    <br />
                                    <br />
                                    <Button href={document.pdfSummary} target="_blank" variant="contained" color="secondary" className={classes.button} style={{ width: 160 }}>
                                        Summary CV
                                        &nbsp;
                                        <i className="fa fa-file-pdf" style={{ fontSize: 20 }}></i>
                                    </Button>
                                </>
                                : <></>
                            }
                        </>
                        : <Button href={document.pdfGuest} target="_blank" variant="contained" color="secondary" className={classes.button}>
                            Summary CV
                            &nbsp;
                            <i className="fa fa-file-pdf" style={{ fontSize: 20 }}></i>
                        </Button>
                    }
                    <br />
                    <br />
                    <br />
                </section>
                <Hidden xsDown>
                    <footer className={classes.footer}>
                        {document.facebook
                            ? <div className={classes.social}>
                                <a href={document.facebook} target="_blank"><i className="fab fa-facebook-f"></i></a>
                            </div>
                            : <></>
                        }
                        {document.linkedin
                            ? <div className={classes.social}>
                                <a href={document.linkedin} target="_blank"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            : <></>
                        }
                        {document.skype
                            ? <div className={classes.social}>
                                <a href={`skype:${document.skype}?chat`} target="_blank"><i className="fab fa-skype"></i></a>
                            </div>
                            : <></>
                        }
                        {document.phone
                            ? <div className={classes.social}>
                                <a href={`https://web.whatsapp.com/send?phone=${document.phone.replace(/\s/g, "")}`} target="_blank"><i className="fab fa-whatsapp"></i></a>
                            </div>
                            : <></>
                        }
                        {document.twitter
                            ? <div className={classes.social}>
                                <a href={document.twitter} target="_blank"><i className="fab fa-twitter"></i></a>
                            </div>
                            : <></>
                        }
                        {document.github
                            ? <div className={classes.social}>
                                <a href={document.github} target="_blank"><i className="fab fa-github"></i></a>
                            </div>
                            : <></>
                        }
                    </footer>
                </Hidden>
            </div>
        </PaperCard >
    </>
}

//container
/**
 * (Container Component) Aside panel for displaying information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param location - current navigation pathtitle
 * @param isPaper - inludes box shadow to component container
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, location, isPaper, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { document } = useDocumentState(
        BiographyContext,
        props.documentId || match.params["id"]
            ? "id"
            : "title",
        props.documentId || match.params["id"] || match.params["title"],
        {}
    );

    //ensure that the mobile view shows the Aside right at the top and other Aside on side
    useEffect(() => {
        if (location && ["/", "/coverletter", "/biography", "/employment", "/education", "/portfolio", "/diplomas", "/references"].indexOf(location.pathname) > -1) {
            let aside = window.document.querySelector("aside");
            aside.classList.remove("aside-xs");
        }
        else {
            let aside = window.document.querySelector("aside");
            aside.classList.add("aside-xs");
        };
    }, [location.pathname]);

    return Aside({
        ...props,
        data: {
            authGroup,
            document,
            isPaper
        },
        control: {},
        render: {}
    });
});