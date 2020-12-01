import React from "react";
import headerStyle from './Header.module.css'


const Header = () => {
    return (
        <header className={headerStyle.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg'
            alt='firefox logo'/>
        </header>
    );
}

export default Header;
