import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_USER_DATA:
            return setAuthUserData(state, action);
        default:
            return state;
    }
}

const setAuthUserData = (state, action) => {
    return {
        ...state,
        ...action.payload,
    };
};

const setAuthUserDataAC = (userId, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, email, login, isAuth}
});


export const getAuthUserDataThunkCreator = () => (dispatch) => {
    return authAPI.authMe().then(responce => {
        if (responce.resultCode === 0) {
            let {id, email, login} = responce.data;
            dispatch(setAuthUserDataAC(id, email, login,true));
        }
    });
}

export const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(responce => {
        if (responce.data.resultCode === 0) {
            dispatch(getAuthUserDataThunkCreator());
        } else {
            let message = responce.data.messages.length > 0
                ? responce.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    });
}

export const logoutThunkCreator = () => (dispatch) => {
    authAPI.logout().then(responce => {
        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null,false));
        }
    });
}
export default authReducer;