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
                        createdAt={notiItem.createdat}
                        grouptitle={notiItem.grouptitle}
                    />
                    );
                })
            }
        </div>
    );
};

export default AllNotificationItems;