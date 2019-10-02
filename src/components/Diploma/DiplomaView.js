//react
import React from "react";

//react-router
import { Link, withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

//elements
import DatePicker from "./../../elements/DatePicker/DatePicker";
import PaperCard from "./../../elements/PaperCard/PaperCard";
import FileUploader from "./../../elements/FileUploader/FileUploader";

//context
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import EducationContext from "./../../components/Education/EducationContext";

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
            credentialsContainer: {
                //borderTop: "1px solid #e0e0e0",
                marginTop: theme.spacing(1),
                paddingTop: theme.spacing(1)
            },
            credentialsContainerList: {
                marginBottom: theme.spacing(2)
            },
            fulltime: {
                ...theme.typography.caption,
                ...{
                    color: theme.palette.text.secondary,
                    textTransform: "lowercase"
                },
            },
            diplomaImg: {
                textAlign: "center",
                [theme.breakpoints.down("xs")]: {
                    padding: "0 35%!important"
                },
            }
        })))()
    };
}

//presentation
/**
 * (Presentation Component) Displays diploma information
 * @param data  - data objects
 * - data[document] - current components doucment data
 * - data[isPaper] - inludes box shadow to component container
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const DiplomaView = ({ data, control, render, ...props }) => {
    const { document, isPaper } = data;

    const classes = getClasses();
    return <>
        {[...Array(5).keys()].map((index) => {
            index++;
            if (document[`diploma${index}`]) {
                return <React.Fragment key={index}>
                    <PaperCard component="article" id="DiplomaView" isPaper={isPaper}>
                        <Grid container component="span" direction="row" spacing={2} className={classes.noContainer} id="diplomaImage">
                            <Grid item component="header" xs={12} sm={2} className={classes.diplomaImg}>
                                <FileUploader
                                    id={`diplomaPath${index}`}
                                    label={`diplomaPath${index}`}
                                    value={document[`diplomaPath${index}`]}
                                    isEdit={false}
                                />
                            </Grid>
                            <Grid item component="span" xs={12} sm={10}>
                                <Grid container direction="column">
                                    <Grid item component="section">
                                        <div className={classes.subjectsContainer}>
                                            <h5 className={classes.heading}>
                                                {document.grade}
                                            </h5>
                                        </div>
                                        <div className={classes.dates}>
                                            <DatePicker
                                                value={document.dateFrom || new Date()}
                                                isEdit={false}
                                            />
                                            &nbsp;&nbsp;-&nbsp;&nbsp;
                                            <DatePicker
                                                value={document.dateTo || new Date()}
                                                isEdit={false}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <span className={classes.fulltime}>(fulltime)</span>
                                        </div>
                                        <div className={classes.subheading}>
                                            {document.school}
                                        </div>
                                    </Grid>
                                    <Grid item component="footer" style={{ marginTop: 24 }} id="readMoreLink">
                                        <div className={classes.readMoreContainer}>
                                            <Link to={`education/${encodeURI(document.grade)}`} className={classes.readMore} variant="body2">
                                                Read more &raquo;
                                            </Link>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </PaperCard>
                    {document[`diplomaPath${index}`]
                        ? <Divider id="dividerDiploma" className={classes.divider} />
                        : <></>
                    }
                </React.Fragment>
            }
        })}
    </>
}

//container
/**
 * (Container Component) Displays diploma information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param isPaper - inludes box shadow to component container
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, isPaper, ...props }) => {
    const { document } = useDocumentState(
        EducationContext,
        props.documentId || match.params["id"]
            ? "id"
            : "grade",
        props.documentId || match.params["id"] || match.params["grade"],
        {}
    );

    return DiplomaView({
        ...props,
        data: {
            document,
            isPaper
        },
        control: {},
        render: {}
    });
});