import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreator} from "../../../redux/profileReducer";

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
        posts: state.profilePage.posts,
    };
}; // Название менять нельзя

let mapDispatchToProps = {
    addPost: addPostActionCreator,
}; // Название менять нельзя

const MyPostsContainer = connect(mapStateToProps,
    mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
