import React from 'react';
import styles from "../ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import defaultAvatar from "../../../../assets/images/defaultAva.png";

const ProfileData = (props) => {
    let printContacts = Object.keys(props.profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
    });
    return (
        <>
            <b className={styles.userName}>{props.profile.fullName}</b>
            <ProfileStatus userStatus={props.userStatus}
                           updateUserStatus={props.updateUserStatus}
                           isOwner={props.isOwner}/>
            <br/>
            <div className={styles.descriptionBlock}>
                <div className={styles.userAvatar}>
                    {
                        props.profile.photos.large ? <img src={props.profile.photos.large} alt="user\'s avatar"/> :
                            <img src={defaultAvatar} alt="user\'s avatar"/>
                    }
                    {props.isOwner && <input type='file' onChange={props.onSelectMainPhoto}/>}

                </div>
                <div className={styles.userDescription}>

                    <div>
                        <b>About me</b>: {props.profile.aboutMe}
                    </div>
                    <br/>
                    <div>
                        <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'Yes' : 'No'}
                    </div>
                    {
                        props.profile.lookingForAJob && <div>
                            <b>My professional skills:</b>: {props.profile.lookingForAJobDescription}
                        </div>
                    }
                    <br/>

                    <div>
                        <b>Contacts:</b> {printContacts}
                    </div>

                    <br/>
                </div>
            </div>
            {props.isOwner && <button onClick={props.activateEditMode}>Edit</button>}
        </>
    );
}

const Contact = ({contactTitle, contactValue}) => {

    // return (
    //     <div>
    //         <b className={styles.contacts}>{contactTitle}</b>: {contactValue}
    //     </div>
    // );

    // debugger
    if (contactValue && contactValue !== "") {
        return (
            <div>
                <b className={styles.contacts}>{contactTitle}</b>: {contactValue}
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}

export default ProfileData;