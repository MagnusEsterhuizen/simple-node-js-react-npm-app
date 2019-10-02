//react
import React, { useContext } from "react";

//react-router
import { withRouter } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";

//elements
import LabelEdit from "./../../elements/LabelEdit/LabelEdit";
import TextEdit from "./../../elements/TextEdit/TextEdit";
import PaperCard from "./../../elements/PaperCard/PaperCard";
import FileUploader from "./../../elements/FileUploader/FileUploader";
import SliderEdit from "./../../elements/SliderEdit/SliderEdit";
import SelectEdit from "./../../elements/SelectEdit/SelectEdit";
import DatePicker from "./../../elements/DatePicker/DatePicker";

//components
import AdminMenu from "./../../components/AdminMenu/AdminMenu";
//elements
import { dayMonthYear } from "./../../elements/DatePicker/DatePicker";
import TableList from "./../../elements/TableList/TableList";

//context
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";
import { useDocumentState } from "./../../context/CollectionContext/CollectionContext";
import BiographyContext from "./BiographyContext";

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
            tableContainer: {
                margin: theme.spacing(4, 0, 4)
            }
        })))()
    };
}

//presentation
/**
 * (Presentation Component) Displays Biographical information
 * @param data  - data objects
 * - .template - list | view | edit
 * - data[document] - current components doucment data
 * - data[personal] - personal information data object
 * - data[contact] - contact information data object
 * - data[social] - social information data object
 * - data[employment] - employment information data object
 * - data[languages] - language information data object
 * - data[isEdit] - template can be edited
 * - data[isFull] - description is in html
 * - data[isPaper] - inludes box shadow to component container
 * @param control - control functions
 * - control[handleLiftState] - lift component state to document state
 * - control[handleUploadFile] - upload file function
 * - control[handleDropFile] - delete file function
 * @param render - render components
 * - render[adminMenu] - render adminMenu when user is administrator
 * @param props - props extra
 * @return JSX component
 */
export const BiographyView = ({ data, control, render, ...props }) => {
    const { template, document, personal, contact, social, employment, languages, isEdit, isFull, isPaper } = data;
    const { handleLiftState, handleUploadFile, handleDropFile } = control;
    const { adminMenu: AdminMenu } = render;

    const classes = getClasses();
    if (template === "view") {
        return <>
            <PaperCard component="article" id="BiographyView" isPaper={isPaper}>
                <div className={isPaper ? classes.container : ""}>
                    <div className={classes.tableContainer}>
                        <h6 className={classes.subheading} style={{ color: "#7986cb" }}>
                            {personal.tableHead.col1.text}
                        </h6>
                        <TableList
                            tableRow={personal.tableRow}
                        />
                    </div>
                    <div className={classes.tableContainer}>
                        <h6 className={classes.subheading} style={{ color: "#7986cb" }}>
                            {contact.tableHead.col1.text}
                        </h6>
                        <TableList
                            tableRow={contact.tableRow}
                        />
                    </div>
                    <div className={classes.tableContainer}>
                        <h6 className={classes.subheading} style={{ color: "#7986cb" }}>
                            {social.tableHead.col1.text}
                        </h6>
                        <TableList
                            tableRow={social.tableRow}
                        />
                    </div>
                    <div className={classes.tableContainer}>
                        <h6 className={classes.subheading} style={{ color: "#7986cb" }}>
                            {employment.tableHead.col1.text}
                        </h6>
                        <TableList
                            tableRow={employment.tableRow}
                        />
                    </div>
                    <div className={classes.tableContainer}>
                        <h6 className={classes.subheading} style={{ color: "#7986cb" }}>
                            {languages.tableHead.col1.text}
                        </h6>
                        <TableList
                            tableRow={languages.tableRow}
                        />
                    </div>
                </div>
                <AdminMenu />
            </PaperCard>
        </>
    }
    else if (template === "edit") {
        return <>
            <PaperCard component="article" id="biographyEdit" isPaper={isPaper}>
                <div className={classes.container}>
                    <header>
                        <LabelEdit
                            id="index"
                            label="index"
                            value={document.index}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        <FileUploader
                            id={`coverImage`}
                            label={`coverImage`}
                            value={document[`coverImage`]}
                            liftState={handleLiftState}
                            handleUploadFile={handleUploadFile}
                            handleDropFile={handleDropFile}
                            isEdit={isEdit}
                            filename={`/${document.id}/coverImage`}
                            isManual={true}
                        />
                        <LabelEdit
                            id="firstname"
                            label="firstname"
                            value={document.firstname}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        <LabelEdit
                            id="secondname"
                            label="secondname"
                            value={document.secondname}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        <LabelEdit
                            id="lastname"
                            label="lastname"
                            value={document.lastname}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        <DatePicker
                            id="birthday"
                            label="birthday"
                            value={document.birthday}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        <LabelEdit
                            id="coverTitle"
                            label="coverTitle"
                            value={document.coverTitle}
                            liftState={handleLiftState}
                            isEdit={isEdit}
                        />
                        <FileUploader
                            id={`pdfGuest`}
                            label={`pdfGuest`}
                            value={document[`pdfGuest`]}
                            liftState={handleLiftState}
                            handleUploadFile={handleUploadFile}
                            handleDropFile={handleDropFile}
                            isEdit={isEdit}
                            filename={`/${document.id}/pdfGuest`}
                            isManual={true}
                            fileType="file-pdf"
                        />
                        <FileUploader
                            id={`pdfViewer`}
                            label={`pdfViewer`}
                            value={document[`pdfViewer`]}
                            liftState={handleLiftState}
                            handleUploadFile={handleUploadFile}
                            handleDropFile={handleDropFile}
                            isEdit={isEdit}
                            filename={`/${document.id}/pdfViewer`}
                            isManual={true}
                            fileType="file-pdf"
                        />
                        <FileUploader
                            id={`pdfSummary`}
                            label={`pdfSummary`}
                            value={document[`pdfSummary`]}
                            liftState={handleLiftState}
                            handleUploadFile={handleUploadFile}
                            handleDropFile={handleDropFile}
                            isEdit={isEdit}
                            filename={`/${document.id}/pdfSummary`}
                            isManual={true}
                            fileType="file-pdf"
                        />
                    </header>
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
                                            liftState={handleLiftState}
                                            isEdit={isEdit}
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
                                            liftState={handleLiftState}
                                            isEdit={isEdit}
                                        />
                                    </a>
                                </span>
                            </div>
                            <div className={classes.idNo}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="idNo"
                                        label="idNo"
                                        value={document.idNo}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            <div className={classes.address}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <TextEdit
                                        id="address"
                                        label="address"
                                        value={document.address}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                        isFull={isFull}
                                        className={classes.description}
                                    />
                                </span>
                            </div>
                            <div className={classes.location}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="location"
                                        label="location"
                                        value={document.location}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            <div className={classes.timezone}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="timezone"
                                        label="timezone"
                                        value={document.timezone}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            <div className={classes.equity}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <SelectEdit
                                        id="gender"
                                        label="gender"
                                        value={document.gender}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                        items={[
                                            "Male",
                                            "Female"
                                        ]}
                                    />
                                </span>
                            </div>
                            <div className={classes.equity}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="equity"
                                        label="equity"
                                        value={document.equity}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            <div className={classes.married}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <SelectEdit
                                        id="married"
                                        label="married"
                                        value={document.married}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                        items={[
                                            "Not Married",
                                            "Married"
                                        ]}
                                    />
                                </span>
                            </div>
                            <div className={classes.drivers}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="drivers"
                                        label="drivers"
                                        value={document.drivers}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            <div className={classes.remote}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="remote"
                                        label="remote"
                                        value={document.remote}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            <div className={classes.currentPosition}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="currentPosition"
                                        label="currentPosition"
                                        value={document.currentPosition}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            <div className={classes.availability}>
                                <span style={{ verticalAlign: "middle" }}>
                                    <LabelEdit
                                        id="availability"
                                        label="availability"
                                        value={document.availability}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                    />
                                </span>
                            </div>
                            {template === "edit"
                                ? <div className={classes.description}>
                                    <TextEdit
                                        id="description"
                                        label="description"
                                        value={document.description}
                                        liftState={handleLiftState}
                                        isEdit={isEdit}
                                        isFull={true}
                                    />
                                </div>
                                : <></>
                            }
                        </div>
                        <div>
                            {[...Array(5).keys()].map((index) => {
                                index++;
                                if (document[`language${index}`] || isEdit === true) {
                                    return <div className={classes.language} key={index}>
                                        {template === "edit"
                                            ? <span style={{ verticalAlign: "middle" }}>
                                                <i className={"material-icons"} style={{ verticalAlign: "middle" }}>{index === 1 ? "record_voice_over" : "_"}</i>
                                                &nbsp;&nbsp;
                                        </span>
                                            : <></>
                                        }
                                        <span style={{ verticalAlign: "middle" }}>
                                            <LabelEdit
                                                id={`language${index}`}
                                                label={`language${index}`}
                                                value={document[`language${index}`]}
                                                liftState={handleLiftState}
                                                isEdit={isEdit}
                                            />
                                        </span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className={classes.experienceContainer}>
                            <div style={{ marginBottom: 16 }}>
                                <LabelEdit
                                    id={`experiencePrimary`}
                                    label={`experiencePrimary`}
                                    value={document[`experiencePrimary`]}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </div>
                            {[...Array(5).keys()].map((index) => {
                                index++;
                                if (document[`experience${index}`] || isEdit === true) {
                                    return <div key={index} style={{ marginBottom: 16 }}>
                                        <span className={classes.experience}>
                                            <LabelEdit
                                                id={`experience${index}`}
                                                label={`experience${index}`}
                                                value={document[`experience${index}`]}
                                                liftState={handleLiftState}
                                                isEdit={isEdit}
                                            />
                                        </span>
                                        <span className={classes.experience}>
                                            <SliderEdit
                                                id={`experienceLevel${index}`}
                                                label={`experienceLevel${index}`}
                                                value={document[`experienceLevel${index}`]}
                                                liftState={handleLiftState}
                                                isEdit={isEdit}
                                            />
                                        </span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className={classes.experienceContainer}>
                            <div style={{ marginBottom: 16 }}>
                                <LabelEdit
                                    id={`experienceSecondary`}
                                    label={`experienceSecondary`}
                                    value={document[`experienceSecondary`]}
                                    liftState={handleLiftState}
                                    isEdit={isEdit}
                                />
                            </div>
                            {[...Array(5).keys()].map((index) => {
                                index++;
                                index += 5;
                                if (document[`experience${index}`] || isEdit === true) {
                                    return <div key={index} style={{ marginBottom: 16 }}>
                                        <span className={classes.experience}>
                                            <LabelEdit
                                                id={`experience${index}`}
                                                label={`experience${index}`}
                                                value={document[`experience${index}`]}
                                                liftState={handleLiftState}
                                                isEdit={isEdit}
                                            />
                                        </span>
                                        <span className={classes.experience}>
                                            <SliderEdit
                                                id={`experienceLevel${index}`}
                                                label={`experienceLevel${index}`}
                                                value={document[`experienceLevel${index}`]}
                                                liftState={handleLiftState}
                                                isEdit={isEdit}
                                            />
                                        </span>
                                    </div>
                                }
                            })}
                        </div>
                    </section>
                    <footer>
                        <div className={classes.social}>
                            <LabelEdit
                                id="facebook"
                                label="facebook"
                                value={document.facebook}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        <div className={classes.social}>
                            <LabelEdit
                                id="linkedin"
                                label="linkedin"
                                value={document.linkedin}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        <div className={classes.social}>
                            <LabelEdit
                                id="skype"
                                label="skype"
                                value={document.skype}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        <div className={classes.social}>
                            <LabelEdit
                                id="phone"
                                label="phone"
                                value={document.phone}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        <div className={classes.social}>
                            <LabelEdit
                                id="twitter"
                                label="twitter"
                                value={document.twitter}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                        <div className={classes.social}>
                            <LabelEdit
                                id="github"
                                label="github"
                                value={document.github}
                                liftState={handleLiftState}
                                isEdit={isEdit}
                            />
                        </div>
                    </footer>
                </div>
                <AdminMenu />
            </PaperCard >
        </>
    }
    else {
        return <>-</>
    }
}

//container
/**
 * (Container Component) Displays Biographical information
 * @param match - dynamic url parameter
 * @param history - navigation history
 * @param location - current navigation path
 * @param isPaper - inludes box shadow to component container
 * @param template - list | view | edit
 * @param props - props extra
 * @return JSX component
 */
export default withRouter(({ match, history, isPaper, template, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { document, setDocument, saveDocument, removeDocument, uploadFile, dropFile, exportDB, duplicateDB } = useDocumentState(
        BiographyContext,
        props.documentId || match.params["id"]
            ? "id"
            : "title",
        props.documentId || match.params["id"] || match.params["title"],
        {}
    );

    const personal = {
        tableHead: {
            col1: {
                align: "left",
                text: "Personal Information"
            },
            col2: {
                align: "right",
                text: ""
            }
        },
        tableRow: [
            { col1: { align: "left", text: "Firstname" }, col2: { align: "right", text: document.firstname } },
            { col1: { align: "left", text: "Secondname" }, col2: { align: "right", text: document.secondname } },
            { col1: { align: "left", text: "Lastname" }, col2: { align: "right", text: document.lastname } },
            { col1: { align: "left", text: "Identity No" }, col2: { align: "right", text: document.idNo } },
            { col1: { align: "left", text: "Birthday" }, col2: { align: "right", text: dayMonthYear(document.birthday) } }
        ]
    };
    if (!document.secondname) {
        delete personal.tableRow[1];
    }

    const contact = {
        tableHead: {
            col1: {
                align: "left",
                text: "Contact Details"
            },
            col2: {
                align: "right",
                text: ""
            }
        },
        tableRow: [
            { col1: { align: "left", text: "Phone Number" }, col2: { align: "right", text: document.phone } },
            { col1: { align: "left", text: "Email Address" }, col2: { align: "right", text: document.email } },
            { col1: { align: "left", text: "Physical Address" }, col2: { align: "right", text: document.address } },
            { col1: { align: "left", text: "Province & Country" }, col2: { align: "right", text: document.location } },
            { col1: { align: "left", text: "Timezone" }, col2: { align: "right", text: document.timezone } }
        ]
    };
    if (contact.tableRow[2].col2.text) {
        contact.tableRow[2].col2.text = contact.tableRow[2].col2.text.replace(/<[^>]*>/g, " ")
    }

    const social = {
        tableHead: {
            col1: {
                align: "left",
                text: "Social Status"
            },
            col2: {
                align: "right",
                text: ""
            }
        },
        tableRow: [
            { col1: { align: "left", text: "Gender" }, col2: { align: "right", text: document.gender } },
            //{ col1: { align: "left", text: "Employment Equity" }, col2: { align: "right", text: document.equity } },
            { col1: { align: "left", text: "Marital Status" }, col2: { align: "right", text: document.married } },
            //{ col1: { align: "left", text: "Drivers Licence" }, col2: { align: "right", text: document.drivers } }
        ]
    };

    const employment = {
        tableHead: {
            col1: {
                align: "left",
                text: "Employment Status"
            }
        },
        tableRow: [
            { col1: { align: "left", text: "Current Position" }, col2: { align: "right", text: document.currentPosition } },
            { col1: { align: "left", text: "Availability" }, col2: { align: "right", text: document.availability } },
            { col1: { align: "left", text: "Willing to work remotely / contract" }, col2: { align: "right", text: document.remote } }
        ]
    };

    const language = [];
    [...Array(5).keys()].map((index) => {
        index++;
        if (document[`language${index}`]) {
            language.push({ col1: { align: "left", text: document[`language${index}`] } })
        }
    });
    const languages = {
        tableHead: {
            col1: {
                align: "left",
                text: "Fluent Languages"
            }
        },
        tableRow: language
    };
    
    //adminMenu settings
    const adminMenuProps = authGroup === "admin"
        ? {
            template,
            document,
            history,
            saveDocument,
            removeDocument,
            exportDB,
            duplicateDB,
            viewPath: `/biography`,
            editPath: `/biography/edit`,
            cancelPath: "/biography",
            dialogTitle: "Remove Biography",
            dialogSubTitle: "Are you sure you want to remove this biography?",
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

    return BiographyView({
        ...props,
        data: {
            template,
            document,
            personal,
            contact,
            social,
            employment,
            languages,
            isEdit: authGroup === "admin" && template === "edit"
                ? true
                : false,
            isFull: template === "view"
                ? true
                : false,
            isPaper
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