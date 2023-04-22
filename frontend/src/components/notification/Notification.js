import { useContext } from "react";
import { WebSocketContext } from "../store/websocket-context";
import styles from "./Notification.module.css";

const Notification = (props) => {

    const wsCtx = useContext(WebSocketContext);

    if (wsCtx.websocket !== null) wsCtx.websocket.onmessage = (e) => {
        console.log("msg event: ", e);
        const msgObj = JSON.parse(e.data);
        console.log("ws receives msgObj: ", msgObj);
        console.log("ws receives msg: ", msgObj.message);
    }

    return (
        <div className={styles["container"]}>

        </div>
    );
};

export default Notification;