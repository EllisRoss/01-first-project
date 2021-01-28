import React from "react";
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostBody'}
                       component={'textarea'}
                       placeholder={'Enter post message'}/>
            </div>
            <button>Add post</button>
        </form>
    );
}

const MyPostsReduxForm = reduxForm({form: 'ProfileAddNewPostsForm'})(AddNewPostForm);

const MyPosts = (props) => {
    let postElements = props.profilePage.posts.map(
        post => <Post message={post.message}
                      likeCount={post.likesCount}
                      dislikeCount={post.dislikesCount}
                      key={post.id}/>
    );

    let addPost = (formData) => {
        console.log(formData)
        props.addPost(formData.newPostBody);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <MyPostsReduxForm onSubmit={addPost}/>

            <div className={style.posts}>
                {postElements}
            </div>
        </div>
    );
}

export default MyPosts;
