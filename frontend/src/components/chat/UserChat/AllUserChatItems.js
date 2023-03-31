import UserChatItem from "./UserChatItem";

const AllUserChatItems = (props) => {

    // console.log("user chat followers in AllUserChatItems", props.followersList);
    // console.log("isArray", Array.isArray(props.followersList));
    return (
        <div>
            {props.followersList.map((follower) => {
                // console.log("each follower", follower);

                return <UserChatItem 
                    key={follower.id}
                    id={follower.id}
                    avatar={follower.avatar}
                    fname={follower.fname}
                    lname={follower.lname}
                    nname={follower.nname}
                />
            })}
        </div>
    );
};

export default AllUserChatItems;