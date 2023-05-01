import { useContext } from "react";
import { UsersContext } from "../store/users-context";
import FollowReqNotiItem from "./FollowReqNotiItem";

const NotificationItem = (props) => {
    const usersCtx = useContext(UsersContext);
    const sourceUser = usersCtx.users.find((user) => user.id === props.sourceId);
    console.log("src", sourceUser);
    
    return (
        <div>
            {props.type === "follow-req" && <FollowReqNotiItem 
            srcUser={sourceUser}
            targetId={props.targetId}
            />}
        </div>
    );
};

export default NotificationItem;