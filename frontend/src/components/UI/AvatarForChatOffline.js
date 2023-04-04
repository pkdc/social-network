import Avatar from "./Avatar";
import styles from "./AvatarForChatOffline.module.css";

const AvatarForChatOffline = (props) => {
    const classes = `${styles["avatar"]} ${props.className || ""}`;
    return (
        <div className={styles["wrapper"]}>
            <div className={styles["offline-status-dot"]}></div>
            <Avatar className={classes} src={props.src} alt={props.alt} height={props.height} width={props.width}/>
        </div>
    );
};

export default AvatarForChatOffline;