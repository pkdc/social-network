import styles from "./FormInput.module.css";

const FormInput = (props) => {
    return (
        <>
            {!props.className && <input className={`${styles["input"]}`}/>}
            {props.className && <input className={`${styles["input"]} ${styles[props.className]}`}/>}
        </>
    )
};

export default FormInput;