import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let sendMessage = () => {
                        store.dispatch(sendMessageCreator());
                    }

                    let updateNewMessageBody = (text) => {
                        store.dispatch(updateNewMessageBodyCreator(text));
                    }
                    return (
                        <Dialogs state={state.dialogsPage}
                                 updateNewMessageBody={updateNewMessageBody}
                                 sendMessage={sendMessage}/>);
                }
            }
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;