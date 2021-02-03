import React from "react";
import styles from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import defaultAvatar from "../../../assets/images/defaultAva.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return (<Preloader/>);
    }
    return (
        <div>
            <div className={styles.descriptionBlock}>
                <div className={styles.userAvatar}>
                    {
                        props.profile.photos.large ? <img src={props.profile.photos.large} /> : <img src={defaultAvatar} />
                    }
                </div>
                <div className={styles.userDescription}>
                    <div><h3>{props.profile.fullName}</h3></div>
                    <ProfileStatusWithHooks userStatus={props.userStatus}
                                   updateUserStatus={props.updateUserStatus}/>
                    <br/>
                    <div>About me:</div>
                    <div>{props.profile.aboutMe}</div>
                    <br/>
                    <div>Job:</div>
                    <div>{props.profile.lookingForAJobDescription}</div>
                    <br/>
                    <div>Contacts:</div>
                    <div>{props.profile.contacts.facebook}</div>
                    <div>{props.profile.contacts.github}</div>
                    <div>{props.profile.contacts.instagram}</div>
                    <div>{props.profile.contacts.mainLink}</div>
                    <div>{props.profile.contacts.twitter}</div>
                    <div>{props.profile.contacts.vk}</div>
                    <div>{props.profile.contacts.website}</div>
                    <div>{props.profile.contacts.youtube}</div>
                    <br/>
                </div>
            </div>
        </div>
    );

}

export default ProfileInfo;
