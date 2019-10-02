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
import ReferenceList from "./../../components/Reference/ReferenceList";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import EmploymentContext from "./EmploymentContext";

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
            }
        })))()
    };
}

//presentation
/**
 * (Presentation Component) Displays Employment information
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
export const EmploymentView = ({ data, control, render, ...props }) => {
    const { authGroup, template, document, isEdit, isFull, isPaper, history } = data;
    const { handleLiftState, handleUploadFile, handleDropFile } = control;
    const { adminMenu: AdminMenu } = render;

    const classes = getClasses();
    return <>
        <PaperCard component="article" id="EmploymentView" isPaper={isPaper}>
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
                            id="position"
                            label="position"
                            value={document.position}
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
                    {template === "list"
                        ? <div className={classes.subheading + " " + classes.credentialsContainerList} id="credentialsContainer">
                            <LabelEdit
                                id="company"
                                label="company"
                                value={document.company}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        : <div className={classes.subheading + " " + classes.credentialsContainer} id="credentialsContainer">
                            <LabelEdit
                                id="company"
                                label="company"
                                value={document.company}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                    }
                    {template === "edit"
                        ? <>
                            <span className={classes.reference}>
                                &nbsp;&nbsp;&nbsp;
                                <LabelEdit
                                    id="referenceName"
                                    label="referenceName"
                                    value={document.referenceName}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </span>
                            <span className={classes.reference}>
                                &nbsp;&nbsp;&nbsp;
                                <LabelEdit
                                    id="referenceMobile"
                                    label="referenceMobile"
                                    value={document.referenceMobile}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </span>
                            <span className={classes.reference}>
                                &nbsp;&nbsp;&nbsp;
                                <LabelEdit
                                    id="referenceEmail"
                                    label="referenceEmail"
                                    value={document.referenceEmail}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </span>
                            <div className={classes.subheading}>
                                &nbsp;&nbsp;&nbsp;
                                <FileUploader
                                    id={`referencePath`}
                                    label={`referencePath`}
                                    value={document[`referencePath`]}
                                    liftState={handleLiftState}
                                    handleUploadFile={handleUploadFile}
                                    handleDropFile={handleDropFile}
                                    isEdit={isEdit}
                                    filename={`/${document.id}/referencePath`}
                                    isManual={true}
                                />
                            </div>
                            <div className={classes.referenceFileType}>
                                <LabelEdit
                                    id="referenceFileType"
                                    label="referenceFileType"
                                    value={document.referenceFileType}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </div>
                            <span className={classes.reference}>
                                &nbsp;&nbsp;&nbsp;
                                <LabelEdit
                                    id="referenceName2"
                                    label="referenceName2"
                                    value={document.referenceName2}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </span>
                            <span className={classes.reference}>
                                &nbsp;&nbsp;&nbsp;
                                <LabelEdit
                                    id="referenceMobile2"
                                    label="referenceMobile2"
                                    value={document.referenceMobile2}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </span>
                            <span className={classes.reference}>
                                &nbsp;&nbsp;&nbsp;
                                <LabelEdit
                                    id="referenceEmail2"
                                    label="referenceEmail2"
                                    value={document.referenceEmail2}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </span>
                            <div className={classes.subheading}>
                                &nbsp;&nbsp;&nbsp;
                                <FileUploader
                                    id={`referencePath2`}
                                    label={`referencePath2`}
                                    value={document[`referencePath2`]}
                                    liftState={handleLiftState}
                                    handleUploadFile={handleUploadFile}
                                    handleDropFile={handleDropFile}
                                    isEdit={isEdit}
                                    filename={`/${document.id}/referencePath2`}
                                    isManual={true}
                                />
                            </div>
                            <div className={classes.referenceFileType2}>
                                <LabelEdit
                                    id="referenceFileType2"
                                    label="referenceFileType2"
                                    value={document.referenceFileType2}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </div>
                        </>
                        : <></>
                    }
                </header>
                <section >
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
                    {template !== "list"
                        ? <>
                            <div className={classes.list}>
                                <span className={classes.listCaption}>Tasks and Duties</span>
                            </div>
                            <div className={classes.listContainer}>
                                <ul>
                                    {[...Array(10).keys()].map((index) => {
                                        index++;
                                        if (document["duty" + index] || isEdit === true) {
                                            return <li key={index} className={classes.li}>
                                                <LabelEdit
                                                    key={index}
                                                    id={"duty" + index}
                                                    label={"duty" + index}
                                                    value={document["duty" + index]}
                                                    liftState={handleLiftState}
                                                    isEdit={isEdit}
                                                />
                                            </li>
                                        }
                                    })}
                                </ul>
                            </div>
                        </>
                        : <></>
                    }
                </section>
                {template === "view" && document[`referenceName`]
                    ? <>
                        <div className={classes.list}>
                            <span className={classes.listCaption}>References</span><br />
                            <br />
                        </div>
                        <section id="referenceList">
                            <ReferenceList documentId={document.id} />
                        </section>
                    </>
                    : <></>
                }
                {template === "view" && document[`referencePath`]
                    ? <>
                        <section id="letterOfRecommendation">
                            <div className={classes.list}>
                                <span className={classes.bottomHeading}>Letter of Recommendation</span>
                            </div>
                            <div className={classes.subheading} style={{ textAlign: "center" }}>
                                <br />
                                <FileUploader
                                    id={`referencePath`}
                                    label={`referencePath`}
                                    value={document[`referencePath`]}
                                    isEdit={false}
                                    fileType={document[`referenceFileType`]}
                                    alignContent="center"
                                />
                            </div>
                        </section>
                    </>
                    : <></>
                }
                <footer>
                    <div className={classes.label}>
                        <span className={classes.labelCaption}>skills and experience</span>
                    </div>
                    <div className={classes.chipsContainer}>
                        {[...Array(template === "list" && authGroup !== "guest" ? 3 : 10).keys()].map((index) => {
                            index++;
                            if (document["skill" + index] || isEdit === true) {
                                return <React.Fragment key={index}>
                                    <ChipEdit
                                        id={"skill" + index}
                                        label={"skill" + index}
                                        value={document["skill" + index]}
                                        color={document["skillColor" + index]}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                    {template === "list" && authGroup !== "guest" && index === 3
                                        ? <Link to={`employment/${encodeURI(document.position)}`}>
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
                            <Link to={`employment/${encodeURI(document.position)}`} className={classes.readMore} variant="body2">
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
 * (Container Component) Displays Employment information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param template - list | view | edit
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, template, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { document, setDocument, saveDocument, removeDocument, uploadFile, dropFile } = useDocumentState(
        EmploymentContext,
        props.documentId || match.params["id"]
            ? "id"
            : "position",
        props.documentId || match.params["id"] || match.params["position"],
        {}
    );

    //derive template
    if (!template) {
        template = match.params["id"] || match.path === "/employment/new"
            ? "edit"
            : match.params["position"]
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
            newPath: "/employment/new",
            viewPath: `/employment/${encodeURI(document.position)}`,
            editPath: `/employment/${encodeURI(document.id)}/edit`,
            cancelPath: "/employment",
            dialogTitle: "Remove Employment History",
            dialogSubTitle: "Are you sure you want to remove this employment history?",
            dialogText: document.position
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
            if (match.params["position"]) {
                let pageTitle = match.params["position"][0].toUpperCase() + match.params["position"].slice(1);
                window.setPageTitle(pageTitle);
                window.document.title = window.document.title.replace(/((\w+\s?){2}).*/, `$1 - ${pageTitle}`);
            }
        }
    }, [match.params["id"], match.params["position"]]);

    return EmploymentView({
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