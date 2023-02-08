import styles from "./SubmitButton.module.css";

const SubmitButton = (props) => {
    return (
        <div className={styles["sub-btn-container"]}>
            {!props.className && <button className={`${styles["sub-btn"]}`} type={props.type} onClick={props.onClick}>{props.children}</button>}
            {props.className && <button className={`${styles["sub-btn"]} ${styles[props.className]}`} type={props.type} onClick={props.onClick}>{props.children}</button>}
        </div>
    )
};

export default SubmitButton;