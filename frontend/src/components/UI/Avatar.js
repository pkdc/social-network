import styles from "./Avatar.module.css";
import profile from '../assets/profile.svg'

const Avatar = (props) => {
    const onlineStatus = false; // change this
    const defaultImagePath = "default_avatar.jpg";
    const classes = `${styles["avatar"]} ${props.className || ""}`;
    return (
        <div className={styles["wrapper"]}>
            {onlineStatus && <div className={styles["online-status-dot"]}></div>}
            {!onlineStatus && <div className={styles["offline-status-dot"]}></div>}
            {props.src && <img className={classes} src={props.src} alt={props.alt} height={props.height} width={props.width}/>}
            {!props.src && <img className={classes} src={require("../../images/"+`${defaultImagePath}`)} alt={props.alt} height={props.height} width={props.width}/>}
        </div>    
    )
};

export default Avatar;