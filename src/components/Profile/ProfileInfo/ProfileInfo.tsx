import React, {ChangeEvent} from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileData from "./ProfileData/ProfileData";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType;
    setUserAvatar: (newUserAvatar: File) => void;
    userStatus: string;
    updateUserStatus: (newStatus: string) => void;
    isOwner: boolean;
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    if (!props.profile) {
        return (<Preloader/>);
    }

    let onSelectMainPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        //debugger
        if (event.target.files?.length) {
            let file = event.target.files[0];
            props.setUserAvatar(file);
        }
    }


    return (
        <ProfileData onSelectMainPhoto={onSelectMainPhoto}
                     profile={props.profile}
                     userStatus={props.userStatus}
                     updateUserStatus={props.updateUserStatus}
                     isOwner={props.isOwner}/>
    );

}


export default ProfileInfo;
