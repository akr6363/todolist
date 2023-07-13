import React, {useEffect, useState} from 'react';
import './App.css';

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import CircularProgress from "@mui/material/CircularProgress";
import {ThemeProvider} from "@mui/material";

import {Menu} from '@mui/icons-material';
import {darkTheme, lightTheme} from "../assets/styles/customTheme";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import TodoListPage from "../features/TodoListPage/TodoListPage";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC, logoutTC} from "../state/auth-reducer";
import {MaterialUISwitch} from "../components/ThemeSwitch/ThemeSwitch";


const App: React.FC = () => {

    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [isDarkMode, setDarkMode] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <ThemeProvider theme={isDarkMode ? lightTheme : darkTheme}>
                <CircularProgress color={'secondary'}/>
            </ThemeProvider>
        </div>
    }

    return (
        <BrowserRouter>
            <ThemeProvider theme={isDarkMode ?  darkTheme : lightTheme}>
                <CssBaseline/>
                <div className="App">
                    <ErrorSnackBar/>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                TodoLists
                            </Typography>
                            {/*<FormGroup>*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={<Checkbox*/}
                            {/*            onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}*/}
                            {/*        label={isDarkMode ? "Light mode" : "Dark mode"}*/}
                            {/*    />*/}
                            {/*</FormGroup>*/}
                            <MaterialUISwitch onChange={(e) => setDarkMode(e.currentTarget.checked)}/>
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                            {status === 'loading' &&
                                <LinearProgress
                                    color="secondary" sx={{position: 'absolute', left: 0, bottom: 0, width: '100%'}}
                                />}
                        </Toolbar>

                    </AppBar>
                    <Container fixed>
                        <Routes>
                            <Route path={'/'} element={<TodoListPage/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                            <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                        </Routes>
                    </Container>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
