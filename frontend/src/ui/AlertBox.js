// libs
import React from "react";
import { Alert } from "@material-ui/lab";
// styles
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    AlertBox: {
        marginTop: 30,
        width: 450,
        minHeight: 48,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
    }
});

export default function AlertBox(props) {
    const classes = useStyles();
    const severity = props.isError ? "error" : "success";
    
    return(
        <div className={classes.AlertBox}>
            {props.message && <Alert severity={severity}>{props.message}</Alert>}
        </div>
    )
}