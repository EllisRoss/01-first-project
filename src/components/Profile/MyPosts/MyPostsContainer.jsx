import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let addPost = () => {
        props.dispatch(addPostActionCreator());
    };

    let onPostChange = (text) => {
        props.dispatch(updateNewPostTextActionCreator(text));
    };

    return (
        <MyPosts addPost={addPost}
                 updateNewPostText={onPostChange}
                 posts={props.posts}
                 newPostText={props.newPostText}/>
    );
};

export default MyPostsContainer;
