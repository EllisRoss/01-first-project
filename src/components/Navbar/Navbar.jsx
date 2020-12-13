import React from "react";
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import FriendList from "./FriendList/FriendList";

const Navbar = (props) => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navBarMenu}>
                <div className={styles.item}>
                    <NavLink to='/profile' activeClassName={styles.active}>
                        Profile</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/dialogs' activeClassName={styles.active}>
                        Messages</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/news' activeClassName={styles.active}>
                        News</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/music' activeClassName={styles.active}>
                        Music</NavLink>
                </div>

                <br/>

                <div className={styles.item}>
                    <NavLink to='/settings' activeClassName={styles.active}>
                        Settings</NavLink>
                </div>

                <br/>

                <FriendList state={props.state}/>
            </div>
        </nav>
    );
}

export default Navbar;
