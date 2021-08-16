import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {TaskPriorities, TaskStatuses } from "../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '',
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '',
            order: 0}
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState );

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

