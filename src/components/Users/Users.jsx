import React from "react";
import defaultAva from '../../assets/images/defaultAva.png'
import styles from './Users.module.css';
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";


const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div className={styles.pageNumbers}>
                {pages.map(p => {
                    return <span className={props.currentPage === p && styles.selectedPage}
                                 onClick={(e) => {
                                     props.setCurrentPage(p)
                                 }}>{p} </span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                        <div className={styles.userItem}>
                            <NavLink to={'/profile/' + u.id}>
                                <div className={styles.userInfo}>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                    <div>{'u.location.country'}</div>
                                    <div>{'u.location.city'}</div>
                                </div>
                                <div>
                                    <img alt={'user\'s avatar'} src={u.photos.small != null ? u.photos.small : defaultAva}
                                         className={styles.userPhoto}/>
                                </div>
                            </NavLink>
                        </div>
                        <div className={styles.followButton}>
                            {
                                u.followed
                                    ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                        props.follow(u.id)}}>Follow</button>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Users;