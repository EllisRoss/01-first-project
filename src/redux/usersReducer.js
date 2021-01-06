const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

let initialState = {
    users: [ ],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return follow(state, action.userId);
        case UNFOLLOW:
            return unfollow(state, action.userId);
        case SET_USERS:
            return setUsers(state, action.users)
        case SET_CURRENT_PAGE:
            return setCurrentPage(state, action.pageNumber);
        case SET_TOTAL_USERS_COUNT:
            return setTotalUsersCount(state,action.usersCount);
        default:
            return state;
    }
}

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
        users: state.users.map( u =>  {
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
        users: state.users.map( u =>  {
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

export const followAC = (userId) => ({type: FOLLOW, userId });
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({type: SET_USERS, users });
export const setCurrentPageAC = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber });
export const setTotalUsersCountAC = (usersCount) => ({type: SET_TOTAL_USERS_COUNT, usersCount });
export default usersReducer;