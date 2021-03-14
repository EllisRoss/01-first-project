import React from "react";
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";

const maxLength30 = maxLengthCreator(30);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostBody'}
                       component={TextArea}
                       placeholder={'Enter post message'} validate={[requiredField, maxLength30]}/>
            </div>
            <button>Add post</button>
        </form>
    );
}

const MyPostsReduxForm = reduxForm({form: 'ProfileAddNewPostsForm'})(AddNewPostForm);


const MyPosts = React.memo(props => {
    let postElements = props.posts.map(
        post => <Post key={post.id}
                      profile={props.profile}
                      message={post.message}
                      likeCount={post.likesCount}
                      dislikeCount={post.dislikesCount}/>
    );

    let addPost = (formData) => {
        props.addPost(formData.newPostBody);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <MyPostsReduxForm onSubmit={addPost}/>

            <div className={style.posts}>
                {[...postElements].reverse()}
            </div>
        </div>
    );
});

export default MyPosts;
