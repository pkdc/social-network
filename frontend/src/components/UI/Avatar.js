import styles from "./Avatar.module.css";

const Avatar = (props) => {
    const classes = `${styles["avatar"]} ${props.className || ""}`;
    return (
        <div className={styles["wrapper"]}>
            {props.online && <div className={styles["online-status-dot"]}></div>}
            {!props.online && <div className={styles["offline-status-dot"]}></div>}
            <img className={classes} src={props.src} alt={props.alt} height={props.height} width={props.width} />
        </div>    
    )
};

export default Avatar;