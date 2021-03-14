import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator, getUsersThunkCreator,
    unfollowThunkCreator
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {UserType} from "../../types/types";
import {AppStateType} from '../../redux/reduxStore';

type MapStatePropsType = {
    currentPage: number
    followingInProgress: Array<number>
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

// type OwnPropsType = {
//
// }

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    setCurrentPage = (pageNumber: number): void => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users setCurrentPage={this.setCurrentPage}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}/>
        </>
    };
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

let mapDispatchToProps: MapDispatchPropsType = {
    getUsers: getUsersThunkCreator,
    unfollow: unfollowThunkCreator,
    follow: followThunkCreator,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(UsersContainer);