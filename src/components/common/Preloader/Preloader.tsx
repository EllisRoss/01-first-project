import React from "react";
import preloader from "../../../assets/images/Double-Ring-1s-200px.svg";
import styles from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={preloader}  alt="preloader"/>
        </div>
    );
}

export default Preloader;