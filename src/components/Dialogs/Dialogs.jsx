import React from 'react';
import styles from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    debugger;
    // return array of dialogs
    let dialogsElements = props.state.dialogs.map (
        dialog => <DialogItem avatar={dialog.avatar}
                              name={dialog.name}
                              id={dialog.id}
        />
    );
    // return array of messages
    let messagesElements = props.state.messages.map (
        message => <Message message={message.message}/>
    );

    let newMessageBody = props.state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (event) => {
        let text = event.target.value;
        props.updateNewMessageBody(text);
    }

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