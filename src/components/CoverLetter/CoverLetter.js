//react
import React, { useContext } from "react";

//react-router
import { withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

//charts
import DonutChart from "./../../charts/DonutChart/DonutChart";

//elements
import LabelEdit from "./../../elements/LabelEdit/LabelEdit";
import TextEdit from "./../../elements/TextEdit/TextEdit";
import PaperCard from "./../../elements/PaperCard/PaperCard";
import TableList from "./../../elements/TableList/TableList";
import { yearOnly } from "./../../elements/DatePicker/DatePicker";

//context
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import BiographyContext from "./../../components/Biography/BiographyContext";
import EmploymentContext from "./../../components/Employment/EmploymentContext";
import EducationContext from "./../../components/Education/EducationContext";
import HobbyContext from "./../../components/Hobby/HobbyContext";

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
            email: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
                color: theme.palette.primary.light,
                "& a": {
                    ...theme.typography.body2,
                    color: theme.palette.primary.light
                }
            },
            phone: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
                color: theme.palette.primary.light,
                "& a": {
                    ...theme.typography.body2,
                    color: theme.palette.primary.light
                }
            },
            quickBreakdownContainer: {
                marginTop: theme.spacing(6),
                textAlign: "left",
                "& h6": {
                    color: theme.palette.primary.light
                },
            },
            experienceOverviewContainer: {
                textAlign: "left",
                "& h6": {
                    color: theme.palette.primary.light
                },
                "& li": {
                    textAlign: "left",
                },
                "&:first-child": {
                    borderRight: "1px solid #e0e0e0",
                    [theme.breakpoints.down("xs")]: {
                        borderRight: 0,
                        margin: theme.spacing(2, 0, 0)
                    }
                },
                margin: theme.spacing(4, 0)
            },
            employmentOverviewContainer: {
                textAlign: "left",
                "& h6": {
                    color: theme.palette.primary.light
                },
                "& li": {
                    textAlign: "left",
                },
                margin: theme.spacing(0, 0, 4)
            },
            educationOverviewContainer: {
                textAlign: "left",
                "& h6": {
                    color: theme.palette.primary.light
                },
                "& li": {
                    textAlign: "left",
                },
                margin: theme.spacing(0, 0, 4)
            },
            hobbyOverviewContainer: {
                textAlign: "left",
                "& h6": {
                    color: theme.palette.primary.light
                },
                "& li": {
                    textAlign: "left",
                },
                margin: theme.spacing(0, 0, 0)
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays Cover Letter
 * @param data  - data objects
 * - data[document] - current components doucment data
 * - data[experienceMaster] - data object for donut chart
 * - data[experiencePrimary] - data object for primary experience column
 * - data[experienceSecondary] - data object for secondary experience column
 * - data[employment] - summary of employement history
 * - data[education] - summary of education history
 * - data[isPaper] - inludes box shadow to component container
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const CoverLetter = ({ data, control, render, ...props }) => {
    const { document, experienceMaster, experienceApprentice, experiencePrimary, experienceSecondary, employment, education, hobby, isPaper } = data;

    const classes = getClasses()
    return <>
        <PaperCard component="article" id="CoverLetter" isPaper={isPaper}>
            <div className={isPaper ? classes.container : ""}>
                <header>
                    <Hidden xsDown>
                        <h1 className={classes.headingMain}>
                            <LabelEdit
                                id="firstname"
                                label="firstname"
                                value={document.firstname}
                            />
                            &nbsp;
                            {document.secondname
                                ? <>
                                    <LabelEdit
                                        id="secondname"
                                        label="secondname"
                                        value={document.secondname}
                                    />
                                    &nbsp;
                                </>
                                : <></>
                            }
                            <LabelEdit
                                id="lastname"
                                label="lastname"
                                value={document.lastname}
                            />
                            <span className={classes.imageCaption} style={{ display: "none" }} id="cv">
                                &nbsp;-&nbsp;Curiculum Vitae
                        </span>
                        </h1>
                        <h2>
                            <LabelEdit
                                id="coverTitle"
                                label="coverTitle"
                                value={document.coverTitle}
                            />
                        </h2>
                    </Hidden>
                </header>
                <div id="page_coverletter"></div>
                <section>
                    <Hidden xsDown>
                        <div className={classes.email}>
                            <span style={{ verticalAlign: "middle" }}>
                                <i className={`material-icons ${classes.linksIcon}`} style={{ verticalAlign: "middle" }}>email</i>
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
                                <i className={`material-icons ${classes.linksIcon}`} style={{ verticalAlign: "middle" }}>phone</i>
                                &nbsp;&nbsp;
                        </span>
                            <span style={{ verticalAlign: "middle" }}>
                                <a className={classes.links} href={`tel:${document.phone ? document.phone.replace(/\s/g, "") : ""}`} target="_blank">
                                    <LabelEdit
                                        id="phone"
                                        label="phone"
                                        value={document.phone}
                                    />
                                </a>
                            </span>
                        </div>
                    </Hidden>
                    <div className={classes.description}>
                        <TextEdit
                            id="description"
                            label="description"
                            value={document.description}
                            isFull={true}
                        />
                    </div>
                </section>
                <footer style={{ pageBreakBefore: "always" }}>
                    <div style={{ width: "100%", height: 300, position: "relative" }} className={classes.quickBreakdownContainer}>
                        <h6 className={classes.subheading}>
                            Targeted skill set Development
                        </h6>
                        <div style={{ width: "100%", height: 300, position: "absolute" }} id="donutChart">
                            <DonutChart
                                chartData={experienceMaster}
                            />
                        </div>
                    </div>
                    <div style={{ width: "100%", height: 300, position: "relative" }} className={classes.quickBreakdownContainer}>
                        <h6 className={classes.subheading}>
                            Targeted skill set Databases
                        </h6>
                        <div style={{ width: "100%", height: 300, position: "absolute" }} id="donutChart">
                            <DonutChart
                                chartData={experienceApprentice}
                            />
                        </div>
                    </div>
                    <Grid container spacing={2} justify="center" component="article">
                        <Grid item xs={12} sm={6} className={classes.experienceOverviewContainer} component="section">
                            <h6 className={classes.subheading}>
                                {experiencePrimary.tableHead.col1.text}
                            </h6>
                            <TableList
                                tableRow={experiencePrimary.tableRow}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.experienceOverviewContainer} component="section">
                            <h6 className={classes.subheading}>
                                {experienceSecondary.tableHead.col1.text}
                            </h6>
                            <TableList
                                tableRow={experienceSecondary.tableRow}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.employmentOverviewContainer}>
                            <h6 className={classes.subheading}>
                                Employment History
                            </h6>
                            <TableList
                                tableHead={employment.tableHead}
                                tableRow={employment.tableRow}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.educationOverviewContainer}>
                            <h6 className={classes.subheading}>
                                Education History
                            </h6>
                            <TableList
                                tableHead={education.tableHead}
                                tableRow={education.tableRow}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.hobbyOverviewContainer}>
                            <h6 className={classes.subheading}>
                                Hobbies & Recreation
                            </h6>
                            <TableList
                                //tableHead={hobby.tableHead}
                                tableRow={hobby.tableRow}
                            />
                        </Grid>
                    </Grid>
                </footer>
            </div>
        </PaperCard>
    </>
}

//container
/**
 * (Container Component) Displays Cover Letter
 * @param match - dynamic url parameter
 * @param isPaper - inludes box shadow to component container
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, isPaper, ...props }) => {
    const { document } = useDocumentState(
        BiographyContext,
        props.documentId || match.params["id"]
            ? "id"
            : "title",
        props.documentId || match.params["id"] || match.params["title"],
        {}
    );

    const { collection: employmentCollection } = useContext(EmploymentContext);
    const { collection: educationCollection } = useContext(EducationContext);
    const { collection: hobbyCollection } = useContext(HobbyContext);

    const experienceMaster = [];
    let total = 0;
    [...Array(5).keys()].reverse().map((index) => { //.reverse() -> in order to get the most popular label the darkest color
        index++;
        total += document[`experienceLevel${index}`];
    });
    [...Array(5).keys()].reverse().map((index) => { //.reverse() -> in order to get the most popular label the darkest color
        index++;
        experienceMaster.push({
            id: document[`experience${index}`],
            label: document[`experience${index}`],
            value: Math.floor(document[`experienceLevel${index}`] / total * 100) + (document[`experience${index}`] === "Javascript / ES6" ? 1 : 0),
        });
    });

    const experienceApprentice = [];
    total = 0;
    [...Array(5).keys()].reverse().map((index) => { //.reverse() -> in order to get the most popular label the darkest color
        index += 5;
        index++;
        total += document[`experienceLevel${index}`];
    });
    [...Array(5).keys()].reverse().map((index) => { //.reverse() -> in order to get the most popular label the darkest color
        index += 5;
        index++;
        experienceApprentice.push({
            id: document[`experience${index}`],
            label: document[`experience${index}`],
            value: Math.floor(document[`experienceLevel${index}`] / total * 100) + (document[`experience${index}`] === "MySQL" ? 1 : 0),
        });
    });

    const experiencePrimary = {
        tableHead: {
            col1: {
                align: "left",
                text: document[`experiencePrimary`]
            }
        },
        tableRow: (() => {
            const row = [];
            [...Array(5).keys()].map((index) => {
                index++;
                row.push({
                    col1: {
                        align: "left",
                        text: document[`experience${index}`],
                    }
                })
            });
            return row;
        })()
    };

    const experienceSecondary = {
        tableHead: {
            col1: {
                align: "left",
                text: document[`experienceSecondary`]
            }
        },
        tableRow: (() => {
            const row = [];
            [...Array(5).keys()].map((index) => {
                index++;
                index += 5;
                row.push({
                    col1: {
                        align: "left",
                        text: document[`experience${index}`],
                    }
                })
            });
            return row;
        })()
    };

    const employment = {
        tableHead: {
            col1: {
                align: "left",
                text: "Position"
            },
            col2: {
                align: "right",
                text: "Period"
            },
        },
        tableRow: (() => {
            const row = [];
            const sortedCollection = employmentCollection.concat().sort((a, b) => {
                if (a.index > b.index) {
                    return 1;
                }
                if (a.dateFrom < b.dateFrom) {
                    return -1;
                }
                return 0;
            });

            sortedCollection.map((employment, index) => {
                row.push({
                    col1: {
                        align: "left",
                        text: employment.position
                    },
                    col2: {
                        align: "right",
                        text: `${yearOnly(employment.dateFrom)} - ${yearOnly(employment.dateTo)}`
                    },
                })
            });
            return row;
        })()
    };

    const education = {
        tableHead: {
            col1: {
                align: "left",
                text: "Certification"
            },
            col2: {
                align: "right",
                text: "Period"
            },
        },
        tableRow: (() => {
            const row = [];
            educationCollection.map((education, index) => {
                row.push({
                    col1: {
                        align: "left",
                        text: education.grade
                    },
                    col2: {
                        align: "right",
                        text: `${yearOnly(education.dateFrom)} - ${yearOnly(education.dateTo)}`
                    },
                })
            });
            return row;
        })()
    };

    const hobby = {
        tableHead: {
            col1: {
                align: "left",
                text: "Hobby"
            }
        },
        tableRow: (() => {
            const row = [];
            hobbyCollection.map((hobby, index) => {
                row.push({
                    col1: {
                        align: "left",
                        text: hobby.title
                    }
                })
            });
            return row;
        })()
    };

    return CoverLetter({
        ...props,
        data: {
            document,
            experienceMaster: experienceMaster.sort((a, b) => a.value - b.value),
            experienceApprentice: experienceApprentice.sort((a, b) => a.value - b.value),
            experiencePrimary,
            experienceSecondary,
            employment,
            education,
            hobby,
            isPaper
        },
        control: {},
        render: {}
    });
});