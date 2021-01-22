import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfileThunkCreator} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.setUserProfile(userId);
    }
    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    };
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

let mapDispatchToProps = {
    setUserProfile: setUserProfileThunkCreator,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    //WithAuthRedirect,
)(ProfileContainer);