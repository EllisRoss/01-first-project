import React, {useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import ProfileData from "./ProfileData/ProfileData";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }

    if (!props.profile) {
        return (<Preloader/>);
    }

    let onSelectMainPhoto = (event) => {
        let file = event.target.files[0];
        console.log(file);
        let newUserAvatar = new FormData();
        newUserAvatar.append('userAvatar', file);
        props.setUserAvatar(newUserAvatar);
    }


    return (
        <div>
            {
                editMode ? <ProfileDataForm deactivateEditMode={deactivateEditMode}
                                            {...props}/>
                                         : <ProfileData activateEditMode={activateEditMode}
                                                        onSelectMainPhoto={onSelectMainPhoto}
                                                        {...props}/>
            }
        </div>
    );

}


export default ProfileInfo;
