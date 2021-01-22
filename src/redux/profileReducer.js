import {profileAPI} from "../api/api";
const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12, dislikesCount: 2},
        {id: 2, message: 'Lazanya', likesCount: 34, dislikesCount: 0},
        {id: 3, message: 'It\'s my first post', likesCount: 5, dislikesCount: 0},
    ],
    newPostText: 'hello',
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return addPost(state);
        case UPDATE_NEW_POST_TEXT:
            return updateNewPostText(state, action.newText);
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

const addPost = (state) => {
    let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
        dislikesCount: 0,
    };
    return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
    };
};
const updateNewPostText = (state, newText) => {
    return {
        ...state,
        newPostText: newText,
    };
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile});
export const updateNewPostTextActionCreator = (newText) =>
    ({type: UPDATE_NEW_POST_TEXT, newText});
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