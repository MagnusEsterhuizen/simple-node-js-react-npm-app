//material-ui
import { makeStyles } from "@material-ui/core/styles";

/**
 * (Styles & Classes) Defines common CSS styles and classes for View components
 * @return generated classNames for component
 */
export default makeStyles(theme => ({
    container: {
        padding: theme.spacing(3),
        color: theme.palette.text.secondary,
        "& a": {
            textDecoration: "none"
        }
    },
    noContainer: {
        padding: theme.spacing(0),
        color: theme.palette.text.secondary
    },
    headingMain: {
        ...theme.typography.h4,
        ...{
            color: theme.palette.primary.light,
            fontWeight: 500,
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down("xs")]: {
                textAlign: "center",
            },
        },
    },
    heading: {
        ...theme.typography.h5,
        ...{
            marginTop: 0,
            marginBottom: 0,
            fontWeight: 800
        },
    },
    subheading: {
        ...theme.typography.body1,
        ...{
            color: theme.palette.text.secondary,
            marginTop: 0,
            marginBottom: 0,
            fontWeight: 500
        },
    },
    bottomHeading: {
        ...theme.typography.subtitle1,
        ...{
            color: theme.palette.primary.light,
            margin: theme.spacing(4, 0, 3)
        },
    },
    dates: {
        ...theme.typography.subtitle2,
        ...{
            color: theme.palette.primary.light,
            textTransform: "uppercase"
        },
    },
    description: {
        ...theme.typography.body2
    },
    listContainer: {
        paddingLeft: 0,
        textAlign: "left"
    },
    list: {
        marginTop: theme.spacing(3),
        textAlign: "left"
    },
    listCaption: {
        ...theme.typography.subtitle1,
        ...{
            //color: theme.palette.secondary.main
            color: theme.palette.primary.light
        },
    },
    label: {
        marginTop: theme.spacing(3),
        textAlign: "right"
    },
    labelCaption: {
        ...theme.typography.caption,
        ...{
            //color: theme.palette.secondary.main,
            color: theme.palette.primary.light,
            borderBottom: "1px dotted"
        },
    },
    imageContainer: {
        paddingLeft: 0,
        textAlign: "center"
    },
    image: {
        ...theme.typography.body2,
        ...{
            paddingBottom: theme.spacing(2)
        },
    },
    imageCaption: {
        ...theme.typography.subtitle1,
        ...{
            //color: theme.palette.secondary.main
            color: theme.palette.primary.light
        },
    },
    chipsContainer: {
        paddingLeft: 0,
        textAlign: "right"
    },
    chips: {
        ...theme.typography.body2,
    },
    readMoreContainer: {
        paddingLeft: 0,
        textAlign: "right"
    },
    readMoreBottomRight: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    readMore: {
        ...theme.typography.body1,
        ...{
            color: theme.palette.secondary.light,
            textDecoration: "none"
        },
        cursor: "pointer"
    },
    dotDotDot: {
        color: theme.palette.text.secondary,
    }
}));