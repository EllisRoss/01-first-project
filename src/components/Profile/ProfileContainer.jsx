import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfileThunkCreator} from "../../redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.setUserProfile(userId);
    }

    render() {
        if (!this.props.isAuth) return (<Redirect to={'/login'}/>);
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    };
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
});

let mapDispatchToProps = {
    setUserProfile: setUserProfileThunkCreator,
};

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);