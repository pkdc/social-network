import NotificationItem from "./NotificationItem";

const AllNotificationItems = (props) => {
    return (
        <div>
            {props.notiItems.map((notiItem) => {
                return (
                    <NotificationItem
                        
                    />
                    );
                })
            }
        </div>
    );
};

export default AllNotificationItems;