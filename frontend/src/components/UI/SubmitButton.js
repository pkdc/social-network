import styles from "./SubmitButton.module.css";

const SubmitButton = (props) => {
    return (
        <>
            {!props.className && <div className={`${styles["sub-btn"]}`}>{props.children}</div>}
            {props.className && <div className={`${styles["sub-btn"]} ${styles[props.className]}`}>{props.children}</div>}
        </>
    )
};

export default SubmitButton;