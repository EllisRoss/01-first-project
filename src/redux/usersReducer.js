const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [ ]
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return follow(state, action.userId);
        case UNFOLLOW:
            return unfollow(state, action.userId);
        case SET_USERS:
            return setUsers(state, action.users)
        default:
            return state;
    }
}

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

export const followAC = (userId) => ({type: FOLLOW, userId })
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({type: SET_USERS, users })

export default usersReducer;