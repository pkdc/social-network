import SmallButton from "../UI/SmallButton";

const NotificationItem = (props) => {

    return (
        <div>
            <div>
                <SmallButton onClick={props.onAccept}>Accept</SmallButton>
                <SmallButton onClick={props.onDecline}>Decline</SmallButton>
            </div>
        </div>
    );
};

export default NotificationItem;