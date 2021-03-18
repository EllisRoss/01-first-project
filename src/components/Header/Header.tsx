import React from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean,
    login: string,
    logout: () => void,
}

const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={styles.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg'
            alt='firefox logo'/>
            <div className={styles.loginBlock}>
                {props.isAuth
                    ? <div> {props.login}  <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Log In</NavLink>}
            </div>
        </header>
    );
}

export default Header;
