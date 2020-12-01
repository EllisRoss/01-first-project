import React from "react";
import profileStyle from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={profileStyle.content}>
            <div>
                <img src='https://www.captainjoeporcelli.com/wp-content/uploads/2014/06/water-1000x200.jpg'
                     alt='sea water'/>
            </div>
            <div>
                Ava + description
            </div>
            <MyPosts />
        </div>
    );
}

export default Profile;
