import axios from 'axios'
import {CommonResponseType, instance} from "./todolists-api"



//API
export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId?:number}>>('auth/login', data)
    },
    me() {
        return instance.get<CommonResponseType<{id: number, email: string, login:string}>>('auth/me')
    },
    logout(){
        return instance.delete<CommonResponseType<{userId?:number}>>('auth/me')
    }
}

//Types

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
}


