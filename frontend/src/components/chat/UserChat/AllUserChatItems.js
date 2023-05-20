import UserChatItem from "./UserChatItem";
import { useContext, useEffect, useState } from "react";
import { FollowingContext } from "../../store/following-context";
import { WebSocketContext } from "../../store/websocket-context";
import { UsersContext } from "../../store/users-context";

const AllUserChatItems = (props) => {
    const [notiUserArr, setNotiUserArr] = useState([]);
    const followingCtx = useContext(FollowingContext);
    const wsCtx = useContext(WebSocketContext);
    console.log("ws in AllUserChatItems: ",wsCtx.websocket);
    console.log("cur user is following (AllUserChatItems)", followingCtx.following);
    // useEffect(() => usersCtx.onNewUserReg(), []);
    // console.log("users in AllUserChatItems", usersCtx.users);
    
    // const followingCtx.following = usersCtx.users.filter((user) => {
    //     if (followingCtx.following)
    //     return followingCtx.following.some((followingUser) => {
    //         // console.log("fid", followingUser.id);
    //         // console.log("uid", user.id);
    //         if (followingUser && user) return followingUser.id === user.id;
    //     });
    // });

    // add noti field to users(following) in chatNotiUserArr
    console.log(" following List (AllUserChatItems)", followingCtx.following);
    // useEffect(() => followingCtx.chatNotiUserArr && setNotiUserArr(followingCtx.chatNotiUserArr), [followingCtx.chatNotiUserArr]);
    // console.log(" chatNotiUserArr (AllUserChatItems)", followingCtx.chatNotiUserArr);
    // followingCtx.following.forEach((followingUser) => {
    //     if (followingCtx.chatNotiUserArr.find((chatNotiUser) => chatNotiUser.id === followingUser.id)) followingUser["chat_noti"] = true;
    //     else followingUser["noti"] = false;
    // });
    console.log(" following List with noti set (AllUserChatItems)", followingCtx.following);

    const usersCtx = useContext(UsersContext);
    console.log("users (chatitems)", usersCtx.users);
    let followingUids = []; // in case followingCtx.following is empty
    if (followingCtx.following) followingUids = followingCtx.following.map((following) => following.id);
    console.log("following id (chatitems)", followingUids);
    // const publicUsers = usersCtx.users.filter((user) => user.public === 1 && !followingCtx.following.includes(user));
    const publicUsers = usersCtx.users.filter((user) => user.public === 1 && !followingUids.includes(user.id));
    console.log("public users (chatitems)", publicUsers);
    
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
            if (followingCtx.following && followingCtx.following.find((follower) => follower.id === wsCtx.newMsgsObj.sourceid)) {
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
        <>
        <div >Users You Are Following:</div>
        <div>
            {followingCtx.following && followingCtx.following.map((following) => {
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
                    noti={following.chat_noti}
                    onOpenChatbox={openUserChatboxHandler}
                />}
                }
            })}
        </div>
        <div>Public Users:</div>
        <div>
            {publicUsers && publicUsers.map((publicUser) => {
                // console.log("each following", following);
                // console.log("curUserId: ", curUserId);
                // console.log("follower.id", follower.id);
                {if (curUserId !== publicUser.id) {
                    return <UserChatItem 
                    key={publicUser.id}
                    id={publicUser.id}
                    avatar={publicUser.avatar}
                    fname={publicUser.fname}
                    lname={publicUser.lname}
                    nname={publicUser.nname}
                    noti={publicUser.chat_noti}
                    onOpenChatbox={openUserChatboxHandler}
                />}
                }
            })}
        </div>
        </>
        
    );
};

export default AllUserChatItems;