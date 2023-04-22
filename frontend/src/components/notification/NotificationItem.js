import SmallButton from "../UI/SmallButton";

const NotificationItem = (props) => {

    return (
        <div>
            <h2>{props.description}</h2>
            <SmallButton onClick={props.onAccept}>Accept</SmallButton>
            <SmallButton>Decline={props.onDecline}</SmallButton>
        </div>
    );
};

export default NotificationItem;