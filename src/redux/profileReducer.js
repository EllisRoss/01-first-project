const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12, dislikesCount: 2},
        {id: 2, message: 'Lazanya', likesCount: 34, dislikesCount: 0},
        {id: 3, message: 'It\'s my first post', likesCount: 5, dislikesCount: 0},
    ],
    newPostText: 'hello',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return addPost(state);
        case UPDATE_NEW_POST_TEXT:
            return updateNewPostText(state, action.newText);
        default:
            return state;
    }
}

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
export const updateNewPostTextActionCreator = (newText) =>
    ({type: UPDATE_NEW_POST_TEXT, newText});


export default profileReducer;