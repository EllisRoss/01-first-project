import {profileAPI} from "../api/api";
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

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
        default:
            return state;
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

export const getUserProfileThunkCreator = (userId) => (dispatch) => {
    profileAPI.getUserProfile(userId).then(data => {
        dispatch(setUserProfileAC(data));
    });
}

export const getUserStatusThunkCreator = (userId) => (dispatch) => {
    profileAPI.getUserStatus(userId).then(response => {
        dispatch(setUserStatusAC(response.data));
    });
}

export const updateUserStatusThunkCreator = (status) => (dispatch) => {
    profileAPI.updateUserStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setUserStatusAC(status));
        }
    });
}

export default profileReducer;