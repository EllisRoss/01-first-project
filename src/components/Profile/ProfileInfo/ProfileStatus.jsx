import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.userStatus
    }

    // _updateUserStatus(text) {
    //     this.state.statusText = text;
    // }
    //
    onStatusChange = (event) => {
        let text = event.currentTarget.value;
        this.setState({
            status: text,
        });
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateUserStatus(this.state.status);
    }



    render() {
        return (
            <>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.userStatus || 'Click to update your status'}</span>
                    </div>
                    : <div>
                        <input autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}
                               onChange={this.onStatusChange}/>
                    </div>
                }
            </>
        );
    }
};

export default ProfileStatus;