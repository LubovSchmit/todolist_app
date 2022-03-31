
import { authApi } from "../api/auth-api"
import { setIsLoggedInAC } from "../features/Login/auth-reducer"

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    initialised: true
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALISED":
            return {...state, initialised: action.value}
        default:
            return {...state}
    }
}


//action creators

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialisedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALISED', value} as const)

//thunk creator
export const initialisedAppTC = ( ) =>(dispatch: any) =>{
authApi.me().then(res => {
    if(res.data.resultCode === 0){
        dispatch(setIsLoggedInAC(true))

    } else {

    }
    dispatch(setAppInitialisedAC(true))
})
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    //true if apply is initialised
    initialised: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
| ReturnType<typeof setAppInitialisedAC>


