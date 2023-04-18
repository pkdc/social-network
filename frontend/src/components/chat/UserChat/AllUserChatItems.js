import UserChatItem from "./UserChatItem";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../store/users-context";
import { FollowingContext } from "../../store/following-context";

const AllUserChatItems = (props) => {

    const usersCtx = useContext(UsersContext);
    const followingCtx = useContext(FollowingContext);

    // useEffect(() => followingCtx.getFollowing(), []);
    console.log("cur user is following (AllUserChatItems)", followingCtx.following);

    useEffect(() => usersCtx.onNewUserReg(), []);
    console.log("users in AllUserChatItems", usersCtx.users);
    
    const followingList = usersCtx.users.filter((user) => {
        return followingCtx.following.some((followingUser) => {
            // console.log("fid", followingUser.id);
            // console.log("uid", user.id);
            if (followingUser && user) return followingUser.id === user.id;
        });
    });
    console.log("followingList in AllUserChatItems", followingList);

    const openUserChatboxHandler = (followingId) => props.onOpenChatbox(followingId);

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