import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <>
            <ProfileInfo profile={props.profile}
                         userStatus={props.userStatus}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         setUserAvatar={props.setUserAvatar}
                         saveProfile={props.saveProfile}
                         profileErrors={props.profileErrors}/>
            <MyPostsContainer />
        </>
    );
};

export default Profile;
