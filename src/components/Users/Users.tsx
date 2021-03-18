import React, {useEffect} from "react"
import Paginator from "../common/Paginator/Paginator"
import User from "./User"
import Preloader from "../common/Preloader/Preloader";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followThunkCreator, getUsersThunkCreator} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type PropsType = {
}

const Users: React.FC<PropsType> = React.memo((props) => {
    //console.log("Render Users");
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const isFetching = useSelector(getIsFetching);
    const filter = useSelector(getFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
    }, []);

    const onPageChanged = (pageNumber: number): void => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType): void => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    }
    const follow = (userId: number): void => {
        dispatch(followThunkCreator(userId));
    }
    const unfollow = (userId: number): void => {
        dispatch(followThunkCreator(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged} portionSize={15}/>
            {isFetching ? <Preloader/> : null}
            {
                users.map(u => <User key={u.id}
                                           user={u}
                                           follow={follow}
                                           unfollow={unfollow}
                                           followingInProgress={followingInProgress}/>
                )
            }
        </div>
    )
})

export default compose<React.ComponentType>(
    WithAuthRedirect,
)(Users);