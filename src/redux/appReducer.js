import {getAuthUserDataThunkCreator} from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED:
            return setInitialized(state);
        default:
            return state;
    }
}

const setInitialized = (state) => {
    return {
        ...state,
        initialized: true,
    }
}

export const setInitializedAC = () => ({type: SET_INITIALIZED});
export const setInitializedThunkCreator = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataThunkCreator());
    promise.then(() =>{
        dispatch(setInitializedAC());
    })
}
export default appReducer;