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
});

export const FollowingContextProvider = (props) => {
    const selfId = localStorage.getItem("user_id");
    const followingUrl = `http://localhost:8080/user-following?id=${selfId}`;
    const [following, setFollowing] = useState([]);
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
        followPayloadObj["type"] = "follow-req";
        followPayloadObj["userid"] = followUser.id;

        if (wsCtx.websocket !== null) wsCtx.websocket.send(JSON.stringify(followPayloadObj));
    };

    const followHandler = (followUser) => {
        if (following) {
            setFollowing(prevFollowing => [...prevFollowing, followUser]);

            const storedFollowing = JSON.parse(localStorage.getItem("following"));
            const curFollowing = [...storedFollowing, followUser];
            localStorage.setItem("following", JSON.stringify(curFollowing));
        } else {
            setFollowing([followUser]);
            localStorage.setItem("following", JSON.stringify([followUser]));
        }
        console.log("locally stored following", JSON.parse(localStorage.getItem("following")));
    };

    const unfollowHandler = (unfollowUser) => {
        setFollowing(prevFollowing => {
            prevFollowing.filter(() => unfollowUser);
        });
        localStorage.setItem("following", JSON.stringify(following));
        // console.log("following (unfollow) (ctx)", following); // not accurate
        const storedFollowing = JSON.parse(localStorage.getItem("following"));
        console.log("stored fol", storedFollowing);
    };

    const receiveMsgHandler = (friendId, open) => {
        const targetUser = following.find(followingUser => followingUser.id === +friendId);
        console.log("target user", targetUser);
        // const tempFollowing = following.filter(followingUser => followingUser.id !== +friendId);
        // console.log("temp fol (removed)", tempFollowing);
        // add userId chat item to the top
        setFollowing(prevFollowing => [targetUser, ...prevFollowing.filter(followingUser => followingUser.id !== +friendId)]);
        // noti if not open
        const chatNoti = [];
        // !open && chatNoti.push(friendId);
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
        }}>
            {props.children}
        </FollowingContext.Provider>
    );
};