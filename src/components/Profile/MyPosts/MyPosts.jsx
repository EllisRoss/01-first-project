import React from "react";
import myPostsStyle from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            <div>
                My Posts
            </div>
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>

            <div className={myPostsStyle.posts}>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}

export default MyPosts;
