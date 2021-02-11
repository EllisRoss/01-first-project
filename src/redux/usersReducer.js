import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

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
        users: updateObjectInArray(state.users, userId, "id", {followed: true})
    };
};

const unfollow = (state, userId) => {
    return {
        ...state,
        users: updateObjectInArray(state.users, userId, "id", {followed: false})
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

export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsersAC(response.data.items));
    dispatch(setTotalUsersCountAC(response.data.totalCount));
    dispatch(toggleIsFetchingAC(false));
};

const followUnfollowFlow = async (dispatch, apiMethod, actionCreator, userID) => {
    dispatch(toggleIsFollowingProgressAC(true, userID));
    let response = await apiMethod(userID);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(toggleIsFollowingProgressAC(false, userID));
}

export const unfollowThunkCreator = (userID) => async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = unfollowAC;
    await followUnfollowFlow(dispatch, apiMethod, actionCreator, userID);
}

export const followThunkCreator = (userID) => async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = followAC;
    await followUnfollowFlow(dispatch, apiMethod, actionCreator, userID);
}

export default usersReducer;