import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../store/websocket-context";
import AllNotificationItems from "./AllNotificationItems";
import styles from "./Notification.module.css";

const Notification = (props) => {
    const [notiArr, setNotiArr] = useState([]);
    useEffect(() => {
        console.log("props.newNoti", props.newNoti);
        props.newNoti && setNotiArr(prevArr => [... new Set([props.newNoti, ...prevArr])]);
        // props.onAdded();
    }, [props.newNoti]);
    
    console.log("noti arr (Notification): ", notiArr);
    
    const acceptHandler = () => {
        console.log("request accepted: ");
    };

    const declineHandler = () => {
        console.log("request declined: ");
    };

    // let description = "follow request";
    return (
        <div className={styles["container"]}>
            <AllNotificationItems 
                notiItems={notiArr}
                acceptHandler={acceptHandler}
                declineHandler={declineHandler}
            />
            {/* <NotificationItem 
            // description={description}
            onAccept={acceptHandler}
            onDecline={declineHandler}
            /> */}
        </div>
    );
};

export default Notification;