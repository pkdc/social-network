import styles from "./FormLabel.module.css";

const FormLabel = (props) => {
    return (
        <>
            {!props.className && <div className={`${styles["label"]}`}>{props.children}</div>}
            {props.className && <div className={`${styles["label"]} ${styles[props.className]}`}>{props.children}</div>}
        </>
    )
};

export default FormLabel;