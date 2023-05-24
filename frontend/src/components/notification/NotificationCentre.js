import { useContext, useEffect, useState } from "react";
// import { WebSocketContext } from "../store/websocket-context";
import AllNotificationItems from "./AllNotificationItems";
import styles from "./NotificationCentre.module.css";

const NotificationCentre = (props) => {
    const [notiArr, setNotiArr] = useState([]);
    const selfId = +localStorage.getItem("user_id");
console.log("------PROP :", props)
    useEffect(() => {
        console.log("props.newNoti", props.newNoti);
        props.newNoti && setNotiArr(prevArr => [... new Set([props.newNoti, ...prevArr])]);
        // props.onReceivedNewNoti();
    }, [props.newNoti]);
    
    console.log("noti arr (Notification): ", notiArr);
    
    // const wsCtx = useContext(WebSocketContext);

    // let description = "follow request";
    return (
        // <div className={styles.overlay} onClick={props.onClose}>
        <div className={styles.modalContainer} >
            <div className={styles.label}>
                <div>Notifications</div>
                <div  onClick={props.onClose} >X</div>
            </div>
        {/* <div className={styles["container"]}> */}
            <AllNotificationItems 
                notiItems={notiArr}
                onClose={props.onClose}
            />
        </div>
        // </div>
    );
};

export default NotificationCentre;