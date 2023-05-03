import { useContext, useEffect, useState } from "react";
// import { WebSocketContext } from "../store/websocket-context";
import AllNotificationItems from "./AllNotificationItems";
import styles from "./NotificationCentre.module.css";

const NotificationCentre = (props) => {
    const [notiArr, setNotiArr] = useState([]);
    const selfId = +localStorage.getItem("user_id");

    useEffect(() => {
        console.log("props.newNoti", props.newNoti);
        props.newNoti && setNotiArr(prevArr => [... new Set([props.newNoti, ...prevArr])]);
        props.onReceivedNewNoti();
    }, [props.newNoti]);
    
    console.log("noti arr (Notification): ", notiArr);
    
    // const wsCtx = useContext(WebSocketContext);

    // let description = "follow request";
    return (
        <div className={styles["container"]}>
            <AllNotificationItems 
                notiItems={notiArr}
            />
        </div>
    );
};

export default NotificationCentre;