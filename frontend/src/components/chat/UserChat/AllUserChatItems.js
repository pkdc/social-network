import UserChatItem from "./UserChatItem";

const AllUserChatItems = (props) => {

    // console.log("user chat followers in AllUserChatItems", props.followersList);
    // console.log("isArray", Array.isArray(props.followersList));

    const openUserChatboxHandler = (followerId) => props.onOpenChatbox(followerId);

    const curUserId = +localStorage.getItem("user_id");
    return (
        <div>
            {props.followersList.map((follower) => {
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