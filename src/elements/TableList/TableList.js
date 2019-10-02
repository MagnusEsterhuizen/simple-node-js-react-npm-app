//react
import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//styles
/**
 * (Styles & Classes) Display card with icon on left side
 * @return generated classNames for component
 */
function getClasses() {
    return {
        ...(makeStyles(theme => ({
            root: {
                width: "100%"
            },
            paper: {
                marginTop: theme.spacing(3),
                width: "100%",
                overflowX: "auto",
                marginBottom: theme.spacing(2),
            },
            th: {
                color: theme.palette.text.secondary,
            },
            td: {
                color: theme.palette.text.secondary,
            }
        })))()
    }
}

//presentation
/**
 * (Presentation Component) Displays a table of list items with headings and rows
 * @param data  - data objects
 * - data[tableHead] - tableHead object
 * - data[tableRow] - tableRow object
 * @param control - control functions
 * @param render - render components
 * @param props - props extra
 * @return JSX component
 */
export const TableList = ({ data, control, render, ...props }) => {
    const { tableHead, tableRow } = data;

    const classes = getClasses();
    return <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
            <Table className={classes.table} size="small">
                {tableHead !== undefined
                    ? <TableHead>
                        <TableRow>
                            {[...Array(5).keys()].map((index) => {
                                index++;
                                if (tableHead[`col${index}`]) {
                                    return <TableCell
                                        key={index}
                                        component="th"
                                        scope="row"
                                        align={tableHead[`col${index}`].align || "right"}
                                    >
                                        {tableHead[`col${index}`].text}
                                    </TableCell>
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    : <></>
                }
                <TableBody>
                    {tableRow.map((row, idx) => {
                        return <TableRow key={idx}>
                            {[...Array(5).keys()].map((index) => {
                                index++;
                                if (row[`col${index}`]) {
                                    return <TableCell
                                        key={index}
                                        align={row[`col${index}`].align || "right"}
                                        className={classes.td}
                                    >
                                        {row[`col${index}`].text}
                                    </TableCell>
                                }
                            })}
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </Paper>
    </div>
}

//container
/**
 * (Container Component) Displays a table of list items with headings and rows
 * @param tableHead - table head object
 * @param tableRow - table row object
 * @param props - props extra
 * @return JSX component
 */
export default ({ tableHead, tableRow, ...props }) => {
    return TableList({
        ...props,
        data: {
            tableHead,
            tableRow
        },
        control: {},
        render: {},
    });
}