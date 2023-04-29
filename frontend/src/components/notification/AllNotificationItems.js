import NotificationItem from "./NotificationItem";

const AllNotificationItems = (props) => {
    return (
        <div>
            {props.notiItems.map((notiItem) => {
                return (
                    <NotificationItem
                        key={notiItem.id}
                        id={notiItem.id}
                        type={notiItem.type}
                        targetId={notiItem.targetid}
                        sourceId={notiItem.sourceid}
                        onAccept={props.acceptHandler}
                        onDecline={props.declineHandler}
                    />
                    );
                })
            }
        </div>
    );
};

export default AllNotificationItems;