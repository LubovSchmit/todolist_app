import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import ErrorSnackbars from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import { AppRootStateType } from './store';
import { RequestStatusType } from './app-reducer';

type PropsType = {
    demo?: boolean
}

//UI
export function App({demo=false}:PropsType ) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state)=> state.app.status)
    return (
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
                    <Button color='inherit'>Login</Button>
                </Toolbar>
                { status === 'loading'  && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodolistsList todolists = {[]} demo = {demo}/>
            </Container>
        </div>
    );
}





