// libs
import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1 },
    menuButton: { marginRight: theme.spacing(2) },
    title: { flexGrow: 1 }
}));

export default function MyAppBar(props) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton 
                        className={classes.menuButton} 
                        edge="start" 
                        color="inherit">
                        <Menu />
                    </IconButton>

                    <Typography 
                        className={classes.title} 
                        variant="h6">
                        {props.pageName}
                    </Typography>

                    <Button 
                        color="inherit" 
                        onClick={props.logout} >Wyloguj</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}