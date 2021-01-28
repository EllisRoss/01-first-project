import React from 'react';
import {sendMessageAC} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

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
    }
};

let mapDispatchToProps = {
    sendMessage: sendMessageAC,
};

const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Dialogs);

export default DialogsContainer;