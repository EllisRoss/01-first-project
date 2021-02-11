import {profileAPI} from "../api/api";

const ADD_POST = 'social-network/profile/ADD_POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12, dislikesCount: 2},
        {id: 2, message: 'Lazanya', likesCount: 34, dislikesCount: 0},
        {id: 3, message: 'It\'s my first post', likesCount: 5, dislikesCount: 0},
    ],
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return addPost(state, action.newPostText);
        case SET_USER_PROFILE:
            return setUserProfile(state, action.profile);
        case SET_USER_STATUS:
            return setUserStatus(state, action.status);
        case DELETE_POST:
            return deletePost(state, action.postId);
        default:
            return state;
    }
}

const deletePost = (state, postId) => {
    return {
        ...state,
        posts: state.posts.filter(post => post.id !== postId)
    }
}

const setUserStatus = (state, status) => {
    return {
        ...state,
        status: status,
    }
}

const setUserProfile = (state, profile) => {
    return {
        ...state,
        profile: profile,
    }
};

const addPost = (state, newPostText) => {
    let newPost = {
        id: 4,
        message: newPostText,
        likesCount: 0,
        dislikesCount: 0,
    };
    return {
        ...state,
        posts: [...state.posts, newPost],
    };
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatusAC = (status) => ({type: SET_USER_STATUS, status});
export const deletePostAC = (postId) => ({type: DELETE_POST, postId});

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfileAC(response.data));
}

export const getUserStatusThunkCreator = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatusAC(response.data));
}

export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
    let response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatusAC(status));
    }
}

export default profileReducer;