//react
import React, { useContext, useEffect } from "react";

//react-router
import { withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//components
import CoverLetter from "./../../components/CoverLetter/CoverLetter";
import BiographyView from "./../../components/Biography/BiographyView";
import EmploymentList from "./../../components/Employment/EmploymentList";
import EducationList from "./../../components/Education/EducationList";
import PortfolioList from "./../../components/Portfolio/PortfolioList";
import DiplomaList from "./../../components/Diploma/DiplomaList";
import ReferenceList from "./../../components/Reference/ReferenceList";
import HobbyList from "./../../components/Hobby/HobbyList";

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

//presentation
/**
 * (Presentation Component) Displays all cv information without webformatting for printing
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
export const OnePagePrint = ({ data, control, render, ...props }) => {
    const { authGroup, biographyId, readMoreDisplay, ...routeProps } = data;

    const classes = getClasses();
    if (authGroup === "guest") {
        return <>
            <Paper id="OnePagePrint">
                <div className={classes.container}>
                    <CoverLetter
                        {...routeProps}
                        documentId={biographyId}
                    />
                </div>
            </Paper>
        </>
    }
    else {
        return <>
            <Paper id="OnePagePrint">
                <div className={classes.container}>
                    <CoverLetter
                        {...routeProps}
                        documentId={biographyId}
                    />
                </div>
                <div className={classes.readMoreContainer + " " + classes.breakBefore}>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                <i className={"material-icons " + classes.gutterIcon} style={{ position: "relative", top: 8 }}>person</i>
                                &nbsp;Biography
                            </h4>
                        </header>
                        <BiographyView
                            {...routeProps}
                            documentId={biographyId}
                            template="view"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer + " "/* + classes.breakBefore*/}>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                <i className={"material-icons " + classes.gutterIcon} style={{ position: "relative", top: 8 }}>work</i>
                                &nbsp;Employment History
                            </h4>
                        </header>
                        <EmploymentList
                            {...routeProps}
                            template="view"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer + " " + classes.breakBefore}>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                <i className={"material-icons " + classes.gutterIcon} style={{ position: "relative", top: 8 }}>school</i>
                                &nbsp;Education History
                            </h4>
                        </header>
                        <EducationList
                            {...routeProps}
                            template="view"
                        />
                    </div>
                </div>                
                <div className={classes.readMoreContainer + " " + classes.breakBefore}>
                    <header>
                        <h4 className={classes.headingMain}>
                            <i className={"material-icons " + classes.gutterIcon}>golf_course</i>
                            &nbsp;Hobbies & Recreation
                        </h4>
                    </header>
                    <HobbyList
                        {...routeProps}
                        template="view"
                    />
                </div>
                <div className={classes.readMoreContainer + " " + classes.breakBefore}>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                <i className={"material-icons " + classes.gutterIcon} style={{ position: "relative", top: 8 }}>dashboard</i>
                                &nbsp;Portfolio Showcase
                            </h4>
                        </header>
                        <PortfolioList
                            {...routeProps}
                            template="view"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer + " " + classes.breakBefore}>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                <i className={"material-icons " + classes.gutterIcon} style={{ transform: "rotate(180deg)", position: "relative", top: 8 }}>post_add</i>
                                &nbsp;Diplomas & Certification
                            </h4>
                        </header>
                        <DiplomaList
                            {...routeProps}
                            template="list"
                        />
                    </div>
                </div>
                <div className={classes.readMoreContainer + " " + classes.breakBefore}>
                    <div className={classes.content}>
                        <header>
                            <h4 className={classes.headingMain}>
                                <i className={"material-icons " + classes.gutterIcon} style={{ position: "relative", top: 8 }}>people_alt</i>
                                &nbsp;References
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
 * (Container Component) Displays all cv information without webformatting for printing
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param location - current navigation path
 * @param biographyId - document id to load data
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, location, biographyId, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);

    const classes = getClasses();
    useEffect(() => {
        function loadData(url) {
            fetch(url)
                .then(function (response) {
                    return response.body;
                })
                .catch(function (err) {
                    console.log("failed to load ", url, err.stack);
                });
        }

        function pageLoad(count) {
            count--;

            window.document.querySelector("body").style.setProperty("background-color", "transparent", "important");
            window.document.querySelector("#AppHeader").style.display = "none";
            window.document.querySelector("aside").style.display = "none";
            window.document.querySelector("#Footer").style.display = "none";
            window.document.querySelector("main").classList.remove("makeStyles-main-4");
            if (window.document.querySelector("#cv")) {
                window.document.querySelector("#cv").style.display = "inline";
            }

            window.document.querySelectorAll("div:not([data-attr='print']").forEach((element) => element.style.setProperty("display", element.style.display === "" ? "block" : element.style.display, "important"));

            window.document.querySelectorAll("menu").forEach((element) => element.style.display = "none");
            window.document.querySelectorAll("#divToolbar").forEach((element) => element.style.margin = 0);
            window.document.querySelectorAll("#divToolbar").forEach((element) => element.style.padding = 0);
            window.document.querySelectorAll("#divToolbar").forEach((element) => element.style.display = "none");
            window.document.querySelectorAll("#OnePagePrint").forEach((element) => element.classList.remove("MuiPaper-elevation1"));
            window.document.querySelectorAll("#OnePagePrint > div").forEach((element) => element.style.margin = 0);
            window.document.querySelectorAll("#OnePagePrint > div").forEach((element) => element.style.padding = 0);
            window.document.querySelectorAll("#EmploymentView").forEach((element) => element.classList.remove("MuiPaper-elevation1"));
            window.document.querySelectorAll("#EducationView").forEach((element) => element.classList.remove("MuiPaper-elevation1"));
            window.document.querySelectorAll("#PortfolioView").forEach((element) => element.classList.remove("MuiPaper-elevation1"));
            window.document.querySelectorAll("#HobbyView").forEach((element) => element.classList.remove("MuiPaper-elevation1"));
            window.document.querySelectorAll("#readMoreLink").forEach((element) => element.style.display = "none");
            window.document.querySelectorAll("#credentialsContainer").forEach((element) => element.style.borderTop = 0);
            window.document.querySelectorAll("#letterOfRecommendation").forEach((element) => element.style.display = "none");

            window.document.querySelectorAll("#letterOfRecommendationReference header").forEach((element) => element.style.maxWidth = "100%");
            window.document.querySelectorAll("#letterOfRecommendationReference img").forEach((element) => element.style.maxWidth = "100%");
            window.document.querySelectorAll("#letterOfRecommendationReference a").forEach((element) => {
                element.parentElement.innerHTML = `
                    <div style="position:relative; left:0px;" box-shadow: 1px 2px 3px #000; width:100%; overflow-x:hidden;">
                        <div style="position:relative; left:-70px;">
                            <object data="${element.getAttribute("href")}#zoom=100&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0" type="application/pdf" width="1000px" height="500px">
                                <embed src="${element.getAttribute("href")}#zoom=100&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0" type="application/pdf">
                                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href="${element.getAttribute("href")}">Download PDF</a>.</p>
                                </embed>
                            </object>
                        </div>
                    </div>
                `;
            });

            window.document.querySelectorAll("#ReferenceView header").forEach((element) => element.style.display = "none");
            //window.document.querySelectorAll(".makeStyles-breakAfter-178").forEach((element) => element.style.margin = "0");
            window.document.querySelectorAll("#letterOfRecommendationContainer").forEach((element) => element.style.textAlign = "right");
            window.document.querySelectorAll("#letterOfRecommendationContainer").forEach((element) => element.style.marginLeft = "110px");

            window.document.querySelectorAll("#diplomasAndCertificates").forEach((element) => element.style.display = "none");
            window.document.querySelectorAll("#screenshots").forEach((element) => element.style.display = "none");
            window.document.querySelectorAll("#diplomaImage").forEach((element) => element.style.flexDirection = "column-reverse");
            window.document.querySelectorAll("#diplomaImage").forEach((element) => element.style.flexWrap = "nowrap");
            window.document.querySelectorAll("#diplomaImage header").forEach((element) => element.style.maxWidth = "100%");
            window.document.querySelectorAll("#diplomaImage img").forEach((element) => element.style.maxWidth = "80%");
            window.document.querySelectorAll("#DiplomaList hr").forEach((element) => element.style.backgroundColor = "transparent");

            window.document.querySelectorAll("#donutChart").forEach((element) => element.style.position = "relative");
            window.document.querySelectorAll("#donutChart").forEach((element) => element.style.left = "-100px");
            
            window.document.querySelectorAll("#footerHobby").forEach((element) => element.style.display = "none");

            window.document.querySelectorAll("#dividerEmploymentList").forEach((element, index, arr) => {
                if (index !== arr.length - 2) {
                    element.style.margin = "0";
                    element.style.color = "transparent"
                    element.style.backgroundColor = "transparent"
                }
                else {
                    element.style.margin = "16px 0";
                }
            });
            window.document.querySelectorAll("#dividerEducationList").forEach((element, index, arr) => {
                if (index !== 0) {
                    element.style.margin = "0";
                    element.style.color = "transparent"
                    element.style.backgroundColor = "transparent"
                    if (index === 1) {
                        element.classList.add(classes.breakAfter)
                    }
                }
                else {
                    element.style.margin = "16px 0";
                }
            });
            window.document.querySelectorAll("#dividerPortfolioList").forEach((element, index, arr) => {
                element.style.margin = "0";
                element.style.color = "transparent"
                element.style.backgroundColor = "transparent"
                element.classList.add(classes.breakAfter);
            });
            window.document.querySelectorAll("#dividerDiploma").forEach((element) => element.style.margin = "16px 0");
            window.document.querySelectorAll("#dividerReferenceList").forEach((element) => element.style.margin = "16px 0");

            window.document.querySelectorAll("#ReferenceView").forEach((element, index, arr) => {
                if (index === 6 || index === 4) {
                    element.style.pageBreakBefore = "unset";
                }
            });

            if (count > 0) {
                setTimeout(() => pageLoad(count), 100);
            }
        }
        pageLoad(10);
    });

    return OnePagePrint({
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