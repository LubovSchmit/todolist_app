import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}


export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.changeTaskTitle, props.todolistId])

    return <div key={props.task.id}
                className={props.task.isDone ? 'is-done' : ''}>

        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.isDone}
            color='primary'
        />

        <EditableSpan title={props.task.title}
                      onChange={onTitleChangeHandler}
        />

        <IconButton aria-label="Delete" onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})