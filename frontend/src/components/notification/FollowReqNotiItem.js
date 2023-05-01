import { useContext } from "react";
import SmallButton from "../UI/SmallButton";
import { WebSocketContext } from "../store/websocket-context";
import Avatar from "../UI/Avatar";

const FollowReqNotiItem = (props) => {
    const wsCtx = useContext(WebSocketContext);

    const acceptFollowReqHandler = () => {
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
            <Avatar height={50} width={50}></Avatar>
            <h3>{`${props.srcUser.fname} ${props.srcUser.lname} wants to follow you`}</h3>
            <SmallButton onClick={acceptFollowReqHandler}>Accept</SmallButton>
            <SmallButton onClick={declineFollowReqHandler}>Decline</SmallButton>
        </div>
    );
};

export default FollowReqNotiItem;