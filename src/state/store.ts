import {applyMiddleware, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers} from "redux";
import thunk from 'redux-thunk'




const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;


export default rootReducer;





