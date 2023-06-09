import GroupChatItem from "./GroupChatItem";
import { useContext, useEffect, useState } from "react";
import { JoinedGroupContext } from "../../store/joined-group-context";
import { WebSocketContext } from "../../store/websocket-context";
import styles from "./AllGroupChatItems.module.css";

const AllGroupChatItems = (props) => {
    const joinedGrpCtx = useContext(JoinedGroupContext);
    const wsCtx = useContext(WebSocketContext);
    console.log("ws in AllGrpChatItems: ",wsCtx.websocket);
    console.log("cur user has joined these groups (AllGrpChatItems): ", joinedGrpCtx.joinedGrps);

    useEffect(() => {
        if (wsCtx.websocket !== null && wsCtx.newMsgsObj) {
            console.log("sourceid  (chatitems)", wsCtx.newMsgsObj.sourceid);
            console.log("targetid  (chatitems)", wsCtx.newMsgsObj.targetid);
            // console.log(followingCtx.followingChat.find((follower) => follower.id === wsCtx.newMsgsObj.sourceid));

            if (followingCtx.followingChat && followingCtx.followingChat.find((following) => following.id === wsCtx.newMsgsObj.sourceid)) {
                // if Cur user is following the sender
                console.log("new Received msg data when chatbox is closed (following)", wsCtx.newMsgsObj);
                console.log("ws receives msg from when chatbox is closed (following): ", wsCtx.newMsgsObj.sourceid);
                wsCtx.newMsgsObj !== null && wsCtx.setNewMsgsObj(null);
                followingCtx.receiveMsgFollowing(wsCtx.newMsgsObj.sourceid, false, true);
            } else {
                console.log("Cur user is not following the msg sender nor having a public profile");
            }
        }
    }, [joinedGrpCtx.joinedGrps, wsCtx.newMsgsObj]);
    // const openUserChatboxHandler = (followingId) => props.onOpenChatbox(followingId);

    return (
        <>
        <div ><h3 className={styles["description"]}>Groups You Have Joined:</h3></div>
        <div>
            {joinedGrpCtx.joinedGrps && joinedGrpCtx.joinedGrps.map((joinedGrp) => {
                {if (curUserId !== joinedGrp.id) {
                    return <GroupChatItem 
                    key={joinedGrp.id}
                    id={joinedGrp.id}
                    title={joinedGrp.title}
                    creator={joinedGrp.creator}
                    description={joinedGrp.description}
                    // img={group.img}              
                    noti={joinedGrp.chat_noti}
                    onOpenChatbox={openGroupChatboxHandler}
                />}
                }
            })}
        </div>
        </>
    );
};

export default AllGroupChatItems;