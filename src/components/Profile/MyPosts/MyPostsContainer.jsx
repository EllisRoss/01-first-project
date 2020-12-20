import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().profilePage;
                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    };

                    let onPostChange = (text) => {
                        store.dispatch(updateNewPostTextActionCreator(text));
                    };
                    return (
                        <MyPosts addPost={addPost}
                                 updateNewPostText={onPostChange}
                                 posts={state.posts}
                                 newPostText={state.newPostText}/>
                    );
                }
            }
        </StoreContext.Consumer>
    );
};

export default MyPostsContainer;
