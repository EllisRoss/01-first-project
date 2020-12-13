import React from 'react';
import styles from './FriendList.module.css';

const FriendList = (props) => {
    let getFriendList = props.state.friends.map(
        friend => <div className={styles.item}>
            <img src={friend.avatar}/>
            <div>{friend.name}</div>
        </div>
    );

    return(
        <div className={styles.friends}>
            <h3>Friends</h3>
            <div className={styles.items}>
                {getFriendList}
            </div>
        </div>
    );
};

export default FriendList;