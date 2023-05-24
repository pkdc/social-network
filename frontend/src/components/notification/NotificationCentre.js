import { useContext, useEffect, useState } from "react";
// import { WebSocketContext } from "../store/websocket-context";
import AllNotificationItems from "./AllNotificationItems";
import styles from "./NotificationCentre.module.css";
import { AuthContext } from "../store/auth-context";


const NotificationCentre = (props) => {
    console.log("localstorage: ", typeof (localStorage.getItem("new_notif")))
    const authCtx = useContext(AuthContext);
    console.log("allnotifications: ",authCtx.notif)

    const [notiArr, setNotiArr] = useState([]);
    const selfId = +localStorage.getItem("user_id");
    console.log("------PROP :", props)
    useEffect(() => {
        setNotiArr(authCtx.notif)
    }, []);
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
                <div onClick={props.onClose} >X</div>
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