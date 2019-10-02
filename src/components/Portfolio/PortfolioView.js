//react
import React, { useContext, useEffect } from "react";

//react-router
import { Link, withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//elements
import LabelEdit from "./../../elements/LabelEdit/LabelEdit";
import TextEdit from "./../../elements/TextEdit/TextEdit";
import ChipEdit from "./../../elements/ChipEdit/ChipEdit";
import PaperCard from "./../../elements/PaperCard/PaperCard";
import DatePicker from "./../../elements/DatePicker/DatePicker";
import FileUploader from "./../../elements/FileUploader/FileUploader";
import AlbumCard from "./../../elements/AlbumCard/AlbumCard";

//components
import AdminMenu from "./../../components/AdminMenu/AdminMenu";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import PortfolioContext from "./PortfolioContext";

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
            credentialsContainer: {
                borderTop: "1px solid #e0e0e0",
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
            screenshots: {
                ...theme.typography.body1,
                ...{
                    color: theme.palette.primary.light,
                    margin: theme.spacing(4, 0, 3),
                    fontWeight: 800
                },
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays Portfolio information
 * @param data  - data objects
 * - data[template] - list | view | edit
 * - data[document] - current components doucment data
 * - data[isEdit] - template can be edited
 * - data[isFull] - description is in html
 * - data[isPaper] - inludes box shadow to component container
 * - data[history] - navigation history
 * @param control - control functions
 * - control[handleLiftState] - lift component state to document state
 * - control[handleUploadFile] - upload file function
 * - control[handleDropFile] - delete file function
 * @param render - render components
 * - render[adminMenu] - render adminMenu when user is administrator
 * @param props - props extra
 * @return JSX component
 */
export const PortfolioView = ({ data, control, render, ...props }) => {
    const { template, document, isEdit, isFull, isPaper, history } = data;
    const { handleLiftState, handleUploadFile, handleDropFile } = control;
    const { adminMenu: AdminMenu } = render;

    const classes = getClasses();
    return <>
        <PaperCard component="article" id="PortfolioView" isPaper={isPaper}>
            <div className={template !== "list" ? classes.container : classes.noContainer}>
                <header>
                    {template === "edit"
                        ? <LabelEdit
                            id="index"
                            label="index"
                            value={document.index}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        : <></>
                    }
                    <h5 className={classes.heading}>
                        <LabelEdit
                            id="title"
                            label="title"
                            value={document.title}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                    </h5>
                    <div className={classes.dates}>
                        <DatePicker
                            id="dateFrom"
                            label="dateFrom"
                            value={document.dateFrom || new Date()}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <DatePicker
                            id="dateTo"
                            label="dateTo"
                            value={document.dateTo || new Date()}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                    </div>
                </header>
                <section>
                    {template === "list"
                        ? <div className={classes.subheading + " " + classes.credentialsContainerList} id="credentialsContainer">
                            <LabelEdit
                                id="subTitle"
                                label="subTitle"
                                value={document.subTitle}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        : <div className={classes.subheading + " " + classes.credentialsContainer} id="credentialsContainer">
                            <LabelEdit
                                id="subTitle"
                                label="subTitle"
                                value={document.subTitle}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                    }
                    <div className={classes.description}>
                        <TextEdit
                            id="description"
                            label="description"
                            value={document.description}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                            isFull={isFull}
                        />
                    </div>
                    {document[`screenshot1`] || isEdit === true
                        ? <section id="screenshots">
                            <div className={classes.bottomHeading}>
                                {template !== "list"
                                    ? "Screenshots"
                                    : ""
                                }
                            </div>
                            <div className={classes.imageContainer}>
                                <Grid container spacing={2} alignContent="center" alignItems="stretch" justify="space-evenly">
                                    {[...Array(template === "list" ? 2 : 10).keys()].map((index) => {
                                        index++;
                                        if (document[`screenshot${index}`] || isEdit === true) {
                                            if (template === "list" || template === "view") {
                                                return <AlbumCard
                                                    key={index}
                                                    image={document[`screenshotPath${index}`]}
                                                    title={document[`screenshot${index}`]}
                                                    description={document[`screenshotDescription${index}`]}
                                                />
                                            }
                                            else {
                                                return <Grid item xs={12} sm={6} key={index}>
                                                    <div className={classes.subheading}>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <LabelEdit
                                                            id={`screenshot${index}`}
                                                            label={`screenshot${index}`}
                                                            value={document[`screenshot${index}`]}
                                                            liftState={handleLiftState}
                                                            isEdit={isEdit}
                                                        />
                                                    </div>
                                                    <div className={classes.subheading}>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <LabelEdit
                                                            id={`screenshotDescription${index}`}
                                                            label={`screenshotDescription${index}`}
                                                            value={document[`screenshotDescription${index}`]}
                                                            liftState={handleLiftState}
                                                            isEdit={isEdit}
                                                        />
                                                    </div>
                                                    <div className={classes.subheading}>
                                                        <FileUploader
                                                            id={`screenshotPath${index}`}
                                                            label={`screenshotPath${index}`}
                                                            value={document[`screenshotPath${index}`]}
                                                            liftState={handleLiftState}
                                                            handleUploadFile={handleUploadFile}
                                                            handleDropFile={handleDropFile}
                                                            isEdit={isEdit}
                                                            filename={`/${document.id}/screenshotPath${index}`}
                                                            isManual={true}
                                                        />
                                                    </div>
                                                </Grid>
                                            }
                                        }
                                    })}
                                </Grid>
                            </div>
                        </section>
                        : <></>
                    }
                </section>
                <footer>
                    <div className={classes.label}>
                        <span className={classes.labelCaption}>technology</span>
                    </div>
                    <div className={classes.chipsContainer}>
                        {[...Array(template === "list" ? 3 : 10).keys()].map((index) => {
                            index++;
                            if (document["tech" + index] || isEdit === true) {
                                return <React.Fragment key={index}>
                                    <ChipEdit
                                        key={index}
                                        id={"tech" + index}
                                        label={"tech" + index}
                                        value={document["tech" + index]}
                                        color={document["techColor" + index]}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                    {template === "list" && index === 3
                                        ? <Link to={`/portfolio/${encodeURI(document.title)}`}>
                                            <i className={"material-icons " + classes.dotDotDot} style={{ position: "relative", top: 15, fontSize: 32, marginLeft: 8 }}>more_horiz</i>
                                        </Link>
                                        : <></>
                                    }
                                </React.Fragment>
                            }
                        })}
                    </div>
                    {template === "list"
                        ? <div className={classes.readMoreContainer} id="readMoreLink">
                            <br />
                            <Link to={`/portfolio/${encodeURI(document.title)}`} className={classes.readMore} variant="body2">
                                Read more &raquo;
                            </Link>
                        </div>
                        : <div id="readMoreLink">
                            <br />
                            <a onClick={() => history.goBack()} className={classes.readMore} variant="body2">
                                &laquo; Go back
                            </a>
                        </div>
                    }
                </footer>
            </div>
            <AdminMenu />
        </PaperCard >
    </>
}

//container
/**
 * (Container Component) Displays Portfolio information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param template - list | view | edit
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, template, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { document, setDocument, saveDocument, removeDocument, uploadFile, dropFile } = useDocumentState(
        PortfolioContext,
        props.documentId || match.params["id"]
            ? "id"
            : "title",
        props.documentId || match.params["id"] || match.params["title"],
        {}
    );

    //derive template
    if (!template) {
        template = match.params["id"] || match.path === "/portfolio/new"
            ? "edit"
            : match.params["title"]
                ? "view"
                : "list";
    }

    //adminMenu settings
    const adminMenuProps = authGroup === "admin"
        ? {
            template,
            document,
            history,
            saveDocument,
            removeDocument,
            newPath: "/portfolio/new",
            viewPath: `/portfolio/${encodeURI(document.title)}`,
            editPath: `/portfolio/${encodeURI(document.id)}/edit`,
            cancelPath: "/portfolio",
            dialogTitle: "Remove Portfolio",
            dialogSubTitle: "Are you sure you want to remove this portfolio?",
            dialogText: document.title
        }
        : {};

    function handleLiftState(event) {
        setDocument(event);
    }

    function handleUploadFile(filename, file, onSuccess) {
        if (document && document.id) {
            uploadFile(filename, file, onSuccess);
        }
    }

    function handleDropFile(filename, onSuccess) {
        if (document && document.id) {
            dropFile(filename, onSuccess);
        }
    }

    //on navigation scroll to top when in view mode and set page title
    useEffect(() => {
        if (template !== "list") {
            window.scrollTo(0, 0);
            if (match.params["title"]) {
                let pageTitle = match.params["title"][0].toUpperCase() + match.params["title"].slice(1);
                window.setPageTitle(pageTitle);
                window.document.title = window.document.title.replace(/((\w+\s?){2}).*/, `$1 - ${pageTitle}`);
            }
        }
    }, [match.params["id"], match.params["title"]]);

    return PortfolioView({
        ...props,
        data: {
            template,
            document,
            isEdit: authGroup === "admin" && template === "edit"
                ? true
                : false,
            isFull: template === "view"
                ? true
                : false,
            isPaper: template !== "list"
                ? true
                : false,
            history
        },
        control: {
            handleLiftState,
            handleUploadFile,
            handleDropFile
        },
        render: {
            adminMenu: authGroup === "admin"
                ? () => <AdminMenu {...adminMenuProps} />
                : () => <></>
        }
    });
});