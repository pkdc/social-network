import { useContext, useState } from "react";
import SmallButton from "../UI/SmallButton";
import { WebSocketContext } from "../store/websocket-context";
import Avatar from "../UI/Avatar";
import { GroupsContext } from "../store/groups-context";

const JoinGroupReqNotiItem = (props) => {
    const wsCtx = useContext(WebSocketContext);
    const grpCtx = useContext(GroupsContext);
    const [isVisible, setIsVisible] = useState(true);


    const grp = grpCtx.groups.find((grp) => grp.id === props.groupId);
    console.log("join grp (noti): ", grp);
    const grpTitle = grp["title"];
    console.log("grp title (noti): ", grpTitle);

    const acceptJoinReqHandler = () => {
        setIsVisible(false);
        console.log("request accepted: ");
        const notiReplyPayloadObj = {};
        notiReplyPayloadObj["label"] = "noti";
        notiReplyPayloadObj["id"] = Date.now();
        notiReplyPayloadObj["type"] = "join-req-reply";
        notiReplyPayloadObj["sourceid"] = props.targetId;
        notiReplyPayloadObj["targetid"] = props.srcUser.id;
        notiReplyPayloadObj["groupid"] = grp.id;
        notiReplyPayloadObj["accepted"] = true;
        console.log("gonna send reply (accept) to join req : ", notiReplyPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));
    };
    const declineJoinReqHandler = () => {
        setIsVisible(false);
        console.log("request declined: ");
        const notiReplyPayloadObj = {};
        notiReplyPayloadObj["label"] = "noti";
        notiReplyPayloadObj["id"] = Date.now();
        notiReplyPayloadObj["type"] = "join-req-reply";
        notiReplyPayloadObj["sourceid"] = props.targetId;
        notiReplyPayloadObj["targetid"] = props.srcUser.id;
        notiReplyPayloadObj["groupid"] = grp.id;
        notiReplyPayloadObj["accepted"] = false;
        console.log("gonna send reply (decline) to join req : ", notiReplyPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(notiReplyPayloadObj));
    };

    console.log("props.groupid (join)", props.grouptitle);

    return (
        <div>
            {isVisible && (
                <div>
                    <Avatar height={50} width={50}></Avatar>
                    <h3>{`${props.srcUser.fname} ${props.srcUser.lname} wants to join ${grpTitle}`}</h3>
                    <SmallButton onClick={acceptJoinReqHandler}>Accept</SmallButton>
                    <SmallButton onClick={declineJoinReqHandler}>Decline</SmallButton>
                </div>
            )}
        </div>
    );
};

export default JoinGroupReqNotiItem;