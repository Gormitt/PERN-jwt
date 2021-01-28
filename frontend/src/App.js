// libs
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom"
import axios from "axios"
// context
import AuthContext from "./Auth";
// components
import AppBar from "./ui/AppBar";
import AlertBox from "./ui/AlertBox";
import LoginForm from "./ui/Login";

axios.defaults.baseURL = process.env.REACT_APP_API_URL

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState("");

    const login = (email, password) => {
        setWaiting(true);
        setError("");

        axios.post("/sessions/new", {email: email, password: password})
        .then(response => {
            setWaiting(false);
            
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
        })
        .catch(error => {
            setWaiting(false);
            setError(error.response.data.message);
            localStorage.removeItem("token");
        })
    }

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
    }

    const authContextInit = {
        isAuthenticated: token ? true : false,
        token: token
    }

    useEffect(() => {
        if (token) {
            axios.get("/sessions/check_token", {headers: {"authorize" : `Bearer ${token}`}})
            .catch(error => logout());
        }
    }, [token]);

    return (
        <AuthContext.Provider value={authContextInit}>
            <Router>
                <header>
                    {authContextInit.isAuthenticated ? (
                        <AppBar pageName="Planer Beta" logout={logout} />
                    ) : (
                        <AlertBox isError={true} message={error} />
                    )}
                </header>
                <main style={{marginTop: 50}} >
                    {authContextInit.isAuthenticated ? (
                        <Switch>
                            
                        </Switch>
                    ) : (
                        <LoginForm login={login} waiting={waiting} />
                    )}
                </main>
                <footer />
            </Router>
        </AuthContext.Provider>
    );
}