import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./websocket-context";
import { UsersContext } from "./users-context";
export const FollowingContext = React.createContext({
    following: [],
    setFollowing: () => {},
    followingChat: [],
    setFollowingChat: () => {},
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
    const [followingChat, setFollowingChat] = useState([]);
    // const [publicChatUsers, setPublicChatUsers] = useState([]);
    const [otherListedChatUsers, setOtherListedChatUsers] = useState([]);
    // const [chatNotiUserArr, setChatNotiUserArr] = useState([]);
    const wsCtx = useContext(WebSocketContext);
    const usersCtx = useContext(UsersContext);
    // get following from db
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

                const [allChatItemArr] = Object.values(data);
                console.log("followuing", following);
                console.log("followuingChat", followingChat);
                console.log("allChatItemArr", allChatItemArr);

                if (!allChatItemArr) {
                    setFollowingChat(following);
                    // filter out following
                    // console.log("public and not following",usersCtx.users.filter(user => user.public === 1 && !following.some(followingUser => followingUser.id === user.id)));
                    usersCtx.users && !following && setOtherListedChatUsers(usersCtx.users.filter(user => user.public === 1)); // takes care if cur user is not following any user
                    usersCtx.users && following && setOtherListedChatUsers(usersCtx.users.filter(user => user.public === 1 && !following.some(followingUser => followingUser.id === user.id)));

                    console.log("no data", data);
                    return;
                }

                // filter following
                if (allChatItemArr) {
                    const filteredFollowingChatItems = allChatItemArr.filter(chatItem => {
                        if (!following) return false;
                        return following.some(followingUser => followingUser.id === chatItem.sourceid)
                    });
                    console.log("filteredFollowingChatItems", filteredFollowingChatItems);
                    // merge the properties
                    const followingChatItems = filteredFollowingChatItems.map(chatItem => {
                        const matchedFollowing = following.find(followingUser => followingUser.id === chatItem.sourceid);
                        return {...chatItem, ...matchedFollowing};
                    });

                    // Also display following even if there is no chat item
                    let filteredFollowingNoChatItems;
                    if (following) {
                        filteredFollowingNoChatItems = following.filter(followingUser => {
                            if (!allChatItemArr) return false;
                            return !allChatItemArr.some(chatItem => followingUser.id === chatItem.sourceid);
                        });
                    }
                    console.log("filteredFollowing Without oChatItems", filteredFollowingNoChatItems);
                    const finalFollowingChatItems = [...followingChatItems, ...filteredFollowingNoChatItems];
                    setFollowingChat(finalFollowingChatItems);

                    // filter out following, to get all OtherListedChatUsers
                    const filteredOtherChatItems = allChatItemArr.filter(chatItem => {
                        if (!following) return true;
                        return !following.every(followingUser => followingUser.id === chatItem.sourceid)
                    });
                    console.log("filteredOtherChatItems", filteredOtherChatItems);
                    // merge the properties
                    const allOtherChatItems = filteredOtherChatItems.map(chatItem => {
                        const matchedOtherChatItem = usersCtx.users.find(user => user.id === chatItem.sourceid);
                        return {...chatItem, ...matchedOtherChatItem};
                    });

                    console.log("followuingChat", followingChat);
                    // display public users even if there is no chat item
                    let filteredOtherNoChatItems;
                    const allPublicUsers = usersCtx.users.filter(user => user.public === 1 && !following.some(followingUser => followingUser.id === user.id));
                    console.log("public users: ", allPublicUsers)
                    if (allPublicUsers) {
                        filteredOtherNoChatItems = allPublicUsers.filter(publicUser => {
                            if (!allChatItemArr) return false;
                            return !allChatItemArr.some(chatItem => publicUser.id === chatItem.sourceid);
                        });
                    }
                    console.log("filteredOther Without ChatItems", filteredOtherNoChatItems);
                    const finalOtherNoChatItems = [...allOtherChatItems, ...filteredOtherNoChatItems];
                    setOtherListedChatUsers(finalOtherNoChatItems);
                }


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
        if (following) { // not empty
            setFollowing(prevFollowing => [...prevFollowing, followUser]);
            followUser["chat_noti"] = false; // add noti to followUser
            setFollowingChat(prevFollowingChat => [...prevFollowingChat, followUser]);

            const storedFollowing = JSON.parse(localStorage.getItem("following"));
            const curFollowing = [...storedFollowing, followUser];
            localStorage.setItem("following", JSON.stringify(curFollowing));
        } else {
            setFollowing([followUser]);
            followUser["chat_noti"] = false; // add noti to followUser
            setFollowingChat([followUser]);
            localStorage.setItem("following", JSON.stringify([followUser]));
        }
        console.log("locally stored following (fol)", JSON.parse(localStorage.getItem("following")));
    };

    const unfollowHandler = (unfollowUser) => {
        console.log("unfollowUser (folctx)", unfollowUser);
        setFollowing(prevFollowing => prevFollowing.filter((followingUser) => followingUser.id !== unfollowUser.id));
        setFollowingChat(prevFollowingChat => prevFollowingChat.filter((followingChatUser) => followingChatUser.id !== unfollowUser.id));
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
            // move userId chat item to the top
            setFollowingChat(prevFollowingChat => [targetUser, ...prevFollowingChat.filter(followingUser => followingUser.id !== +friendId)]);
            console.log("after add chat noti target user", targetUser);
        } else { // if one or both of the users is public and can chat coz of that
            const targetUser = usersCtx.users.find(user => user.id === +friendId);
            console.log("target user", targetUser);

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
            setOtherListedChatUsers(prevList => [targetUser, ...prevList.filter(otherChatUser => otherChatUser.id !== +friendId)]);
            console.log("after add chat noti target user", targetUser);
        }
    };

    useEffect(() => {
        getFollowingHandler();
        getPrivateChatHandler();
        // if (following) {
            // temp list for testing
            // usersCtx.users && setOtherListedChatUsers(usersCtx.users.filter((user) => user.public === 1));
        // }
    // }, [following]);
    }, [usersCtx.users]);

    return (
        <FollowingContext.Provider value={{
            following: following,
            setFollowing: setFollowing,
            followingChat: followingChat,
            setFollowingChat: setFollowingChat,
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