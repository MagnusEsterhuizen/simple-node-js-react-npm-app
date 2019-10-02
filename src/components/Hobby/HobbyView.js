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
import PaperCard from "./../../elements/PaperCard/PaperCard";
import FileUploader from "./../../elements/FileUploader/FileUploader";
import AlbumCard from "./../../elements/AlbumCard/AlbumCard";

//components
import AdminMenu from "./../../components/AdminMenu/AdminMenu";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import HobbyContext from "./HobbyContext";

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
 * (Presentation Component) Displays Hobby information
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
export const HobbyView = ({ data, control, render, ...props }) => {
    const { template, document, isEdit, isFull, isPaper, history } = data;
    const { handleLiftState, handleUploadFile, handleDropFile } = control;
    const { adminMenu: AdminMenu } = render;

    const classes = getClasses();
    return <>
        <PaperCard component="article" id="HobbyView" isPaper={isPaper}>
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
                </section>
                <footer id="footerHobby">
                    <Grid container spacing={2} alignContent="center" alignItems="stretch" justify="space-evenly">
                        {[...Array(template === "list" ? 2 : 4).keys()].map((index) => {
                            index++;
                            if (document[`imagePath${index}`] || isEdit === true) {
                                if (template === "list" || template === "view") {
                                    return <AlbumCard
                                        key={index}
                                        image={document[`imagePath${index}`]}
                                        title={document[`title`]}
                                    />
                                }
                                else {
                                    return <div className={classes.subjectsContainer} key={index}>
                                        <span className={classes.school}>
                                            &nbsp;&nbsp;&nbsp;
                                            <FileUploader
                                                id={`imagePath${index}`}
                                                label={`imagePath${index}`}
                                                value={document[`imagePath${index}`]}
                                                liftState={handleLiftState}
                                                handleUploadFile={handleUploadFile}
                                                handleDropFile={handleDropFile}
                                                isEdit={isEdit}
                                                filename={`/${document.id}/imagePath${index}`}
                                                isManual={true}
                                            />
                                        </span>
                                    </div>
                                }
                            }
                        })}
                    </Grid>
                    {/*template === "list"
                        ? <div className={classes.readMoreContainer} id="readMoreLink">
                            <br />
                            <Link to={`/hobbies/${encodeURI(document.title)}`} className={classes.readMore} variant="body2">
                                Read more &raquo;
                            </Link>
                        </div>
                        : <div id="readMoreLink">
                            <br />
                            <a onClick={() => history.goBack()} className={classes.readMore} variant="body2">
                                &laquo; Go back
                            </a>
                        </div>
                    */}
                </footer>
            </div>
            <AdminMenu />
        </PaperCard >
    </>
}

//container
/**
 * (Container Component) Displays Hobby information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param template - list | view | edit
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, template, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { document, setDocument, saveDocument, removeDocument, uploadFile, dropFile } = useDocumentState(
        HobbyContext,
        props.documentId || match.params["id"]
            ? "id"
            : "title",
        props.documentId || match.params["id"] || match.params["title"],
        {}
    );

    //derive template
    if (!template) {
        template = match.params["id"] || match.path === "/hobbies/new"
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
            newPath: "/hobbies/new",
            viewPath: `/hobbies/${encodeURI(document.title)}`,
            editPath: `/hobbies/${encodeURI(document.id)}/edit`,
            cancelPath: "/hobbies",
            dialogTitle: "Remove Hobby Item",
            dialogSubTitle: "Are you sure you want to remove this hobby item?",
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

    return HobbyView({
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
            isPaper: false,/*template !== "list"
                ? true
                : false,*/
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