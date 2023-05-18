import { useState, useContext, useEffect } from "react";
import { WebSocketContext } from "../store/websocket-context";
import styles from "./Avatar.module.css";
import profile from '../assets/profile.svg'

const Avatar = (props) => {
    // const onlineStatus = false; // change this
    const [onlineStatus, setOnlineStatus] = useState(false);

    const wsCtx = useContext(WebSocketContext);

    useEffect(() => {
        console.log("Avatar online status for user (effect)", props.id, onlineStatus);
        if (wsCtx.websocket !== null && wsCtx.newOnlineStatusObj) {
            console.log("incoming Avatar online status changed", wsCtx.newOnlineStatusObj);
            console.log("ws sourceid", wsCtx.newOnlineStatusObj["sourceid"]);
            console.log("props.id", props.id);
            if (+wsCtx.newOnlineStatusObj["sourceid"] === props.id) {
                console.log("matched uid");
                setOnlineStatus(wsCtx.newOnlineStatusObj["onlinestatus"]);
            } 
        }
    },[wsCtx.newOnlineStatusObj]);

    console.log("Avatar online status for user", props.id, onlineStatus);
    
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