import React, { useContext, useEffect, useState } from "react";
import useGet from "../fetch/useGet";
import { UsersContext } from "./users-context";
import { WebSocketContext } from "./websocket-context";

export const FollowingContext = React.createContext({
    following: [],
    setFollowing: () => {},
    getFollowing: () => {},
    requestToFollow: (followUser) => {},
    follow: (followUser) => {},
    unfollow: (unfollowUser) => {},
    receiveMsgFollowing: (friendId, open) => {},
    // publicChatUsers: [],
    // setPublicChatUsers: () => {},
    otherListedChatUsers: [],
    setOtherListedChatUsers: () => {},
    // chatNotiUserArr: [],
    // setChatNotiUserArr: () => {},
});

export const FollowingContextProvider = (props) => {
    const selfId = localStorage.getItem("user_id");
    const followingUrl = `http://localhost:8080/user-following?id=${selfId}`;

    const [following, setFollowing] = useState([]);
    // const [publicChatUsers, setPublicChatUsers] = useState([]);
    const [otherListedChatUsers, setOtherListedChatUsers] = useState([]);
    // const [chatNotiUserArr, setChatNotiUserArr] = useState([]);
    const wsCtx = useContext(WebSocketContext);
    const usersCtx = useContext(UsersContext);

    // get from db
    const getFollowingHandler = () => {
        fetch(followingUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log("followingArr (context): ", data);
            let [followingArr] = Object.values(data); 
            setFollowing(followingArr);
            localStorage.setItem("following", JSON.stringify(followingArr));
        })
        .catch(
            err => console.log(err)
        );
    };

    const getPrivateChatHandler = () => {
        // private chat notification list after login
        fetch(`http://localhost:8080/private-chat-item?id=${selfId}`)
        .then(resp => resp.json())
        .then(data => {
                console.log(data);
                // filter away all following, and set all src userid to the list
                // const otherChatUids = data.data.filter();
                // setOtherListedChatUsers();
                // setFollowing();
        }).catch(err => {
            console.log(err);
        })
    }

    const requestToFollowHandler = (followUser) => {
        console.log("request to follow (context): ", followUser.id);

        const followPayloadObj = {};
        followPayloadObj["label"] = "noti";
        followPayloadObj["id"] = Date.now();
        followPayloadObj["type"] = "follow-req";
        followPayloadObj["sourceid"] = +selfId;
        followPayloadObj["targetid"] = followUser.id;
        followPayloadObj["createdat"] = Date.now().toString();
        console.log("gonna send fol req : ", followPayloadObj);
        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(followPayloadObj));
    };

    const followHandler = (followUser) => {
        followUser["chat_noti"] = false; // add noti to followUser
        if (following) { // not empty
            setFollowing(prevFollowing => [...prevFollowing, followUser]);

            const storedFollowing = JSON.parse(localStorage.getItem("following"));
            const curFollowing = [...storedFollowing, followUser];
            localStorage.setItem("following", JSON.stringify(curFollowing));
        } else {
            setFollowing([followUser]);
            localStorage.setItem("following", JSON.stringify([followUser]));
        }
        console.log("locally stored following (fol)", JSON.parse(localStorage.getItem("following")));
    };

    const unfollowHandler = (unfollowUser) => {
        console.log("unfollowUser (folctx)", unfollowUser);
        setFollowing(prevFollowing => prevFollowing.filter((followingUser) => followingUser.id !== unfollowUser.id));
        const storedFollowing = JSON.parse(localStorage.getItem("following"));
        const curFollowing = storedFollowing.filter((followingUser) => followingUser.id !== unfollowUser.id);
        localStorage.setItem("following", JSON.stringify(curFollowing));
        console.log("locally stored following (unfol)", JSON.parse(localStorage.getItem("following")));
    };

    // receiveMsgHandler is not only for following, but also for public user chat
    const receiveMsgHandler = (friendId, open, isFollowing) => {
        if (isFollowing) {
            const targetUser = following.find(followingUser => followingUser.id === +friendId);
            console.log("target user", targetUser);
            // move userId chat item to the top
            setFollowing(prevFollowing => [targetUser, ...prevFollowing.filter(followingUser => followingUser.id !== +friendId)]);
            // noti if not open
            if (!open) {
                console.log("chatbox closed, open=", open);
                targetUser["chat_noti"] = true; // set noti field to true to indicate unread
            } else {
                targetUser["chat_noti"] = false; 
                console.log("chatbox opened, open=", open);

                const privateChatNotiPayloadObj = {};
                privateChatNotiPayloadObj["label"] = "set-seen-p-chat-noti";
                privateChatNotiPayloadObj["sourceid"] = friendId;
                privateChatNotiPayloadObj["targetid"] = +selfId;

                if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(privateChatNotiPayloadObj));
            }
        } else { // if one of the users is public and can chat coz of that   
            const targetUser = usersCtx.users.find(user => user.id === +friendId);
            console.log("target user", targetUser);
            setOtherListedChatUsers(prevList => [targetUser, ...prevList.filter(otherChatUser => otherChatUser.id !== +friendId)]);
            
            if (!open) {
                console.log("chatbox closed, open=", open);
                targetUser["chat_noti"] = true; // set noti field to true to indicate unread
            } else {
                targetUser["chat_noti"] = false; 
                console.log("chatbox opened, open=", open);
                // delete private chat notification from database
                const privateChatNotiPayloadObj = {};
                privateChatNotiPayloadObj["label"] = "set-seen-p-chat-noti";
                privateChatNotiPayloadObj["sourceid"] = friendId;
                privateChatNotiPayloadObj["targetid"] = +selfId;

                if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(privateChatNotiPayloadObj));
            }
        }
    };

    useEffect(() => {
        getFollowingHandler();
        getPrivateChatHandler();
        // if (following) {
            // temp list for testing
            usersCtx.users && setOtherListedChatUsers(usersCtx.users.filter((user) => user.public === 1));
        // }
    // }, [following]);
    }, [usersCtx.users]);

    return (
        <FollowingContext.Provider value={{
            following: following,
            setFollowing: setFollowing,
            getFollowing: getFollowingHandler,
            requestToFollow: requestToFollowHandler,
            follow: followHandler,
            unfollow: unfollowHandler,
            receiveMsgFollowing: receiveMsgHandler,
            // publicChatUsers: publicChatUsers,
            // setPublicChatUsers: setPublicChatUsers,
            otherListedChatUsers: otherListedChatUsers,
            setOtherListedChatUsers: setOtherListedChatUsers,
            // chatNotiUserArr: chatNotiUserArr,
            // setChatNotiUserArr: setChatNotiUserArr,
        }}>
            {props.children}
        </FollowingContext.Provider>
    );
};