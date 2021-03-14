import _ava from './../assets/images/defaultAva.png'

type FriendType = {
    id: number,
    name: string,
    avatar: string,
}

let initialState = {
    friends: [
        {id: 1, name: 'Nastya', avatar: _ava},
        {id: 2, name: 'Tommi', avatar: _ava},
        {id: 3, name: 'John', avatar: _ava},
        {id: 4, name: 'James', avatar: _ava},
    ] as Array<FriendType>,
};

type InitialStateType = typeof initialState;

const sidebarReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    return state;
};

export default sidebarReducer;