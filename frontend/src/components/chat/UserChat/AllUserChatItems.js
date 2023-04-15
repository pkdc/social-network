import UserChatItem from "./UserChatItem";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../store/users-context";

const AllUserChatItems = (props) => {

    const ctx = useContext(UsersContext);

    useEffect(() => ctx.onUsersChange(), []);
    const followersList = ctx.users; // temp
    console.log("user chat followers in AllUserChatItems", followersList);
    
    const openUserChatboxHandler = (followerId) => props.onOpenChatbox(followerId);

    const curUserId = +localStorage.getItem("user_id");
    return (
        <div>
            {followersList && followersList.map((follower) => {
                // console.log("each follower", follower);
                // console.log("curUserId: ", curUserId);
                // console.log("follower.id", follower.id);
                {if (curUserId !== follower.id) {
                    return <UserChatItem 
                    key={follower.id}
                    id={follower.id}
                    avatar={follower.avatar}
                    fname={follower.fname}
                    lname={follower.lname}
                    nname={follower.nname}
                    onOpenChatbox={openUserChatboxHandler}
                />}
                }
            })}
        </div>
    );
};

export default AllUserChatItems;