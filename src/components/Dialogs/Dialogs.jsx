import React from 'react';
import styles from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {
    // return array of dialogs
    let dialogsElements = props.dialogsPage.dialogs.map (
        dialog => <DialogItem avatar={dialog.avatar}
                              name={dialog.name}
                              id={dialog.id}
                              key={dialog.id}
        />
    );
    // return array of messages
    let messagesElements = props.dialogsPage.messages.map (
        message => <Message message={message.message}
                            key={message.id}
        />
    );

    let newMessageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (event) => {
        let text = event.target.value;
        props.updateNewMessageBody(text);
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_item}>
                {dialogsElements}
            </div>

            <div className={styles.message_history}>
                <div>{ messagesElements }</div>
                <div>
                    <div>
                        <textarea value={newMessageBody}
                                  onChange={onNewMessageChange}
                                  placeholder='Enter your message'
                        />
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;