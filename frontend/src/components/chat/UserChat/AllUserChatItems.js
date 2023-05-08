import UserChatItem from "./UserChatItem";
import { useContext, useEffect, useState } from "react";
import { FollowingContext } from "../../store/following-context";
import { WebSocketContext } from "../../store/websocket-context";

const AllUserChatItems = (props) => {

    const followingCtx = useContext(FollowingContext);
    const wsCtx = useContext(WebSocketContext);
    console.log("ws in AllUserChatItems: ",wsCtx.websocket);
    console.log("cur user is following (AllUserChatItems)", followingCtx.following);
    // useEffect(() => usersCtx.onNewUserReg(), []);
    // console.log("users in AllUserChatItems", usersCtx.users);
    
    // const followingList = usersCtx.users.filter((user) => {
    //     if (followingCtx.following)
    //     return followingCtx.following.some((followingUser) => {
    //         // console.log("fid", followingUser.id);
    //         // console.log("uid", user.id);
    //         if (followingUser && user) return followingUser.id === user.id;
    //     });
    // });

    const followingList = followingCtx.following;
    console.log(" following List (AllUserChatItems)", followingList);
 
    const openUserChatboxHandler = (followingId) => props.onOpenChatbox(followingId);

    // if (wsCtx.websocket !== null) wsCtx.websocket.onmessage = (e) => {
    //     console.log("msg event when chatbox is closed: ", e);
    //     const msgObj = JSON.parse(e.data);
    //     console.log("ws receives msgObj when chatbox is closed:: ", msgObj);
    //     console.log("ws receives msg when chatbox is closed:: ", msgObj.message);
    //     followingCtx.receiveMsgFollowing(msgObj.sourceid, false);
    // }

    useEffect(() => {
        if (wsCtx.websocket !== null && wsCtx.newMsgsObj) {
            // console.log(wsCtx.newMsgsObj.sourceid);
            // console.log(followingCtx.following.find((follower) => follower.id === wsCtx.newMsgsObj.sourceid));
            if (followingCtx.following.find((follower) => follower.id === wsCtx.newMsgsObj.sourceid)) {
                console.log("new Received msg data when chatbox is closed", wsCtx.newMsgsObj);
                console.log("ws receives msg from when chatbox is closed: ", wsCtx.newMsgsObj.sourceid);
                wsCtx.newMsgsObj !== null && wsCtx.setNewMsgsObj(null);
                followingCtx.receiveMsgFollowing(wsCtx.newMsgsObj.sourceid, false);
            } else {
                console.log("Cur user is not following the msg sender");
            }
        }
    }, [wsCtx.newMsgsObj])

    const curUserId = +localStorage.getItem("user_id");
    return (
        <div>
            {followingList && followingList.map((following) => {
                // console.log("each following", following);
                // console.log("curUserId: ", curUserId);
                // console.log("follower.id", follower.id);
                {if (curUserId !== following.id) {
                    return <UserChatItem 
                    key={following.id}
                    id={following.id}
                    avatar={following.avatar}
                    fname={following.fname}
                    lname={following.lname}
                    nname={following.nname}
                    onOpenChatbox={openUserChatboxHandler}
                />}
                }
            })}
        </div>
    );
};

export default AllUserChatItems;