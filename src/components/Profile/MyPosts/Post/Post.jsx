import React from "react";
import postStyle from './Post.module.css';

const Post = () => {
    return (
        <div>
            <div className={postStyle.item}>
                <div className={postStyle.avatar}>
                    <img src='https://i1.wp.com/sova.ponominalu.ru/wp-content/uploads/2019/08/ava-max.jpg?fit=2000%2C1333&ssl=1' />
                </div>
                post 1
                <div>
                    <span>Like </span>
                    <span>Dislike </span>
                </div>
            </div>
        </div>
    );
}

export default Post;
