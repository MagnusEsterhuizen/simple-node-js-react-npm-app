//react
import React, { useState, useContext } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

//context
import { useFieldState } from "./../../context/CollectionContext/CollectionContext";
import AuthorizeContext from "./../../context/AuthorizeContext/AuthorizeContext";

//elements
import DialogImage from "./../DialogImage/DialogImage";

/**
 * (Styles & Classes) Defines the CSS styles and classes for this component
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...(makeStyles(theme => ({
            label: {
                ...theme.typography.subtitle1,
                ...{
                    color: theme.palette.text.primary
                },
                textAlign: "center"
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Allows files to be uploaded to firebase store
 * @param data  - data objects
 * - data[id] - element id
 * - data[value] - element id
 * - data[isEdit] - edit mode [true | false]
 * - data[isManual] - manual upload [true | false]
 * - data[fileType] - file type [img | pdf]
 * - data[maxWidth] - maximum width
 * - data[alignContent] - align content flex
 * @param control - control functions
 * - control[handleFileChange] - file change function
 * - control[handleUploadClick] - file upload function
 * - control[handleDropClick] - file delete function
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const FileUploader = ({ data, control, render, ...props }) => {
    const { authGroup } = useContext(AuthorizeContext);
    const { id, value, isEdit, isManual, fileType, maxWidth, alignContent } = data;
    const { handleFileChange, handleUploadClick, handleDropClick } = control;

    const classes = getClasses();
    return <>
        {fileType === "img"
            ? <DialogImage src={value} className={`for-${id}`} style={{ width: "100%", maxWidth: maxWidth || 250, boxShadow: "1px 1px 2px #888888" }} />
            : !isEdit
                ? <Grid container component="a" direction="column" alignContent={alignContent} alignItems="center" href={value} target="_blank" style={{ textDecoration: "none", fontSize: 15, fontWeight: "normal" }}>
                    <Grid item component="i" className={`fa fa-${fileType}`} style={{ fontSize: 64, textShadow: "1px 1px 2px #888888" }}></Grid>
                    <Grid item>Open here</Grid>
                </Grid>
                : <>
                    <div class={classes.label}>{id}</div>
                </>
        }
        {isEdit && authGroup === "admin"
            ? <div style={{ textAlign: "center" }}>
                {value
                    ? <Button variant="contained" color="secondary" onClick={handleDropClick}>Remove File</Button>
                    : <>
                        <input
                            {...props}
                            id={id}
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        <Button variant="contained" onClick={() => window.document.querySelector(`#${id}`).click()}>Browse</Button>
                        {isManual
                            ? <>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant="contained" color="primary" onClick={handleUploadClick}>Upload</Button>
                            </>
                            : <></>
                        }
                    </>
                }
            </div>
            : <></>
        }
    </>
}

//container
/**
 * (Container Component) Allows files to be uploaded to firebase store
 * @param id - element id
 * @param value - element value
 * @param filename - upload filename
 * @param liftState - document lift state
 * @param isEdit - edit mode [true | false]
 * @param isManual - manual upload [true | false]
 * @param fileType - file type [img | pdf]
 * @param maxWidth - maximum width
 * @param alignContent - align content flex
 * @param handleUploadFile - upload file function
 * @param handleDropFile - delete file function
 * @param props - props extra
 * @return JSX component
 */
export default ({ id, value, filename, liftState, isEdit, isManual, fileType, maxWidth, alignContent, handleUploadFile, handleDropFile, ...props }) => {
    const { field, handleFieldChange } = useFieldState(id, value, liftState);
    const [file, setFile] = useState({});

    function handleFileChange(event) {
        setFile(event.target.files[0]);

        //live preview
        const img = document.querySelector(`img.for-${id}`);
        const reader = new FileReader();

        if (img) {
            reader.onloadend = () => {
                img.src = reader.result;
            }

            event.target.files[0]
                ? reader.readAsDataURL(event.target.files[0])
                : img.src = "";
        }
    }

    function handleUploadClick(event) {
        event.preventDefault();

        const onSuccess = (url) => {
            handleFieldChange({
                target: {
                    id,
                    value: url
                }
            });
        }

        handleUploadFile(filename, file, onSuccess);
    }

    function handleDropClick(event) {
        event.preventDefault();

        const onSuccess = () => {
            handleFieldChange({
                target: {
                    id,
                    value: ""
                }
            });
        }

        handleDropFile(filename, onSuccess);
    }

    return FileUploader({
        ...props,
        data: {
            id,
            value: field[id],
            isEdit,
            isManual,
            fileType: fileType || "img",
            maxWidth,
            alignContent: alignContent || "flex-start"
        },
        control: {
            handleFileChange,
            handleUploadClick,
            handleDropClick
        },
        render: {}
    });
}