import React from "react";
import defaultAva from '../../assets/images/defaultAva.png'
import styles from './Users.module.css';
import {NavLink} from "react-router-dom";


const User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <div className={styles.userItem}>
                <NavLink to={'/profile/' + user.id}>
                    <div className={styles.userInfo}>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </div>
                    <div>
                        <img alt={'user\'s avatar'} src={user.photos.small != null ? user.photos.small : defaultAva}
                             className={styles.userPhoto}/>
                    </div>
                </NavLink>
            </div>
            <div className={styles.followButton}>
                {
                    user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>
                }
            </div>
        </div>
    );
}

export default User;