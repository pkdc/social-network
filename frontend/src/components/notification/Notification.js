import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../store/websocket-context";
import NotificationItem from "./NotificationItem";
import styles from "./Notification.module.css";

const Notification = (props) => {
    const [noti, setNoti] = useState([]);

    const wsCtx = useContext(WebSocketContext);

    useEffect(() => {
        if (wsCtx.websocket !== null && wsCtx.newNotiObj) {
            console.log("ws receives notiObj: ", wsCtx.newNotiObj);
            console.log("ws receives noti type: ", wsCtx.newNotiObj.type);
        }
    } ,[wsCtx.newNotiObj]);
    
    const acceptHandler = () => {
        console.log("request accepted: ");
    };

    const declineHandler = () => {
        console.log("request declined: ");
    };

    let description = "follow request";
    return (
        <div className={styles["container"]}>
            <NotificationItem 
            description={description}
            onAccept={acceptHandler}
            onDecline={declineHandler}
            />
        </div>
    );
};

export default Notification;