import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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

export function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'meat', isDone: false},
            {id: v1(), title: 'milk', isDone: true}
        ]
    })

    //BLL
    function removeTask(id: string, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListID] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListID]
        let newTask = [task, ...tasks]
        tasksObj[todoListID] = newTask
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
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
        /*setTodoLists(todoLists.filter(tl => tl.id !=id);
        delete tasks[id]
        setTasks({...tasks})*/
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        let todoList: TodolistType = {
            id: v1(),
            filter: 'all',
            title
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
                                tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone);
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

