import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import ErrorSnackbars from '../components/ErrorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {initialisedAppTC, RequestStatusType} from './app-reducer';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { logoutTC } from '../features/Login/auth-reducer';

type PropsType = {
    demo?: boolean
}

//UI
export function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const initialised = useSelector<AppRootStateType, boolean>((state) => state.app.initialised)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialisedAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!initialised) {
        return <div style={{position: 'fixed', top: '30%', left: '50%', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <BrowserRouter>
            <div className='App'>
                <ErrorSnackbars/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge='start' color='inherit'>
                            <Menu/>
                        </IconButton>
                        <Typography variant='h6'>
                            News
                        </Typography>
                        {isLoggedIn && <Button color='inherit' onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistsList todolists={[]} demo={demo}/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    );
}





