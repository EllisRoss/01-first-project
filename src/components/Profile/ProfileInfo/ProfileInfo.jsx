import React from "react";
import style from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div>
            {/*<div className={style.logo}>*/}
            {/*    <img src='https://www.captainjoeporcelli.com/wp-content/uploads/2014/06/water-1000x200.jpg'*/}
            {/*         alt='sea water'/>*/}
            {/*</div>*/}
            <div className={style.descriptionBlock}>
                Ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;
