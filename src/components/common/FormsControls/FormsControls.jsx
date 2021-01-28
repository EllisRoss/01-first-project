import React from "react";
import styles from "./FormControls.module.css";

export const TextArea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.form_control + " " + (hasError ? styles.error : "")}>
            <textarea {...input} {...props}/>
            {hasError && <label>{meta.error}</label>}
        </div>
    );
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.form_control + " " + (hasError ? styles.error : "")}>
            <input {...input} {...props}/>
            {hasError && <label>{meta.error}</label>}
        </div>
    );
}