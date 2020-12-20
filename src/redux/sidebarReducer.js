const _ava = 'https://steamuserimages-a.akamaihd.net/ugc/250339495850728821/5F2735053134AC2FE8429D935FC70E7D7037F2C8/';

let initialState = {
    friends: [
        {id: 1, name: 'Nastya', avatar: _ava},
        {id: 2, name: 'Tommi', avatar: _ava},
        {id: 3, name: 'John', avatar: _ava},
        {id: 4, name: 'James', avatar: _ava},
    ],
};

const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;