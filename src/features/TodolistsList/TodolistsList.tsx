import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Grid, Paper} from "@material-ui/core";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType,
} from "../TodolistsList/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses, TasksType} from '../../api/tasks-api';
import {ToDoList} from './Todolist/ToDoList';
import {addTaskTC, removeTaskTC, updateTaskTC} from './tasks-reducer';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';

export type TaskStateType = {
    [key: string]: Array<TasksType>
}
export type TodolistsListPropsType = {
    todolists: Array<TodolistDomainType>
    demo?: boolean
}


export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    const dispatch = useDispatch();

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback(( id: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskTC(taskId, {status}, todoListID));
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(updateTaskTC(taskId, {title: newTitle}, todoListID));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        const action = changeTodolistFilterAC(value, todoListID);
        dispatch(action);
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const thunk = removeTodolistsTC(todoListID);
        dispatch(thunk);
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <ToDoList
                                    todolist={tl}
                                    key={tl.id}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>

                    })
                }
            </Grid>
        </>
    )
}
