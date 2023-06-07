import styles from './NotificationItem.module.css'
import { useContext, useState } from "react";
import SmallButton from "../UI/SmallButton";
import { WebSocketContext } from "../store/websocket-context";
import Avatar from "../UI/Avatar";

const FollowReqNotiItem = (props) => {
    const wsCtx = useContext(WebSocketContext);
    const [isVisible, setIsVisible] = useState(true);

    const acceptFollowReqHandler = () => {
        setIsVisible(false);

        console.log("request accepted: ");
        const notiReplyPayloadObj = {};
        notiReplyPayloadObj["label"] = "noti";
        notiReplyPayloadObj["id"] = Date.now();
        notiReplyPayloadObj["type"] = "follow-req-reply";
        notiReplyPayloadObj["sourceid"] = props.targetId;
        notiReplyPayloadObj["targetid"] = props.srcUser.id;
        notiReplyPayloadObj["accepted"] = true;
        console.log("gonna send reply (accept) to fol req : ", notiReplyPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));

    };
    const declineFollowReqHandler = () => {
        setIsVisible(false);

        console.log("request declined: ");
        const notiReplyPayloadObj = {};
        notiReplyPayloadObj["label"] = "noti";
        notiReplyPayloadObj["id"] = Date.now();
        notiReplyPayloadObj["type"] = "follow-req-reply";
        notiReplyPayloadObj["sourceid"] = props.targetId;
        notiReplyPayloadObj["targetid"] = props.srcUser.id;
        notiReplyPayloadObj["accepted"] = false;
        console.log("gonna send reply (decline) to fol req : ", notiReplyPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));
    };

    return (
        <div>
            {isVisible && (
                <div>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <Avatar height={50} width={50}></Avatar>
                        </div>
                        <div className={styles.mid}>
                            <div>{`${props.srcUser.fname} ${props.srcUser.lname} wants to follow you`}</div>
                            <div className={styles.btn}>
                                <SmallButton onClick={acceptFollowReqHandler}>Accept</SmallButton>
                                <SmallButton onClick={declineFollowReqHandler}>Decline</SmallButton>
                            </div>
                        </div>
                        <div className={styles.right}>
                        {/* <div className={styles.notif}></div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default FollowReqNotiItem;