import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { taskApi, TaskPriorities, TaskStatuses, UpdateTaskModelType } from '../api/tasks-api'
import {todolistApi} from '../api/todolists-api'

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Some new todolist'
        todolistApi.createTodo(title)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                alert('error - cannot create todolist')
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a2cb7246-b3a1-4109-9ec3-508e55afaa74"
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f93effd1-4a52-4d6a-be1a-05c2168f6a89'

        todolistApi.updateTodoTitle(todolistId, 'Todolist with changed title')
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}



//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'fbc1058e-e52e-41e3-a4ac-b0845aad8a2d';
        taskApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
            .catch(() => {
                alert('error in GetTasks')
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'fbc1058e-e52e-41e3-a4ac-b0845aad8a2d'
        const title = 'New task title'
        taskApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
            .catch(() => {
                alert('error in CreateTask')
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        const todolistId = 'fbc1058e-e52e-41e3-a4ac-b0845aad8a2d'
        const taskId = 'a15db7d3-7ffd-47c3-b319-b284dca380bc'
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
            .catch(() => {
                alert('error in DeleteTask')
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
<input placeholder={'todolistId'} value={todolistId} onChange={ (e) => {setTodolistId(e.currentTarget.value)}}/>
<input placeholder={'taskId'} value={taskId} onChange={ (e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>

    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2928569b-aad3-4143-8a9b-5dfc5a3b47bb'
        const taskId = '22eb25f7-711e-40fb-b53c-8cd9ea220df2'
        const model: UpdateTaskModelType = {
            description: '',
            title: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
        };
        taskApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
            .catch(() => {
                alert('error in UpdateTaskTitle')
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
