import {instance} from "./todolists-api"


//API
export const taskApi = {
    getTasks(todolistId: string) {

        return instance.get<GetTaskResponseTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        debugger
        return instance.delete<CommonResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseTaskType<{ item: TasksType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    /*updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonResponseTaskType<{ item: TasksType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },*/
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseTaskType<TasksType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {model})
    }
}

//Types
export type CommonResponseTaskType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}
export type TasksType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: any;
    todoListId: string;
    order: number;
    addedDate: string;
}
export type GetTaskResponseTaskType = {
    items: Array<TasksType>,
    totalCount: number,
    error: string
}
export  type UpdateTaskModelType = {
    description: string;
    title: string;
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string;
    deadline: string;
}



