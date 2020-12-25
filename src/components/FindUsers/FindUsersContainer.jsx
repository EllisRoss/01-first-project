import React from "react";
import {showSearchResultsActionCreator, updateNewFindBodyActionCreator} from "../../redux/findUsersReducer";
import {connect} from "react-redux";
import FindUsers from "./FindUsers";


let mapStateToProps = (state) => {
    return {
        findUsersPage: state.findUsersPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        showSearchResults: () => {
            dispatch(showSearchResultsActionCreator());
        },
        updateNewFindBody: (text) => {
            dispatch(updateNewFindBodyActionCreator(text));
        },
    }
};

const FindUsersContainer = connect(mapStateToProps,
    mapDispatchToProps)(FindUsers);

export default FindUsersContainer;