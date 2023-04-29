import { useContext } from "react";
import SmallButton from "../UI/SmallButton";
import { UsersContext } from "../store/users-context";

const NotificationItem = (props) => {
    const usersCtx = useContext(UsersContext);
    const sourceUser = usersCtx.users.find((user) => user.id === props.sourceId);
    console.log("src", sourceUser);
    return (
        <div>
            <div>
                <h3>{`${sourceUser.fname} ${sourceUser.lname} wants to follow you`}</h3>
                <SmallButton onClick={props.onAccept}>Accept</SmallButton>
                <SmallButton onClick={props.onDecline}>Decline</SmallButton>
            </div>
        </div>
    );
};

export default NotificationItem;