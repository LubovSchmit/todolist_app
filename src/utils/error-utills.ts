import { Dispatch } from "react";
import { CommonResponseTaskType } from "../api/tasks-api";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, RequestStatusType, SetAppStatusActionType} from "../app/app-reducer";

export const handleServerAppError = <T>(data:CommonResponseTaskType<T>, dispatch: Dispatch<SetAppErrorActionType|SetAppStatusActionType>) => {

    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'));
}

export const handleServerNetworkError=(error: { message: string }, dispatch: Dispatch<SetAppErrorActionType|SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message :'Some error occurred'))
    dispatch(setAppStatusAC('failed'));

}