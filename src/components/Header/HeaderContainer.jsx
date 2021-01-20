import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataThunkCreator} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authMe();
    }

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
    authMe: getAuthUserDataThunkCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);