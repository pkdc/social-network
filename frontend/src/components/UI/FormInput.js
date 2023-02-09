import styles from "./FormInput.module.css";

const FormInput = (props) => {
    let renderInput = (<input className={`${styles["input"]}`}
                    onChange={props.onChange}
                    id={props.id}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    />);
    if (props.className) {
        renderInput = <input className={`${styles["input"]} ${styles[props.className]}}`}
        onChange={props.onChange}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        />;
    }
    return (
        <div className={styles["input-container"]}>
            {renderInput}
        </div>
    )
};

export default FormInput;