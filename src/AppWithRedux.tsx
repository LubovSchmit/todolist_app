import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType,
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TasksType} from './api/tasks-api';
import {v1} from 'uuid';

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithRedux() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchTodolistsTC())
            }, [])

    //BLL
    const removeTask = useCallback((todoListID: string, id: string) =>  {
        dispatch(removeTaskTC(todoListID, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) =>  {
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) =>  {
        dispatch(updateTaskTC(taskId, {status}, todoListID));
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) =>  {
        dispatch(updateTaskTC(taskId, {title: newTitle}, todoListID));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) =>  {
        const action = changeTodolistFilterAC(value, todoListID);
        dispatch(action);
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const thunk = removeTodolistsTC(todoListID);
        dispatch(thunk);
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, title: string) =>  {
        const thunk = changeTodolistTitleTC(id, title);
        dispatch(thunk);
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodolistsTC(title);
        dispatch(thunk);
    }, [dispatch])

//UI
    return (

        <div className='App'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge='start' color='inherit'> {/*aria-label='menu'*/}
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map((tl) => {

                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList

                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

