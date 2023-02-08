import styles from "./FormInput.module.css";

const FormInput = (props) => {
    let myInput = (<input className={`${styles["input"]}`}
                    onChange={props.onChange}
                    id={props.id}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    />);
    if (props.className) {
        myInput = <input className={`${styles["input"]}`}
        onChange={props.onChange}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        />;
    }
    return (
        <div className={styles["input-container"]}>
            {myInput}
        </div>
    )
};

export default FormInput;