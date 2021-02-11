import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       setCurrentPage={props.setCurrentPage}/>
            {
                props.users.map(u => <User key={u.id}
                                           user={u}
                                           followed={props.followed}
                                           follow={props.follow}
                                           unfollow={props.unfollow}
                                           followingInProgress={props.followingInProgress}/>
                )
            }
        </div>
    );
}

export default Users;