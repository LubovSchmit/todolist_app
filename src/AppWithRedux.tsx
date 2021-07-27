import React, {useCallback} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';

import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
   } from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
/*import {v1} from "uuid";*/


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    /*let todolistId1 = v1();
    let todolistId2 = v1();*/


    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

    //BLL
    const removeTask = useCallback((id: string, todoListID: string) =>  {
        dispatch(removeTaskAC(id, todoListID));
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) =>  {
        dispatch(addTaskAC(title, todoListID));
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListID: string) =>  {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListID));
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) =>  {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) =>  {
        const action = changeTodolistFilterAC(value, todoListID);
        dispatch(action);
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodolistAC(todoListID);
        dispatch(action);
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) =>  {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action);
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
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

