import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        userStatus: this.props.userStatus
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                userStatus: this.props.userStatus,
            })
        }
    }

    onStatusChange = (event) => {
        let text = event.currentTarget.value;
        this.setState({
            userStatus: text,
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
        this.props.updateUserStatus(this.state.userStatus);
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
                               value={this.state.userStatus}
                               onChange={this.onStatusChange}/>
                    </div>
                }
            </>
        );
    }
};

export default ProfileStatus;