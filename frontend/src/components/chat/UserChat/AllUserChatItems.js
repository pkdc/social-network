import UserChatItem from "./UserChatItem";
import { useContext, useEffect, useState } from "react";
import { FollowingContext } from "../../store/following-context";
import { WebSocketContext } from "../../store/websocket-context";
import { UsersContext } from "../../store/users-context";
import styles from "./AllUserChatItems.module.css";

const AllUserChatItems = (props) => {
    const followingCtx = useContext(FollowingContext);
    const wsCtx = useContext(WebSocketContext);
    console.log("ws in AllUserChatItems: ",wsCtx.websocket);
    console.log("cur user is following (AllUserChatItems)", followingCtx.following);

    // add noti field to users(following) in chatNotiUserArr
    console.log(" following List (AllUserChatItems)", followingCtx.following);
    console.log(" following List with noti set (AllUserChatItems)", followingCtx.following);

    const usersCtx = useContext(UsersContext);
    console.log("users (chatitems)", usersCtx.users);
    // const [followingUids, setFollowingUids] = useState([]); // in case followingCtx.following is empty
    // const [followingCtx.otherListedChatUsers, followingCtx.setfollowingCtx.otherListedChatUsers] = useState([]);
    // let followingCtx.otherListedChatUsersUids = []; // in case it is empty
    // const [followingCtx.otherListedChatUsersUids, followingCtx.setotherListedChatUsersUids] = useState([]);
    // const publicUsers = usersCtx.users.filter((user) => user.public === 1 && !followingCtx.following.includes(user));
    // let followingCtx.otherListedChatUsers = usersCtx.users.filter((user) => user.public === 1 && !followingUids.includes(user.id));
    useEffect(() => {
        console.log("public users from ctx", usersCtx.publicUsers);
        let followingUids = [];
        let otherListedChatUsersUids = [];
        if (followingCtx.following) followingUids = followingCtx.following.map((following) => following.id);
        // pot bug
        // this clears prev public-private convo
        console.log("followingCtx.otherListedChatUsers (chatitems)", followingCtx.otherListedChatUsers);
        if (followingCtx.otherListedChatUsers) otherListedChatUsersUids = followingCtx.otherListedChatUsers.map((otherListedChatUser) => otherListedChatUser.id);
        console.log("otherListedChatUsersUids (chatitems)", otherListedChatUsersUids);
        if (wsCtx.websocket !== null && wsCtx.newMsgsObj) {
            console.log("sourceid  (chatitems)", wsCtx.newMsgsObj.sourceid);
            console.log("targetid  (chatitems)", wsCtx.newMsgsObj.targetid);
            // console.log(followingCtx.following.find((follower) => follower.id === wsCtx.newMsgsObj.sourceid));

            if (followingCtx.following && followingCtx.following.find((following) => following.id === wsCtx.newMsgsObj.sourceid)) {
                // if Cur user is following the sender
                console.log("new Received msg data when chatbox is closed (following)", wsCtx.newMsgsObj);
                console.log("ws receives msg from when chatbox is closed (following): ", wsCtx.newMsgsObj.sourceid);
                wsCtx.newMsgsObj !== null && wsCtx.setNewMsgsObj(null);
                followingCtx.receiveMsgFollowing(wsCtx.newMsgsObj.sourceid, false, true);
            } else if (!followingUids.includes(wsCtx.newMsgsObj.sourceid) && otherListedChatUsersUids.includes(wsCtx.newMsgsObj.sourceid)) { 
                // Cur user is not following the sender, but sender is already on the other users list
                console.log("new Received msg data when chatbox is closed (public)", wsCtx.newMsgsObj);
                console.log("ws receives msg from when chatbox is closed (public): ", wsCtx.newMsgsObj.sourceid);
                wsCtx.newMsgsObj !== null && wsCtx.setNewMsgsObj(null);
                followingCtx.receiveMsgFollowing(wsCtx.newMsgsObj.sourceid, false, false);
            } else if (!followingUids.includes(wsCtx.newMsgsObj.sourceid) && !otherListedChatUsersUids.includes(wsCtx.newMsgsObj.sourceid)) {
                // Cur user is not following the sender, and sender is not on the other users list yet
                console.log("new Received msg data when chatbox is closed (public, from private)", wsCtx.newMsgsObj);
                console.log("ws receives msg  when chatbox is closed (public, from private): ", wsCtx.newMsgsObj.sourceid);
                const privateSender = usersCtx.users.find((user) => user.id === wsCtx.newMsgsObj.sourceid);
                if (privateSender && !followingCtx.otherListedChatUsers.some(chatUser => chatUser.id === privateSender.id)) {
                    followingCtx.setOtherListedChatUsers((prevList) => [privateSender, ...prevList]);
                }
            } else {
                console.log("Cur user is not following the msg sender nor having a public profile");
            }
        }
    }, [usersCtx.users, followingCtx.following, wsCtx.newMsgsObj, followingCtx.otherListedChatUsers.length]);

    // private chat notification list after login
    useEffect(() => {
        fetch("http://localhost:8080/private-chat-notification")
            .then(resp => resp.json())
            .then(data => {
                    console.log(data)

            }).catch(err => {
                console.log(err)
            })
    }, [])
    
    console.log("followingCtx.otherListedChatUsers (chatitems)", followingCtx.otherListedChatUsers);
    
    const openUserChatboxHandler = (followingId) => props.onOpenChatbox(followingId);

    const curUserId = +localStorage.getItem("user_id");
    return (
        <>
        <div ><h3 className={styles["description"]}>Users You Are Following:</h3></div>
        <div>
            {followingCtx.following && followingCtx.following.map((following) => {
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
        <div><h3 className={styles["description"]}>Other Users:</h3></div>
        <div>
            {followingCtx.otherListedChatUsers && followingCtx.otherListedChatUsers.map((publicUser) => {
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