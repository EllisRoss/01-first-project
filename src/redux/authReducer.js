import {authAPI} from "../api/api";

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
        ...action.data,
        isAuth: true,
    };
};

export const getAuthUserDataThunkCreator = () => (dispatch) => {
    authAPI.authMe().then(responce => {
        if (responce.resultCode === 0) {
            let {id, email, login} = responce.data;
            dispatch(setAuthUserDataAC(id, email, login));
        }
    });
}

export const setAuthUserDataAC = (userId, email, login) => ({ type: SET_AUTH_USER_DATA, data: {userId, email, login} });

export default authReducer;