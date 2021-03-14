import { ResultCodes, ResultCodesWithCaptcha } from "../api/ResultCodeEnums"
import {UserType} from "./types";

// users API
export type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: null | string
}
export type FollowResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: {}
}

// auth API
export type AuthMeResponseType = {
    data: {
        id: number,
        email: string,
        login: string,
    },
    resultCode: ResultCodes,
    messages: Array<string>
}
export type LoginResponseType = {
    data: {
        userId: number,
    },
    resultCode: ResultCodes | ResultCodesWithCaptcha,
    messages: Array<string>
}
export type LogoutResponseType = {
    data: {},
    resultCode: ResultCodes,
    messages: Array<string>
}

// profile API
export type UpdateUserStatusResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: {}
}
export type SetUserAvatarResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: {
        photos: {
            small: string | null,
            large: string | null,
        }
    }
}
export type SaveProfileResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: {}
}

// security API
export type GetCaptchaURLResponseType = {
    url: string
}