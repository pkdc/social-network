import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
    // const classes = `${styles["loading-spinner"]} ${styles[props.className] || ""}`;
    return (
        <div className={styles["loading-spinner"]}>
            <div className={styles["spinner"]}>
                <div className={`${styles["dot"]} ${styles["dot-1"]}`}></div>
                <div className={`${styles["dot"]} ${styles["dot-2"]}`}></div>
                <div className={`${styles["dot"]} ${styles["dot-3"]}`}></div>
                <div className={`${styles["dot"]} ${styles["dot-4"]}`}></div>
                <div className={`${styles["dot"]} ${styles["dot-5"]}`}></div>
            </div>    
        </div>
    )
};

export default LoadingSpinner;