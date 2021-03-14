import {profileAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {setProfileErrorsAC, SetProfileErrorsActionType} from "./settingsReducer";
import {ResultCodes} from "../api/ResultCodeEnums";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const ADD_POST = 'social-network/profile/ADD_POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SET_USER_AVATAR = 'social-network/profile/SET_USER_AVATAR';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Lazanya', likesCount: 34},
        {id: 3, message: 'It\'s my first post', likesCount: 5},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
};

type InitialStateType = typeof initialState;
type ActionTypes = AddPostActionType | SetUserAvatarSuccessActionType
    | SetUserProfileActionType | SetUserStatusActionType
    | DeletePostActionType | SetProfileErrorsActionType;

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return addPost(state, action.newPostText);
        case SET_USER_PROFILE:
            return setUserProfile(state, action.profile);
        case SET_USER_STATUS:
            return setUserStatus(state, action.status);
        case DELETE_POST:
            return deletePost(state, action.postId);
        case SET_USER_AVATAR:
            return setUserAvatar(state, action.photos);
        default:
            return state;
    }
}

const setUserAvatar = (state: InitialStateType, photos: PhotosType): InitialStateType => {
    return {
        ...state,
        // posts: [...state.posts],
        // status: state.status,
        profile: {...state.profile, photos: photos} as ProfileType
    }
}

const deletePost = (state: InitialStateType, postId: number) => {
    return {
        ...state,
        posts: state.posts.filter(post => post.id !== postId)
    }
}

const setUserStatus = (state: InitialStateType, status: string) => {
    return {
        ...state,
        status: status,
    }
}

const setUserProfile = (state: InitialStateType, profile: ProfileType) => {
    return {
        ...state,
        profile: profile,
    }
};

const addPost = (state: InitialStateType, newPostText: string) => {
    let newPost = {
        id: 4,
        message: newPostText,
        likesCount: 0,
    };
    return {
        ...state,
        posts: [...state.posts, newPost],
    };
};

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string,
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType,
}
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    status: string,
}
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type SetUserAvatarSuccessActionType = {
    type: typeof SET_USER_AVATAR,
    photos: PhotosType,
}


export const addPostActionCreator = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});
export const setUserProfileAC = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setUserStatusAC = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status});
export const deletePostAC = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});
export const setUserAvatarSuccessAC = (photos: PhotosType): SetUserAvatarSuccessActionType => ({
    type: SET_USER_AVATAR,
    photos
});


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUserProfileThunkCreator = (userId: number | null): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfileAC(response.data));
    }

export const getUserStatusThunkCreator = (userId: number): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.getUserStatus(userId);
        dispatch(setUserStatusAC(response.data));
    }

export const updateUserStatusThunkCreator = (status: string): ThunkType =>
    async (dispatch) => {
        let response = await profileAPI.updateUserStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatusAC(status));
        }
    }

export const setUserAvatarThunkCreator = (photo: PhotosType): ThunkType =>
    async (dispatch) => {
        let payload = await profileAPI.setUserAvatar(photo);
        if (payload.resultCode === ResultCodes.Success) {
            dispatch(setUserAvatarSuccessAC(payload.data.photos));
        }
    }

export const saveProfileThunkCreator = (formData: any): ThunkType =>
    async (dispatch,
           getState) => {
        let payload = await profileAPI.saveProfile(formData);
        if (payload.resultCode === ResultCodes.Success) {
            let userId = getState().auth.userId;
            await dispatch(getUserProfileThunkCreator(userId));
            dispatch(setProfileErrorsAC(['Saved']));
        } else {
            dispatch(setProfileErrorsAC(payload.messages));
        }
    }

export default profileReducer;