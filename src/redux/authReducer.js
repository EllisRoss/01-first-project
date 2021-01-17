const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    //isFetching: false,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_USER_DATA:
            return setAuthUserData(state, action);
        default:
            return state;
    }
}

// const toggleIsFetching = (state, fetchingVal) => {
//     return {
//         ...state,
//         isFetching: fetchingVal,
//     }
// };

const setAuthUserData = (state, action) => {
    return {
        ...state,
        ...action.data,
        isAuth: true,
    };
};

export const setAuthUserDataAC = (userId, email, login) => ({ type: SET_AUTH_USER_DATA, data: {userId, email, login} });

export default authReducer;