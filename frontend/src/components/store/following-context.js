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
    // chatNotiUserArr: [],
    // setChatNotiUserArr: () => {},
});

export const FollowingContextProvider = (props) => {
    const selfId = localStorage.getItem("user_id");
    const followingUrl = `http://localhost:8080/user-following?id=${selfId}`;
    const [following, setFollowing] = useState([]);
    // const [chatNotiUserArr, setChatNotiUserArr] = useState([]);
    const wsCtx = useContext(WebSocketContext);

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

    const receiveMsgHandler = (friendId, open) => {
        const targetUser = following.find(followingUser => followingUser.id === +friendId);
        console.log("target user", targetUser);
        // const tempFollowing = following.filter(followingUser => followingUser.id !== +friendId);
        // console.log("temp fol (removed)", tempFollowing);
        // add userId chat item to the top
        setFollowing(prevFollowing => [targetUser, ...prevFollowing.filter(followingUser => followingUser.id !== +friendId)]);
        // noti if not open
        // !open && setChatNotiUserArr(prevArr => [...new Set([targetUser, ...prevArr])]);
        if (!open) targetUser["chat_noti"] = true; // set noti field to true to indicate unread
    };

    useEffect(() => getFollowingHandler(), []);

    return (
        <FollowingContext.Provider value={{
            following: following,
            setFollowing: setFollowing,
            getFollowing: getFollowingHandler,
            requestToFollow: requestToFollowHandler,
            follow: followHandler,
            unfollow: unfollowHandler,
            receiveMsgFollowing: receiveMsgHandler,
            // chatNotiUserArr: chatNotiUserArr,
            // setChatNotiUserArr: setChatNotiUserArr,
        }}>
            {props.children}
        </FollowingContext.Provider>
    );
};