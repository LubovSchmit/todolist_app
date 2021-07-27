import React, {useReducer} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


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

export function AppWithReducers() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    // @ts-ignore
    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, )

    //BLL
    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatchToTasksReducer(action);
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID);
        dispatchToTasksReducer(action);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListID);
        dispatchToTasksReducer(action);
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todoListID);
        dispatchToTasksReducer(action);
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = changeTodolistFilterAC(value, todoListID);
        dispatchToTodoListsReducer(action);
    }

    let removeTodoList = (todoListID: string) => {
        const action = removeTodolistAC(todoListID);
        dispatchToTodoListsReducer(action);
        dispatchToTasksReducer(action);
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatchToTodoListsReducer(action);
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodoListsReducer(action);
        dispatchToTasksReducer(action);
    }

//UI
    return (

        <div className='App'>
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todoLists.map((tl) => {

                            let tasksForToDoList = tasksObj[tl.id];

                            if (tl.filter === 'active') {
                                tasksForToDoList = tasksForToDoList.filter((t: { isDone: any; }) => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = tasksForToDoList.filter((t: { isDone: any; }) => t.isDone);
                            }


                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList

                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForToDoList}
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

