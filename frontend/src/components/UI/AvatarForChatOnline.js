import Avatar from "./Avatar";
import styles from "./AvatarForChatOnline.module.css";

const AvatarForChatOnline = (props) => {
    const classes = `${styles["avatar"]} ${props.className || ""}`;
    return (
        <div className={styles["wrapper"]}>
            <div className={styles["online-status-dot"]}></div>
            <Avatar className={classes} src={props.src} alt={props.alt} height={props.height} width={props.width}/>
        </div>
    );
};

export default AvatarForChatOnline;