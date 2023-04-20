import UserChatItem from "./UserChatItem";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../store/users-context";
import { FollowingContext } from "../../store/following-context";

const AllUserChatItems = (props) => {

    const usersCtx = useContext(UsersContext);
    const followingCtx = useContext(FollowingContext);

    console.log("cur user is following (AllUserChatItems)", followingCtx.following);
    useEffect(() => usersCtx.onNewUserReg(), []);
    console.log("users in AllUserChatItems", usersCtx.users);
    
    const followingList = usersCtx.users.filter((user) => {
        if (followingCtx.following)
        return followingCtx.following.some((followingUser) => {
            // console.log("fid", followingUser.id);
            // console.log("uid", user.id);
            if (followingUser && user) return followingUser.id === user.id;
        });
    });
    console.log("followingList in AllUserChatItems", followingList); // not accurate

    const openUserChatboxHandler = (followingId) => props.onOpenChatbox(followingId);

    // useEffect(() => {
    //     console.log("Item (eff)", props.whichItem, "receives a new msg");
    // }, [props.whichItem]);
    if (props.whichItem) {
        console.log("Item", props.whichItem, "receives a new msg");
    }

    const curUserId = +localStorage.getItem("user_id");
    return (
        <div>
            {followingList && followingList.map((following) => {
                // console.log("each follower", follower);
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