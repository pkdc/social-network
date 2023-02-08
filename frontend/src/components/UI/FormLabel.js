import styles from "./FormLabel.module.css";

const FormLabel = (props) => {
    return (
        <div className={styles["label-container"]}>
            {!props.className && <label className={`${styles["label"]}`} htmlFor={props.htmlFor}>{props.children}</label>}
            {props.className && <label className={`${styles["label"]} ${styles[props.className]}`} htmlFor={props.htmlFor}>{props.children}</label>}
        </div>
    )
};

export default FormLabel;