import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {

    let path = '/dialogs/' + props.id;

    return (
        <div className={styles.dialog_items}>
            <NavLink to={path} activeClassName={styles.active}>
                <img src={props.avatar}/>
                <span>{props.name}</span>
            </NavLink>
        </div>
    );
}

export default DialogItem;