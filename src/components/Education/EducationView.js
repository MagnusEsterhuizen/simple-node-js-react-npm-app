//react
import React, { useContext, useEffect } from "react";

//react-router
import { Link, withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";

//elements
import LabelEdit from "./../../elements/LabelEdit/LabelEdit";
import DatePicker from "./../../elements/DatePicker/DatePicker";
import TextEdit from "./../../elements/TextEdit/TextEdit";
import ChipEdit from "./../../elements/ChipEdit/ChipEdit";
import PaperCard from "./../../elements/PaperCard/PaperCard";
import FileUploader from "./../../elements/FileUploader/FileUploader";

//components
import AdminMenu from "./../../components/AdminMenu/AdminMenu";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import EducationContext from "./EducationContext";

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
            }
        })))()
    };
}

//presentation
/**
 * (Presentation Component) Displays Education information
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
export const EducationView = ({ data, control, render, ...props }) => {
    const { authGroup, template, document, isEdit, isFull, isPaper, history } = data;
    const { handleLiftState, handleUploadFile, handleDropFile } = control;
    const { adminMenu: AdminMenu } = render;

    const classes = getClasses();
    return <>
        <PaperCard component="article" id="EducationView" isPaper={isPaper}>
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
                            id="grade"
                            label="grade"
                            value={document.grade}
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
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={classes.fulltime}>
                            {document.fulltime
                                ? <>(</>
                                : <></>
                            }
                            <LabelEdit
                                id="fulltime"
                                label="fulltime"
                                value={document.fulltime}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                            {document.fulltime
                                ? <>)</>
                                : <></>
                            }
                        </span>
                    </div>
                    {template === "list"
                        ? <div className={classes.subheading + " " + classes.credentialsContainerList} id="credentialsContainer">
                            <LabelEdit
                                id="school"
                                label="school"
                                value={document.school}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        : <div className={classes.subheading + " " + classes.credentialsContainer} id="credentialsContainer">
                            <LabelEdit
                                id="school"
                                label="school"
                                value={document.school}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                    }
                </header>
                <section>
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
                    {template !== "list" && document[`diploma1`]
                        ? <section id="diplomasAndCertificates">
                            <div className={classes.image}>
                                <span className={classes.imageCaption}>Diplomas and Certificates</span>
                            </div>
                            <div className={classes.imageContainer}>
                                {[...Array(5).keys()].map((index) => {
                                    index++;
                                    if (document[`diploma${index}`] || isEdit === true) {
                                        return <div key={index}>
                                            <div className={classes.subheading}>
                                                &nbsp;&nbsp;&nbsp;
                                                <LabelEdit
                                                    id={`diploma${index}`}
                                                    label={`diploma${index}`}
                                                    value={document[`diploma${index}`]}
                                                    liftState={handleLiftState}
                                                    isEdit={isEdit}
                                                />
                                            </div>
                                            <div className={classes.subheading}>
                                                &nbsp;&nbsp;&nbsp;
                                                <FileUploader
                                                    id={`diplomaPath${index}`}
                                                    label={`diplomaPath${index}`}
                                                    value={document[`diplomaPath${index}`]}
                                                    liftState={handleLiftState}
                                                    handleUploadFile={handleUploadFile}
                                                    handleDropFile={handleDropFile}
                                                    isEdit={isEdit}
                                                    filename={`/${document.id}/diplomaPath${index}`}
                                                    isManual={true}
                                                />
                                            </div>
                                        </div>
                                    }
                                })}
                            </div>
                        </section>
                        : <></>
                    }
                </section>
                <footer>
                    <div className={classes.label}>
                        <span className={classes.labelCaption}>subjects and classes</span>
                    </div>
                    <div className={classes.chipsContainer}>
                        {[...Array(template === "list" && authGroup !== "guest" ? 3 : 10).keys()].map((index) => {
                            index++;
                            if (document["subject" + index] || isEdit === true) {
                                return <React.Fragment key={index}>
                                    <ChipEdit
                                        id={"subject" + index}
                                        label={"subject" + index}
                                        value={document["subject" + index]}
                                        color={document["subjectColor" + index]}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                    {template === "list" && authGroup !== "guest" && index === 3
                                        ? <Link to={`/education/${encodeURI(document.grade)}`}>
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
                            <Link to={`/education/${encodeURI(document.grade)}`} className={classes.readMore} variant="body2">
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
 * (Container Component) Displays Education information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param template - list | view | edit
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, template, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { document, setDocument, saveDocument, removeDocument, uploadFile, dropFile } = useDocumentState(
        EducationContext,
        props.documentId || match.params["id"]
            ? "id"
            : "grade",
        props.documentId || match.params["id"] || match.params["grade"],
        {}
    );

    //derive template
    if (!template) {
        template = match.params["id"] || match.path === "/education/new"
            ? "edit"
            : match.params["grade"]
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
            newPath: "/education/new",
            viewPath: `/education/${encodeURI(document.grade)}`,
            editPath: `/education/${encodeURI(document.id)}/edit`,
            cancelPath: "/education",
            dialogTitle: "Remove Education History",
            dialogSubTitle: "Are you sure you want to remove this education history?",
            dialogText: document.grade
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
            if (match.params["grade"]) {
                let pageTitle = match.params["grade"][0].toUpperCase() + match.params["grade"].slice(1);
                window.setPageTitle(pageTitle);
                window.document.title = window.document.title.replace(/((\w+\s?){2}).*/, `$1 - ${pageTitle}`);
            }
        }
    }, [match.params["id"], match.params["grade"]]);

    return EducationView({
        ...props,
        data: {
            authGroup,
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