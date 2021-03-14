import {getAuthUserDataThunkCreator} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

type InitialStateType = {
    initialized: boolean,
}

type ActionTypes = InitializedSuccessActionType;

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return setInitialized(state);
        default:
            return state;
    }
}

const setInitialized = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        initialized: true,
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS,
}

export const initializedSuccessAC = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const setInitializedThunkCreator = (): ThunkType =>
    async (dispatch) => {
        await dispatch(getAuthUserDataThunkCreator());
        dispatch(initializedSuccessAC());
    }
export default appReducer;