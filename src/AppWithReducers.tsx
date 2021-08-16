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
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer, updateTaskAC} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TasksType} from './api/tasks-api';


export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithReducers() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
        {
            id: todoListID1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: todoListID2, title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        }
    ])


    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {description: '',
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1,
                order: 0,
                addedDate: '',
            },
            {description: '',
                id: v1(), title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1,
                order: 0,
                addedDate: '',
            },
        ],
        [todoListID2]: [
            {description: '',
                id: v1(), title: 'milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2,
                order: 0,
                addedDate: '',
            },
            {description: '',
                id: v1(), title: 'bread',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2,
                order: 0,
                addedDate: '',
            },
        ],
    })

    //BLL
    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatchToTasksReducer(action);
    }

    function addTask(title: string, todoListID: string) {

        const action = addTaskAC({

            todoListId: todoListID,
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description:'',
            order: 0,
            priority: 0,
            startDate: '',
            id: 'id exists'

        });
        dispatchToTasksReducer(action);
    }

    function changeStatus(id: string, status: TaskStatuses, todoListID: string) {
        const action = updateTaskAC(id, {status}, todoListID);
        dispatchToTasksReducer(action);
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        const action = updateTaskAC(taskId, {title : newTitle}, todoListID);
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
        const action = addTodolistAC({
            id:v1(),
            addedDate:'',
            order: 0,
            title: title

        });
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
                                tasksForToDoList = tasksForToDoList.filter((t: { status: TaskStatuses; }) => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = tasksForToDoList.filter((t: { status: TaskStatuses; }) => t.status === TaskStatuses.Completed);
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

