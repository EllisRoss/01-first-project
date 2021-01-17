import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";

// const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state = store.getState().profilePage;
//                     let addPost = () => {
//                         store.dispatch(addPostActionCreator());
//                     };
//
//                     let onPostChange = (text) => {
//                         store.dispatch(updateNewPostTextActionCreator(text));
//                     };
//                     return (
//                         <MyPosts addPost={addPost}
//                                  updateNewPostText={onPostChange}
//                                  posts={state.posts}
//                                  newPostText={state.newPostText}/>
//                     );
//                 }
//             }
//         </StoreContext.Consumer>
//     );
// };

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    };
}; // Название менять нельзя

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text));
        },
    }
}; // Название менять нельзя

const MyPostsContainer = connect(mapStateToProps,
    mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
