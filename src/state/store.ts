import {createStoreHook} from "react-redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers} from "redux";




const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})




export type AppRootStateType = ReturnType<typeof rootReducer>


export const store = createStoreHook(rootReducer as any);

// @ts-ignore
window.store = store;


export default rootReducer;
