import React from 'react';
import styles from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    // return array of dialogs
    let dialogsElements = props.state.dialogs.map (
        dialog => <DialogItem avatar={dialog.avatar} name={dialog.name} id={dialog.id} />
    );
    // return array of messages
    let messagesElements = props.state.messages.map (
        message => <Message message={message.message}/>
    );

    let newMessage = React.createRef();

    let sendMessage = () => {
        let text = newMessage.current.value;
        alert(text);
    }

    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_item}>
                {dialogsElements}
            </div>

            <div className={styles.message_history}>
                {messagesElements}

                <textarea ref={newMessage}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Dialogs;