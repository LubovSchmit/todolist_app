import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TasksType} from './api/tasks-api';
import {TodoType} from './api/todolists-api';
import {FilterValuesType, TodolistDomainType} from './state/todolists-reducer';


export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>(
        {
        [todoListID1]: [
            {
                description: '',
                title: 'HTML',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListID1,
                order: 0,
                addedDate: '',
            },
            {
                description: '',
                title: 'CSS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListID1,
                order: 0,
                addedDate: '',
            },
            {
                description: '',
                title: 'JS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListID1,
                order: 0,
                addedDate: '',
            },
            {
                description: '',
                title: 'Redux',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListID1,
                order: 0,
                addedDate: '',
            }
        ],
        [todoListID2]: [
            {
                description: '',
                title: 'milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListID2,
                order: 0,
                addedDate: '',
            },
            {
                description: '',
                title: 'bread',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListID2,
                order: 0,
                addedDate: '',
            }
        ]
    })

    //BLL
    function removeTask(id: string, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasks = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListID: string) {
        let task = {description: '',
            title: title,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            id: v1(),
            todoListId: todoListID,
            order: 0,
            addedDate: '',};
                let tasks = tasksObj[todoListID]
        let newTask = [task, ...tasks]
        tasks = newTask
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, status: TaskStatuses, todoListID: string) {

        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {

        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    let removeTodoList = (todoListID: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListID]
        setTasks({...tasksObj})

    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        let todoList: TodolistDomainType = {
            id: v1(),
            filter: 'all',
            title,
            addedDate: 'string',
            order: 0,
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasksObj, [todoList.id]: []})
    }

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
                        todoLists.map((tl) => {

                            let tasksForToDoList = tasksObj[tl.id];

                            if (tl.filter === 'active') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.status===TaskStatuses.New)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.status===TaskStatuses.Completed);
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

