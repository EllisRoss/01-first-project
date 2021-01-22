import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator, getUsersThunkCreator,
    toggleIsFollowingProgressAC,
    unfollowThunkCreator
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

// let Users = (props) => {
//
//     let getUsers = () => {
//         if (props.users.length === 0) {
//             axios.get("https://social-network.samuraijs.com/api/1.0/users")
//                 .then(response => {
//                     props.setUsers(response.data.items);
//                 });
//
//             // props.setUsers([
//             //         {
//             //             id: 1,
//             //             photoUrl: defaultAva,
//             //             followed: true,
//             //             userName: 'Nastya',
//             //             status: 'Kitty',
//             //             location: {city: 'Moscow', country: 'Russia'}
//             //         },
//             //         {
//             //             id: 2,
//             //             photoUrl: defaultAva,
//             //             followed: false,
//             //             userName: 'Tony',
//             //             status: 'Lazanya',
//             //             location: {city: 'Moscow', country: 'Russia'}
//             //         },
//             //         {
//             //             id: 3,
//             //             photoUrl: defaultAva,
//             //             followed: false,
//             //             userName: 'Mark',
//             //             status: 'gg wp',
//             //             location: {city: 'Moscow', country: 'Russia'}
//             //         },
//             //         {
//             //             id: 4,
//             //             photoUrl: defaultAva,
//             //             followed: false,
//             //             userName: 'Alfred',
//             //             status: ';)',
//             //             location: {city: 'Moscow', country: 'Russia'}
//             //         },
//             //         {
//             //             id: 5,
//             //             photoUrl: defaultAva,
//             //             followed: false,
//             //             userName: 'James',
//             //             status: 'i like football',
//             //             location: {city: 'Moscow', country: 'Russia'}
//             //         },
//             //         {
//             //             id: 6,
//             //             photoUrl: defaultAva,
//             //             followed: false,
//             //             userName: 'Nastya',
//             //             status: 'I am a boss',
//             //             location: {city: 'Minsk', country: 'Belarus'}
//             //         },
//             //     ]
//             // )
//         }
//     }
//
//     return (
//         <div>
//             <button onClick={getUsers}>Get Users</button>
//             {
//                 props.users.map(u => <div key={u.id}>
//                 <span>
//                     <div>
//                         <img src={u.photos.small != null ? u.photos.small : defaultAva}
//                              className={styles.userPhoto}/>
//                     </div>
//                     <div>
//                         {u.followed
//                             ? <button onClick={() => {
//                                 props.unfollow(u.id)
//                             }}>Unfollow</button>
//                             : <button onClick={() => {
//                                 props.follow(u.id)
//                             }}>Follow</button>}
//
//                     </div>
//                 </span>
//                     <span>
//                     <span>
//                         <div>{u.name}</div>
//                         <div>{u.status}</div>
//                     </span>
//                     <span>
//                         {/*<div>{u.location.country}</div>*/}
//                         {/*<div>{u.location.city}</div>*/}
//                     </span>
//                 </span>
//                 </div>)
//             }
//         </div>
//     );
// };

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    setCurrentPage = (pageNumber) => {
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
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}/>
        </>
    };
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (usersCount) => {
//             dispatch(setTotalUsersCountAC(usersCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         },
//     }
// }

let mapDispatchToProps = {
    toggleIsFollowingProgress: toggleIsFollowingProgressAC,
    getUsers: getUsersThunkCreator,
    unfollow: unfollowThunkCreator,
    follow: followThunkCreator,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(UsersContainer);