const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
const UPDATE_NEW_FIND_BODY = 'UPDATE_NEW_FIND_BODY';

let initialState = {
    users: [
        {id: 1, userName: 'Nastya'},
        {id: 2, userName: 'Tony'},
        {id: 3, userName: 'Mark'},
        {id: 4, userName: 'Alfred'},
        {id: 5, userName: 'James'},
        {id: 6, userName: 'Nastya'},
        {id: 7, userName: 'Nastya'},
        {id: 8, userName: 'Nastya'},
    ],
    findUsers: [],
    newFindBody: '',
};

const findUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SEARCH_RESULTS:
            return showSearchResults(state, action.findBodyText);
        case UPDATE_NEW_FIND_BODY:
            return updateNewFindBody(state, action.findBodyText);
        default:
            return state;
    }
}

const updateNewFindBody = (state, newText) => {
    return {
        ...state,
        newFindBody: newText,
    };
};

const showSearchResults = (state) => {
    return {
        ...state,
        findUsers: _findUsers(state),
        newFindBody: '',
    }
}

const _findUsers = (state) => {
    let results = [];
    for (let i = 0; i < state.users.length; i++) {
        if (state.newFindBody === state.users[i].userName) {
            results.push(state.users[i]);
        }
    }
    return results;
}

export const showSearchResultsActionCreator = () =>
    ({type: SHOW_SEARCH_RESULTS});

export const updateNewFindBodyActionCreator = (text) =>
    ({type: UPDATE_NEW_FIND_BODY, findBodyText: text});

export default findUsersReducer;