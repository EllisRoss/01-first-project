import React from 'react';
import {DialogType, MessageType, sendMessageAC} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";


type MapStatePropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>
    }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

type MapDispatchPropsType = {
    sendMessage: (newMessage: string) => void
}
let mapDispatchToProps: MapDispatchPropsType = {
    sendMessage: sendMessageAC,
};

const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Dialogs);

export default DialogsContainer;