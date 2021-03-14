import React from "react"
import Paginator from "../common/Paginator/Paginator"
import User from "./User"
import {UserType} from "../../types/types"

type PropsType = {
    currentPage: number
    followingInProgress: Array<number>
    pageSize: number
    setCurrentPage: (pageNumber: number) => void
    totalUsersCount: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    users: Array<UserType>
}

const Users: React.FC<PropsType> = (props) => {
    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       setCurrentPage={props.setCurrentPage} portionSize={15}/>
            {
                props.users.map(u => <User key={u.id}
                                           user={u}
                                           follow={props.follow}
                                           unfollow={props.unfollow}
                                           followingInProgress={props.followingInProgress}/>
                )
            }
        </div>
    )
}

export default Users