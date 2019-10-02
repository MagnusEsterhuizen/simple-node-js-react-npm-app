//react
import React, { useContext, useEffect } from "react";

//react-router
import { withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//components
import CoverLetter from "./../../components/CoverLetter/CoverLetter";
import BiographyView from "./../../components/Biography/BiographyView";
import EmploymentList from "./../../components/Employment/EmploymentList";
import EducationList from "./../../components/Education/EducationList";
import PortfolioList from "./../../components/Portfolio/PortfolioList";
import HobbyList from "./../../components/Hobby/HobbyList";
import DiplomaList from "./../../components/Diploma/DiplomaList";
import ReferenceList from "./../../components/Reference/ReferenceList";
import Request from "./../../components/Request/Request";
import SignIn from "./../../components/SignIn/SignIn";

//styles
import commonListStyles from "./../_common/ListStyles";
import commonViewStyles from "./../_common/ViewStyles";

/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...commonListStyles(),
        ...commonViewStyles(),
        ...(makeStyles(theme => ({
            readMoreLink: {
                textAlign: "right"
            },
            readMoreContainer: {
                textAlign: "left",
                display: "flex",
                paddingRight: theme.spacing(3),
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
            endOfPublicResume: {
                ...theme.typography.subtitle1,
                color: theme.palette.primary.light,
                margin: theme.spacing(0, 0, 3),
            },
            privateProfile: {
                "& i": {
                    color: theme.palette.primary.light,
                    verticalAlign: "middle"
                },
                "& span": {
                    ...theme.typography.subtitle1,
                    color: theme.palette.primary.light,
                    verticalAlign: "middle"
                },
                margin: theme.spacing(0, 0, 6),
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
            subheading2: {
                ...theme.typography.body1,
                ...{
                    color: theme.palette.secondary.light,
                    marginTop: 0,
                    marginBottom: 0,
                    fontWeight: 500
                },
            },
        })))()
    }
}

/**
 * (User Function) Scroll to offset then on success fire the callback function
 * @param offset - offset to scroll to
 * @param onSuccess - callback function
 */
function scrollElement(element) {
    if(element.id === "page_home"){
        window.scrollTo(0, 0);
    }
    else if(element.id === "page_coverletter"){
        element.scrollIntoView();
        window.scrollBy(0, window.innerWidth > 600 ? 15 : -40);
    }
    else{
        element.scrollIntoView();
        window.scrollBy(0, -60);
    }
}

/**
 * (User Function) Pushes the scroll position to the Browser History
 */
function pushHistory() {
    const pages = [
        "home",
        "coverletter",
        "biography",
        "employment",
        "education",
        "portfolio",
        "hobbies",
        "diplomas",
        "references"
    ];

    if (!window.isAutoScroll) {
        pages.forEach((page) => {
            const pageElement = window.document.querySelector(`#page_${page}`);
            let offsetTop = 0;
            let offsetBottom = 80;
            if (window.innerWidth < 600) {
                offsetTop = offsetTop + window.innerWidth + 240;
                offsetBottom = offsetBottom + window.innerWidth + 240;
            }
            if (
                pageElement
                &&
                window.scrollY - pageElement.offsetTop >= offsetTop
                &&
                window.scrollY - pageElement.offsetTop <= offsetBottom
            ) {
                if (!window.historyList) {
                    window.historyList = [];
                }
                if (window.historyList.length === 0 || window.historyList[window.historyList.length - 1] !== page) {
                    window.historyList.push(page);
                    window.history.pushState("", page, `/${page !== "home" ? page : ""}`);

                    let pageTitle = page[0].toUpperCase() + page.slice(1);
                    if (pageTitle === "Home") {
                        pageTitle = "Curriculum Vitae";
                    }
                    window.setPageTitle(pageTitle);
                    window.document.title = window.document.title.replace(/((\w+\s?){2}).*/, `$1 - ${pageTitle}`);
                }
            }
        })
    }
}

//presentation
/**
 * (Presentation Component) Shows summary of cv information in one scrollable view
 * @param data - data objects
 * - data[authGroup] - authorized user group
 * - data[biographyId] - document id to load data
 * - data[readMoreDisplay] - flex | block
 * - data[routeProps] - {match, location, history}
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const OnePageScroller = ({ data, control, render, ...props }) => {
    const { authGroup, biographyId, readMoreDisplay, ...routeProps } = data;

    const classes = getClasses();
    if (authGroup === "guest") {
        return <>
            <div id="page_home"></div>
            <Paper id="OnePageScroller">
                <div className={classes.container}>
                    <CoverLetter
                        {...routeProps}
                        documentId={biographyId}
                    />
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_biography"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>person</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Biography
                            </h4>
                        </header>
                        <BiographyView
                            {...routeProps}
                            documentId={biographyId}
                            template="view"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_employment"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>work</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Employment History
                            </h4>
                        </header>
                        <EmploymentList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_education"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>school</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Education History
                            </h4>
                        </header>
                        <EducationList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
                <div style={{ display: readMoreDisplay === "flex" ? "block" : "block", alignSelf: "stretch" }}>
                    <div className={classes.container} style={{ textAlign: "center" }}>
                        <div className={classes.subheading2}>
                            - END OF PUBLIC RESUME -
                        </div>
                    </div>
                    <div className={classes.container} style={{ textAlign: "center" }}>
                        <div className={classes.subheading}>
                            To view my complete CV you need to
                        </div>
                        <Request
                            {...routeProps}
                            isPaper={false}
                        />
                        <Divider className={classes.divider} />
                        <div className={classes.subheading}>
                            Already have an account?
                        </div>
                        <SignIn
                            {...routeProps}
                            isPaper={false}
                        />
                    </div>
                </div>
            </Paper>
        </>
    }
    else {
        return <>
            <div id="page_home"></div>
            <Paper id="OnePageScroller">
                <div className={classes.container}>
                    <CoverLetter
                        {...routeProps}
                        documentId={biographyId}
                    />
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_biography"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>person</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Biography
                            </h4>
                        </header>
                        <BiographyView
                            {...routeProps}
                            documentId={biographyId}
                            template="view"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_employment"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>work</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Employment History
                            </h4>
                        </header>
                        <EmploymentList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_education"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>school</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Education History
                            </h4>
                        </header>
                        <EducationList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_portfolio"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>dashboard</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Portfolio Showcase
                            </h4>
                        </header>
                        <PortfolioList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_hobbies"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>golf_course</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Hobbies & Recreation
                            </h4>
                        </header>
                        <HobbyList
                            {...routeProps}
                            template="view"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_diplomas"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon} style={{ transform: "rotate(180deg)" }}>post_add</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                Diplomas & Certification
                            </h4>
                        </header>
                        <DiplomaList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer}>
                    <div id="page_references"></div>
                    <div className={classes.gutter}>
                        <i className={"material-icons " + classes.gutterIcon}>people_alt</i>
                    </div>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                References
                            </h4>
                        </header>
                        <ReferenceList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
            </Paper>
        </>
    }
}

//container
/**
 * (Container Component) Shows summary of cv information in one scrollable view
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param location - current navigation path
 * @param biographyId - document id to load data
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, location, biographyId, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);

    // adds an eventlistern to push the history to the url bar
    useEffect(() => {
        window.document.addEventListener("scroll", pushHistory);

        return () => {
            window.document.removeEventListener("scroll", pushHistory);
        }
    }, []);

    // ensure that the document scrolls to correct position after navigation and set page title
    let onLoadScrollTimeout;
    useEffect(() => {
        window.isAutoScroll = true;
        if (!match.params["page"]) {
            match.params["page"] = "home";
        }
        if (match.params["page"]) {
            const element = window.document.querySelector(`div#page_${match.params["page"]}`);
            function onLoadScroll(count) {
                if (count > 0) {
                    count--;

                    scrollElement(element);

                    let pageTitle = match.params["page"][0].toUpperCase() + match.params["page"].slice(1);
                    if (pageTitle === "Home") {
                        pageTitle = "Curriculum Vitae";
                    }
                    window.setPageTitle(pageTitle);
                    window.document.title = window.document.title.replace(/((\w+\s?){2}).*/, `$1 - ${pageTitle}`);

                    onLoadScrollTimeout = setTimeout(() => onLoadScroll(count), 500);
                }
                else{
                    window.isAutoScroll = false;
                }
            }
            onLoadScroll(3);
        }

        return function(){
            clearTimeout(onLoadScrollTimeout);
        }
    }, [location.pathname]);

    return OnePageScroller({
        ...props,
        data: {
            authGroup,
            biographyId,
            match,
            history,
            location
        },
        control: {},
        render: {}
    });
});