import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

type MapStateProps = {
    isAuth: boolean;
    login: string | null;
}
type MapDispatchProps = {
    logout: () => void
}

class HeaderContainer extends React.Component<MapStateProps & MapDispatchProps> {


    render() {
        return <Header isAuth={this.props.isAuth}
                       login={this.props.login}
                       logout={this.props.logout}/>;
    }
}

let mapStateToProps = (state: AppStateType): MapStateProps => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

let mapDispatchToProps: MapDispatchProps = {
    logout: logoutThunkCreator,
};

export default connect<MapStateProps, MapDispatchProps, {},
    AppStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer);