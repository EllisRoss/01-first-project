import React from 'react';
import ProfileSettingsForm from "./ProfileSettingsForm";

const ProfileSettings = (props) => {

    return (
        <div>
            <h3>Profile Settings</h3>
            <ProfileSettingsForm profile={props.profile} saveProfile={props.saveProfile} profileErrors={props.profileErrors}/>
        </div>
    );
}


export default ProfileSettings;