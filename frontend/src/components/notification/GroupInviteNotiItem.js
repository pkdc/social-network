import { useContext } from "react";
import SmallButton from "../UI/SmallButton";
import { WebSocketContext } from "../store/websocket-context";
import Avatar from "../UI/Avatar";

const GroupInviteNotiItem = (props) => {
    const wsCtx = useContext(WebSocketContext);

    const acceptInvitationHandler = () => {
        console.log("request accepted: ");
        const notiReplyPayloadObj = {};
        notiReplyPayloadObj["label"] = "noti";
        notiReplyPayloadObj["id"] = Date.now();
        notiReplyPayloadObj["type"] = "invitation-reply";
        notiReplyPayloadObj["sourceid"] = props.targetId;
        notiReplyPayloadObj["targetid"] = props.srcUser.id;
        notiReplyPayloadObj["accepted"] = true;
        console.log("gonna send reply (accept) to Invitation : ", notiReplyPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));
    };
    const declineInvitationHandler = () => {
        console.log("request declined: ");
        const notiReplyPayloadObj = {};
        notiReplyPayloadObj["label"] = "noti";
        notiReplyPayloadObj["id"] = Date.now();
        notiReplyPayloadObj["type"] = "invitation-reply";
        notiReplyPayloadObj["sourceid"] = props.targetId;
        notiReplyPayloadObj["targetid"] = props.srcUser.id;
        notiReplyPayloadObj["accepted"] = false;
        console.log("gonna send reply (decline) to Invitation : ", notiReplyPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));
    };
    
    return (
        <div>
            <Avatar height={50} width={50}></Avatar>
            <h3>{`${props.srcUser.fname} ${props.srcUser.lname} invites you to join his/her group`}</h3>
            <SmallButton onClick={acceptInvitationHandler}>Accept</SmallButton>
            <SmallButton onClick={declineInvitationHandler}>Decline</SmallButton>
        </div>
    );
};

export default GroupInviteNotiItem;