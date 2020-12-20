import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let sendMessage = () => {
        props.dispatch(sendMessageCreator());
    }

    let updateNewMessageBody = (text) => {
        props.dispatch(updateNewMessageBodyCreator(text));
    }

    return (
        <Dialogs state={props.state}
                 updateNewMessageBody={updateNewMessageBody}
                 sendMessage={sendMessage} />
    );
};

export default DialogsContainer;