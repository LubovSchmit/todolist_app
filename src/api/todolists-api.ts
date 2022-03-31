import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '116aa66f-547d-453c-a922-c810691f6d50'
    }

})

//API
export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },
    updateTodoTitle(todoId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    }
}

//Types
export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
export type TodoType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}


