import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

// const DialogsContainer = (props) => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state = store.getState();
//                     let sendMessage = () => {
//                         store.dispatch(sendMessageCreator());
//                     }
//
//                     let updateNewMessageBody = (text) => {
//                         store.dispatch(updateNewMessageBodyCreator(text));
//                     }
//                     return (
//                         <Dialogs state={state.dialogsPage}
//                                  updateNewMessageBody={updateNewMessageBody}
//                                  sendMessage={sendMessage}/>
//                     );
//                 }
//             }
//         </StoreContext.Consumer>
//     );
// };

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
}; // Название менять нельзя

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (text) => {
            dispatch(updateNewMessageBodyCreator(text));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
    }
}; // Название менять нельзя

const DialogsContainer = connect(mapStateToProps,
    mapDispatchToProps)(Dialogs);

export default DialogsContainer;