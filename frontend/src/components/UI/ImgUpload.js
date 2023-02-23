import styles from "./ImgUpload.module.css";

const ImgUpload = (props) => {
    // const classes = `${styles["lg-btn"]} ${styles[props.className] || ""}`;
    const classes = `${styles["input"]}` + " " + props.className;
    return (
        <>
            <label htmlFor={props.id} className={styles["label"]}>Upload</label>
            <input type="file" name={props.name} id={props.id} accept={props.accept} className={classes}/>
        </>
    )
};

export default ImgUpload;