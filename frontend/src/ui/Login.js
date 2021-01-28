// libs
import React, { useState } from "react";
import { Grid, Typography, CircularProgress, Button, TextField } from "@material-ui/core";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Grid container spacing={2} style={{width: 350, marginLeft: "auto", marginRight: "auto"}}>
            <Grid item xs={12}>
                <Typography 
                    variant="h5" 
                    style={{textAlign: "center"}}>
                    Formularz logowania
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="E-mail"
                    style={{width: "100%"}}
                    onChange={event => setEmail(event.target.value)} />
            </Grid>
            <Grid item xs={12}>
            <TextField
                    type="password"
                    variant="outlined"
                    label="Hasło"
                    style={{width: "100%"}}
                    onChange={event => setPassword(event.target.value)} />
            </Grid>

            <Grid item xs={4} />
            <Grid item xs={4} style={{textAlign: "center"}}>
                {props.waiting ? (
                    <CircularProgress />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.login(email, password)}>
                        Zaloguj
                    </Button>
                )}
            </Grid>
        </Grid>
    )
}