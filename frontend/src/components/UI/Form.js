import React from "react";
import styles from "./Form.module.css";

const Form = (props) => {
    return (
        <>
            {!props.className && <form className={`${styles["form"]}`}>{props.children}</form>}
            {props.className && <form className={`${styles["form"]} ${styles[props.className]}`}>{props.children}</form>}
        </>
    )

};

export default Form;