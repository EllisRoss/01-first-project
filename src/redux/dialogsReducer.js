const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE'

const _ava = 'https://steamuserimages-a.akamaihd.net/ugc/250339495850728821/5F2735053134AC2FE8429D935FC70E7D7037F2C8/';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima', avatar: _ava},
        {id: 2, name: 'Andrey', avatar: _ava},
        {id: 3, name: 'Ilya', avatar: _ava},
        {id: 4, name: 'Pavel', avatar: _ava},
        {id: 5, name: 'Viktor', avatar: _ava},
        {id: 6, name: 'Timur', avatar: _ava},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Ky'},
        {id: 4, message: 'Ky'},
        {id: 5, message: 'Ky'},
        {id: 6, message: 'Ky'},
    ],
    newMessageBody: '',
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            sendMessage(state);
            return state;
        case UPDATE_NEW_MESSAGE_BODY:
            updateNewMessageBody(state, action.newText);
            return state;
        default:
            return state;
    }
};

const updateNewMessageBody = (state, newText) => {
    state.newMessageBody = newText;
};
const sendMessage = (state) => {
    let newMessage = {
        id: 7,
        message: state.newMessageBody
    };
    state.messages.push(newMessage);
    state.newMessageBody = '';
};

export const sendMessageCreator = () => ({  type: SEND_MESSAGE  });
export const updateNewMessageBodyCreator = (text) =>
    ({  type: UPDATE_NEW_MESSAGE_BODY, newText: text  });

export default dialogsReducer;