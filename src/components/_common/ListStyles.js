//material-ui
import { makeStyles } from "@material-ui/core/styles";

/**
 * (Styles & Classes) Defines common CSS styles and classes for List components
 * @return generated classNames for component
 */
export default makeStyles(theme => ({
    divider: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        backgroundColor: "#e0e0e0"
    },
    dividerNoLine: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: "transparent"
    },
    breakBefore:{
        pageBreakBefore : "always"
    },
    breakAfter:{
        pageBreakAfter : "always"
    }
}));
