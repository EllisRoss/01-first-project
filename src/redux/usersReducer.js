import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return follow(state, action.userId);
        case UNFOLLOW:
            return unfollow(state, action.userId);
        case SET_USERS:
            return setUsers(state, action.users)
        case SET_CURRENT_PAGE:
            return setCurrentPage(state, action.pageNumber);
        case SET_TOTAL_USERS_COUNT:
            return setTotalUsersCount(state, action.usersCount);
        case TOGGLE_IS_FETCHING:
            return toggleIsFetching(state, action.fetchingVal);
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return toggleIsFollowingProgress(state, action.progressVal,
                action.userId);
        default:
            return state;
    }
}

const toggleIsFollowingProgress = (state, progressVal, userId) => {
    return {
        ...state,
        followingInProgress: progressVal
            ? [...state.followingInProgress, userId]
            : state.followingInProgress.filter(id => id !== userId),
    }
};

const toggleIsFetching = (state, fetchingVal) => {
    return {
        ...state,
        isFetching: fetchingVal,
    }
};

const setTotalUsersCount = (state, usersCount) => {
    return {
        ...state,
        totalUsersCount: usersCount,
    }
}

const setCurrentPage = (state, pageNumber) => {
    return {
        ...state,
        currentPage: pageNumber,
    };
};

const follow = (state, userId) => {
    return {
        ...state,
        users: state.users.map(u => {
            if (u.id === userId) {
                return {...u, followed: true}
            }
            return u;
        })
    };
};

const unfollow = (state, userId) => {
    return {
        ...state,
        users: state.users.map(u => {
            if (u.id === userId) {
                return {...u, followed: false}
            }
            return u;
        })
    };
};

const setUsers = (state, users) => {
    return {
        ...state,
        users: [...users],
    };
};

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (pageNumber) => (
    {type: SET_CURRENT_PAGE, pageNumber}
);
export const setTotalUsersCountAC = (usersCount) => (
    {type: SET_TOTAL_USERS_COUNT, usersCount}
);
export const toggleIsFetchingAC = (fetchingVal) => (
    {type: TOGGLE_IS_FETCHING, fetchingVal}
);
export const toggleIsFollowingProgressAC = (progressVal, userId) => (
    {type: TOGGLE_IS_FOLLOWING_PROGRESS, progressVal, userId}
);

export const getUsersThunkCreator = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    usersAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
        dispatch(toggleIsFetchingAC(false));
    });
};

export const unfollowThunkCreator = (userID) =>(dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userID));
    usersAPI.unfollow(userID).then(data => {
        if (data.resultCode === 0) {
            dispatch(unfollowAC(userID));
        }
        dispatch(toggleIsFollowingProgressAC(false, userID));
    });
}

export const followThunkCreator = (userID) =>(dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userID));
    usersAPI.follow(userID).then(data => {
        if (data.resultCode === 0) {
            dispatch(followAC(userID));
        }
        dispatch(toggleIsFollowingProgressAC(false, userID));
    });
}

export default usersReducer;