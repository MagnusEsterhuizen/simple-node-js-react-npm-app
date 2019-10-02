//react
import React from "react";

//react-router
import { Link, withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//elements
import DatePicker from "./../../elements/DatePicker/DatePicker";
import PaperCard from "./../../elements/PaperCard/PaperCard";
import FileUploader from "./../../elements/FileUploader/FileUploader";

//context
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import EmploymentContext from "./../../components/Employment/EmploymentContext";

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
            referenceContainer: {
                borderTop: "1px solid #e0e0e0",
                marginTop: theme.spacing(1),
                paddingTop: theme.spacing(1),
                "& h6": {
                }
            },
            referenceEmail: {
                ...theme.typography.body1,
                whiteSpace: "nowrap",
                marginLeft: theme.spacing(1),
                "& i": {
                    verticalAlign: "middle",
                    fontSize: 15,
                    marginRight: theme.spacing(1),
                },
                "& a": {
                    verticalAlign: "middle",
                    color: theme.palette.text.secondary,
                    textDecoration: "none!important"
                }
            },
            referenceMobile: {
                ...theme.typography.body1,
                whiteSpace: "nowrap",
                marginLeft: theme.spacing(1),
                "& i": {
                    verticalAlign: "middle",
                    fontSize: 15,
                    marginRight: theme.spacing(1),
                },
                "& a": {
                    verticalAlign: "middle",
                    color: theme.palette.text.secondary,
                    textDecoration: "none!important"
                }
            },
            credentialsContainer: {
                borderTop: "1px solid #e0e0e0",
                marginTop: theme.spacing(1),
                paddingTop: theme.spacing(1),
                "& h6": {
                }
            },
            iconPosition: {
                color: "rgba(0, 0, 0, 0.3)",
                fontSize: "40px!important"
            },
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays reference information
 * @param data  - data objects
 * - data[document] - current components doucment data
 * - data[reference2] - display information for second reference
 * - data[isPaper] - inludes box shadow to component container
 * - data[showReadMoreLink] - shows the readmore link [true | false]
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const ReferenceView = ({ data, control, render, ...props }) => {
    const { document, reference2, isPaper, showReadMoreLink } = data;

    let referenceName = document.referenceName;
    let referenceMobile = document.referenceMobile;
    let referenceEmail = document.referenceEmail;
    let referencePath = document.referencePath;
    let referenceFileType = document.referenceFileType;
    if (reference2) {
        referenceName = document.referenceName2;
        referenceMobile = document.referenceMobile2;
        referenceEmail = document.referenceEmail2;
        referencePath = document.referencePath2;
        referenceFileType = document.referenceFileType2;
    }

    const classes = getClasses();
    const xs1 = showReadMoreLink ? 2 : 1;
    const xs2 = showReadMoreLink ? 10 : 11;
    return <>
        <PaperCard components="article" id="ReferenceView" isPaper={isPaper} className={referencePath ? classes.breakBefore : ""}>
            <Grid container components="section" direction="row" spacing={2} className={classes.noContainer}>
                <Grid item component="header" xs={xs1} style={{ textAlign: "center" }}>
                    {showReadMoreLink
                        ? <i className={"material-icons " + classes.iconPosition}>contact_phone</i>
                        : <></>
                    }
                </Grid>
                <Grid item xs={xs2} id="referenceBody">
                    <Grid container direction="column">
                        <Grid item component="section">
                            {showReadMoreLink
                                ? <>
                                    <div className={classes.subjectsContainer}>
                                        <h5 className={classes.heading}>
                                            {document.company}
                                        </h5>
                                    </div>
                                    <span className={classes.dates}>
                                        <DatePicker
                                            value={document.dateFrom || new Date()}
                                            isEdit={false}
                                        />
                                        &nbsp;&nbsp;-&nbsp;&nbsp;
                                        <DatePicker
                                            value={document.dateTo || new Date()}
                                            isEdit={false}
                                        />
                                    </span>
                                </>
                                : <></>
                            }
                            <h6 className={classes.subheading} >{referenceName}</h6>
                            {referenceEmail
                                ? <div className={classes.referenceEmail}>
                                    <i className="material-icons">email</i><a href={`mailto:${referenceEmail}`}>{referenceEmail}</a>
                                </div>
                                : <></>
                            }
                            {referenceMobile
                                ? <div className={classes.referenceMobile}>
                                    <i className="material-icons">phone</i><a href={`tel:${referenceMobile.replace(/\s/g, "")}`}>{referenceMobile}</a>
                                </div>
                                : <></>
                            }
                            {referencePath && showReadMoreLink
                                ? <div  id="letterOfRecommendationReference">
                                    <div className={classes.list}>
                                        <span className={classes.bottomHeading}>Letter of Recommendation</span>
                                    </div>
                                    <div id={!referenceFileType ? "letterOfRecommendationContainer" : "letterOfRecommendationOther"}>
                                        <br />
                                        <FileUploader
                                            id={`referencePath`}
                                            value={referencePath}
                                            isEdit={false}
                                            fileType={referenceFileType}
                                            maxWidth={64}

                                        />
                                    </div>
                                </div>
                                : <></>
                            }
                        </Grid>
                        {showReadMoreLink
                            ? <Grid item component="footer" id="readMoreLink">
                                <div className={classes.chipsContainer}>
                                    <br />
                                    <Link to={`employment/${encodeURI(document.position)}`} className={classes.readMore} variant="body2">
                                        Read more &raquo;
                                    </Link>
                                </div>
                            </Grid>
                            : <></>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </PaperCard>
    </>
}

//container
/**
 * (Container Component) Displays reference information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param reference2 - display information for second reference
 * @param isPaper - inludes box shadow to component container
 * @param showReadMoreLink - shows the readmore link [true | false]
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, reference2, isPaper, showReadMoreLink, ...props }) => {
    const { document } = useDocumentState(
        EmploymentContext,
        props.documentId || match.params["id"]
            ? "id"
            : "company",
        props.documentId || match.params["id"] || match.params["company"],
        {}
    );

    return ReferenceView({
        ...props,
        data: {
            document,
            isPaper,
            reference2,
            showReadMoreLink
        },
        control: {},
        render: {}
    });
});