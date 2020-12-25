import React from "react";
import style from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postElements = props.profilePage.posts.map(
        post => <Post message={post.message}
                      likeCount={post.likesCount}
                      dislikeCount={post.dislikesCount}
                      key={post.id}/>
    );

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (event) => {
        let text = event.target.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.profilePage.newPostText}/>
                </div>
                <button onClick={ onAddPost }>Add post</button>
            </div>

            <div className={style.posts}>
                {postElements}
            </div>
        </div>
    );
}

export default MyPosts;
