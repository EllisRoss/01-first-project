import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer";

class HeaderContainer extends React.Component {


    render() {
        return <Header {...this.props}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

let mapDispatchToProps = {
    logout: logoutThunkCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);