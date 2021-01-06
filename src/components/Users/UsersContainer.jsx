import React from 'react';
import {connect} from "react-redux";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";

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
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items);
                    this.props.setTotalUsersCount(response.data.totalCount);
                });
        }
    }

    setCurrentPage = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return <Users setCurrentPage={this.setCurrentPage}
                      totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      users={this.props.users}/>
    };
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (usersCount) => {
            dispatch(setTotalUsersCountAC(usersCount));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);