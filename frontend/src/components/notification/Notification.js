import { useContext } from "react";
import { WebSocketContext } from "../store/websocket-context";
import NotificationItem from "./NotificationItem";
import styles from "./Notification.module.css";

const Notification = (props) => {

    const wsCtx = useContext(WebSocketContext);

    if (wsCtx.websocket !== null) wsCtx.websocket.onmessage = (e) => {
        console.log("msg event: ", e);
        const msgObj = JSON.parse(e.data);
        console.log("ws receives msgObj: ", msgObj);
        console.log("ws receives msg: ", msgObj.message);
    }

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