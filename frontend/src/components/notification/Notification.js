import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../store/websocket-context";
import AllNotificationItems from "./AllNotificationItems";
import styles from "./Notification.module.css";

const Notification = (props) => {
    const [notiArr, setNotiArr] = useState([]);
    const selfId = +localStorage.getItem("user_id");
    useEffect(() => {
        console.log("props.newNoti", props.newNoti);
        props.newNoti && setNotiArr(prevArr => [... new Set([props.newNoti, ...prevArr])]);
        // props.onAdded();
    }, [props.newNoti]);
    
    console.log("noti arr (Notification): ", notiArr);
    
    const wsCtx = useContext(WebSocketContext);

    // const acceptHandler = () => {
    //     console.log("request accepted: ");
    //     const notiReplyPayloadObj = {};
    //     notiReplyPayloadObj["label"] = "noti";
    //     notiReplyPayloadObj["id"] = Date.now();
    //     notiReplyPayloadObj["type"] = "follow-req-reply";
    //     notiReplyPayloadObj["sourceid"] = selfId;
    //     // notiReplyPayloadObj["targetid"] = ;
    //     notiReplyPayloadObj["accepted"] = true;
    //     console.log("gonna send reply (accept) to fol req : ", notiReplyPayloadObj);
    //     if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));
    // };

    // const declineHandler = () => {
    //     console.log("request declined: ");
    //     const notiReplyPayloadObj = {};
    //     notiReplyPayloadObj["label"] = "noti";
    //     notiReplyPayloadObj["id"] = Date.now();
    //     notiReplyPayloadObj["type"] = "follow-req-reply";
    //     notiReplyPayloadObj["sourceid"] = selfId;
    //     // notiReplyPayloadObj["targetid"] = ;
    //     notiReplyPayloadObj["accepted"] = false;
    //     console.log("gonna send reply (decline) to fol req : ", notiReplyPayloadObj);
    //     if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));
    // };

    // let description = "follow request";
    return (
        <div className={styles["container"]}>
            <AllNotificationItems 
                notiItems={notiArr}
                // acceptHandler={acceptHandler}
                // declineHandler={declineHandler}
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