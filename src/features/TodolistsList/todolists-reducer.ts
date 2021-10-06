import {Dispatch} from "redux";
import {todolistApi, TodoType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType, setAppErrorAC, SetAppErrorActionType} from "../../app/app-reducer";
import { handleServerAppError } from "../../utils/error-utills";


const initialState: Array<TodolistDomainType> = []


//Reducer:
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS' :
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        default:
            return state
    }
}


//Action Creators
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    newTitle: title
} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const changeTodolistEntityStatusAC = (status: RequestStatusType, id: string) => ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
export const setTodolistAC = (todolists: Array<TodoType>) => ({type: 'SET-TODOLISTS', todolists} as const)


//Thunk Creators
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistApi.getTodos()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
                dispatch(setAppStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerAppError(error, dispatch);
            })

    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'));

        dispatch(changeTodolistEntityStatusAC('loading', todolistId));

        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'));
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistApi.createTodo(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'));
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistApi.updateTodoTitle(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}


// types of AC classiques
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistAC>
//types generiques
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodoType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
