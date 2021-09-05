import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux'
import thunk from "redux-thunk";
import {v1} from 'uuid'
import {AppRootStateType} from '../../src/app/store'
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import { appReducer } from "../app/app-reducer";
import { tasksReducer } from "../features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "../features/TodolistsList/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '',
            order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '',
            order: 0, entityStatus: 'loading'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {description: '',
                id: v1(), title: 'HTML',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListID1',
                order: 0,
                addedDate: '',},
            {description: '',
                id: v1(), title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListID1',
                order: 0,
                addedDate: '',}
        ],
        ["todolistId2"]: [
            {description: '',
                id: v1(), title: 'milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListID2',
                order: 0,
                addedDate: '',},
            {description: '',
                id: v1(), title: 'bread',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListID2',
                order: 0,
                addedDate: '',}
        ]
    },
    app:{
        error: null,
        status: 'idle'
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk) );

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

function applyMiddleware(thunk: any): import("redux").StoreEnhancer<unknown, {}> | undefined {
    throw new Error("Function not implemented.");
}

