import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {UserType} from "./../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of users id
};

type InitialStateType = typeof initialState;

const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
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

type ActionTypes = FollowActionType | UnfollowActionType | SetUsersActionType
    | SetCurrentPageActionType | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType | ToggleIsFollowingProgressActionType

const toggleIsFollowingProgress = (state: InitialStateType, progressVal: boolean, userId: number) => {
    return {
        ...state,
        followingInProgress: progressVal
            ? [...state.followingInProgress, userId]
            : state.followingInProgress.filter(id => id !== userId),
    }
};
const toggleIsFetching = (state: InitialStateType, fetchingVal: boolean) => {
    return {
        ...state,
        isFetching: fetchingVal,
    }
};
const setTotalUsersCount = (state: InitialStateType, usersCount: number) => {
    return {
        ...state,
        totalUsersCount: usersCount,
    }
}
const setCurrentPage = (state: InitialStateType, pageNumber: number) => {
    return {
        ...state,
        currentPage: pageNumber,
    };
};
const follow = (state: InitialStateType, userId: number) => {
    return {
        ...state,
        users: updateObjectInArray(state.users, userId, "id", {followed: true})
    };
};
const unfollow = (state: InitialStateType, userId: number) => {
    return {
        ...state,
        users: updateObjectInArray(state.users, userId, "id", {followed: false})
    };
};
const setUsers = (state: InitialStateType, users: Array<UserType>) => {
    return {
        ...state,
        users: [...users],
    };
};

// Follow action creator
type FollowActionType = {
    type: typeof FOLLOW,
    userId: number
}
export const followAC = (userId: number): FollowActionType => ({type: FOLLOW, userId});

// Unfollow action creator
type UnfollowActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowAC = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId});

// SetUsers action creator
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsersAC = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});

// SetCurrentPage action creator
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    pageNumber: number,
}
export const setCurrentPageAC = (pageNumber: number): SetCurrentPageActionType => (
    {type: SET_CURRENT_PAGE, pageNumber}
);

// SetTotalUsersCount action creator
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    usersCount: number,
}
export const setTotalUsersCountAC = (usersCount: number): SetTotalUsersCountActionType => (
    {type: SET_TOTAL_USERS_COUNT, usersCount}
);

// toggleIsFetching action creator
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    fetchingVal: boolean
}
export const toggleIsFetchingAC = (fetchingVal: boolean): ToggleIsFetchingActionType => (
    {type: TOGGLE_IS_FETCHING, fetchingVal}
);

// ToggleIsFollowingProgress action creator
type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    progressVal: boolean,
    userId: number,
}
export const toggleIsFollowingProgressAC = (progressVal: boolean, userId: number):
    ToggleIsFollowingProgressActionType => (
    {type: TOGGLE_IS_FOLLOWING_PROGRESS, progressVal, userId}
);


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));
        let payload = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUsersAC(payload.items));
        dispatch(setTotalUsersCountAC(payload.totalCount));
        dispatch(toggleIsFetchingAC(false));
    };

type followUnfollowFlowACType = (userId: number) => FollowActionType | UnfollowActionType;
const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>,
                                   apiMethod: any, actionCreator:  followUnfollowFlowACType,
                                   userID: number) => {
    dispatch(toggleIsFollowingProgressAC(true, userID));
    let response = await apiMethod(userID);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(toggleIsFollowingProgressAC(false, userID));
}

export const unfollowThunkCreator = (userID: number): ThunkType =>
    async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = unfollowAC;
        await _followUnfollowFlow(dispatch, apiMethod, actionCreator, userID);
    }

export const followThunkCreator = (userID: number): ThunkType =>
    async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = followAC;
        await _followUnfollowFlow(dispatch, apiMethod, actionCreator, userID);
    }

export default usersReducer;