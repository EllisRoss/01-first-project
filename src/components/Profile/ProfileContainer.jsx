import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator, saveProfileThunkCreator, setUserAvatarThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }
    render() {
        return (
            <>
                <Profile profile={this.props.profile}
                         userStatus={this.props.userStatus}
                         updateUserStatus={this.props.updateUserStatus}
                         isOwner={!this.props.match.params.userId}
                         setUserAvatar={this.props.setUserAvatar}
                         saveProfile={this.props.saveProfile}
                         profileErrors={this.props.profileErrors}/>
            </>
        );
    };
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    userStatus: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    profileErrors: state.settings.profileErrors,
});

let mapDispatchToProps = {
    getUserProfile: getUserProfileThunkCreator,
    getUserStatus: getUserStatusThunkCreator,
    updateUserStatus: updateUserStatusThunkCreator,
    setUserAvatar: setUserAvatarThunkCreator,
    saveProfile: saveProfileThunkCreator,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer);