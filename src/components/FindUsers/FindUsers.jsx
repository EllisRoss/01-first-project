import React from "react";

const FindUsers = (props) => {
    let onFindChange = (event) => {
        let text = event.target.value;
        props.updateNewFindBody(text);
    };

    let onShowSearchResults = () => {
        props.showSearchResults();
    }

    let searchElements = props.findUsersPage.findUsers.map(
        user => <div>
                    <p>
                        <button>
                            follow
                        </button> {user.userName}#{user.id}
                    </p>
                </div>
    );

    return (
        <div>
            <div>
                <textarea onChange={onFindChange}
                          value={props.findUsersPage.newFindBody}/>
            </div>
            <button onClick={onShowSearchResults}>Search</button>

            <div>
                <h3>Search results</h3>
                {searchElements}
            </div>
        </div>
    );
};

export default FindUsers;