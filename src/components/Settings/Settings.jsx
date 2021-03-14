import React, {useState, useEffect} from "react";
import {getUserProfileThunkCreator, saveProfileThunkCreator} from "../../redux/profileReducer";
import {connect} from "react-redux";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

const GENERAL_SETTINGS = 'GENERAL_SETTINGS';
const PROFILE_SETTINGS = 'PROFILE_SETTINGS';

const Settings = (props) => {

    useEffect(() => {
        props.getUserProfile(props.authorizedUserId);
    }, [props.authorizedUserId]);

    let [settingsMode, setSettingsMode] = useState(null);

    let toggleSettings = (mode) => {
        switch (mode) {
            case GENERAL_SETTINGS:
                setSettingsMode(GENERAL_SETTINGS)
                break;
            case PROFILE_SETTINGS:
                setSettingsMode(PROFILE_SETTINGS)
                break;
            default:
                setSettingsMode(GENERAL_SETTINGS)
                break;
        }
    }

    let showSettings = () => {
        switch (settingsMode) {
            case GENERAL_SETTINGS:
                return <h3>General Settings</h3>
            case PROFILE_SETTINGS:
                return <ProfileSettings profile={props.profile}
                                        profileErrors={props.profileErrors}
                                        saveProfile={props.saveProfile}/>
            default:
                return <h3>General Settings</h3>
        }
    }


    return (
        <div>
            <h2>Settings</h2>
            <button onClick={() => toggleSettings(GENERAL_SETTINGS)}>General</button>
            <label> </label>
            <button onClick={() => toggleSettings(PROFILE_SETTINGS)}>Profile</button>

            { showSettings() }
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        authorizedUserId: state.auth.userId,
        profileErrors: state.settings.profileErrors,
    }
}
let mapDispatchToProps = {
    saveProfile: saveProfileThunkCreator,
    getUserProfile: getUserProfileThunkCreator,
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Settings);