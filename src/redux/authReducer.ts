import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ResultCodes, ResultCodesWithCaptcha} from "../api/ResultCodeEnums";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const SET_AUTH_USER_DATA = 'social-network/auth/SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'social-network/auth/SET_CAPTCHA_URL';

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};
//type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return setAuthUserData(state, action.payload);
        case SET_CAPTCHA_URL:
            return setCaptchaUrl(state, action.url);
        default:
            return state;
    }
}

type ActionTypes = SetAuthUserDataActionType | SetCaptchaUrlActionType;

const setAuthUserData = (state: InitialStateType, payload: SetAuthUserDataActionPayloadType): InitialStateType => {
    return {
        ...state,
        ...payload,
    };
};

const setCaptchaUrl = (state: InitialStateType, url: string): InitialStateType => {
    return {
        ...state,
        captchaUrl: url,
    };
};

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: SetAuthUserDataActionPayloadType,
}

const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, email, login, isAuth}
});


type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    url: string,
}
const setCaptchaUrlAC = (url: string): SetCaptchaUrlActionType => ({type: SET_CAPTCHA_URL, url});


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getAuthUserDataThunkCreator = (): ThunkType => async (dispatch: any) => {
    const payload = await authAPI.authMe();
    if (payload.resultCode === ResultCodes.Success) {
        let {id, email, login} = payload.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
    }
}

export const loginThunkCreator = (email: string, password: string,
                                  rememberMe: boolean, captcha: string | null) =>
    async (dispatch: any) => {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(getAuthUserDataThunkCreator());
        } else {
            if (response.data.resultCode === ResultCodesWithCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaURLThunkCreator())
            }
            let message = response.data.messages.length > 0
                ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    }

export const getCaptchaURLThunkCreator = (): ThunkType =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaURL();
        const captchaUrl = response.data.url;
        dispatch(setCaptchaUrlAC(captchaUrl));
    }

export const logoutThunkCreator = (): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.logout();
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(setAuthUserDataAC(null, null, null, false));
        }
    }
export default authReducer;