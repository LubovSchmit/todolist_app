import {Dispatch} from "redux";
import {todolistApi, TodoType} from "../api/todolists-api";

// types of AC classiques
/*export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}*/
/*export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodoType
}*/
/*export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    newTitle: string
}*/
/*export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}*/
/*export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodoType>
}*/

//types of AC generiques
export type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>


const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodoType & {
    filter: FilterValuesType
}
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.newTitle
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS' : {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state
    }
}

//Action Creators

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId}  as const)
export const addTodolistAC = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, newTitle: title} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const setTodolistAC = (todolists: Array<TodoType>) => ({type: 'SET-TODOLISTS', todolists} as const)



//Thunk Creators

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodos()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTodo(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.updateTodoTitle(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}