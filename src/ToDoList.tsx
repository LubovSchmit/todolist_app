import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from './state/todolists-reducer';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TasksType } from './api/tasks-api';
import { useDispatch } from 'react-redux';
import { fetchTasksTC } from './state/tasks-reducer';


type ToDoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
}

export const ToDoList = React.memo(function (props: ToDoListPropsType) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    }, [dispatch])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, []);

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, []);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.id, props.changeTodoListTitle]);

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id
    ]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id
    ]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id
    ]);


    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton aria-label="Delete" onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                /*className={props.filter === 'all' ? 'active-filter' : ''}*/
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={"primary"}
                /*className={props.filter === 'active' ? 'active-filter' : ''}*/
                    onClick={onActiveClickHandler}
            >Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={"secondary"}
                /*className={props.filter === 'completed' ? 'active-filter' : ''}*/
                    onClick={onCompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>

})


