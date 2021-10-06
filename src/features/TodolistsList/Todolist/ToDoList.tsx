import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TasksType} from '../../../api/tasks-api';
import {useDispatch, useSelector} from 'react-redux';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {Task} from './Task/Task';
import {fetchTasksTC} from '../tasks-reducer';
import { AppRootStateType } from '../../../app/store';
import { RequestStatusType } from '../../../app/app-reducer';


type ToDoListPropsType = {
    todolist: TodolistDomainType
        tasks: Array<TasksType>
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
        removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    demo?: boolean
}

export const ToDoList = React.memo(function ({demo = false, ...props}: ToDoListPropsType) {


    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, []);

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todolist.id)
    }, []);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodoListTitle]);

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id
    ]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id
    ]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id
    ]);


    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan title={props.todolist.title} onChange={changeTodoListTitle}/>
            <IconButton aria-label="Delete" onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />

        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.todolist.id}
                    key={t.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                /*className={props.filter === 'all' ? 'active-filter' : ''}*/
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                    color={"primary"}
                /*className={props.filter === 'active' ? 'active-filter' : ''}*/
                    onClick={onActiveClickHandler}
            >Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                    color={"secondary"}
                /*className={props.filter === 'completed' ? 'active-filter' : ''}*/
                    onClick={onCompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>

})
