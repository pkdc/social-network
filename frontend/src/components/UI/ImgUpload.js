import styles from "./ImgUpload.module.css";

const ImgUpload = (props) => {
    // const classes = `${styles["lg-btn"]} ${styles[props.className] || ""}`;
    const classes = `${styles["input"]}` + " " + props.className;
    return (
        <>
            <label htmlFor={props.id} className={styles["label"]}>{props.text}</label>
            <input type="file" name={props.name} id={props.id} accept={props.accept} onChange={props.onChange} className={classes}/>
        </>
    )
};

export default ImgUpload;