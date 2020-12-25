import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {

    let path = '/dialogs/' + props.id;

    return (
        <div className={styles.dialog_items}>
            <NavLink to={path} activeClassName={styles.active}>
                <div className={styles.dialog_item}>
                    <div className={styles.itemImage}>
                        <div>
                            <img src={props.avatar}/>
                        </div>
                    </div>
                    <div className={styles.itemName}>
                        <div>
                            {props.name}
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default DialogItem;