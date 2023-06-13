import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";


const AllNotificationItems = (props) => {

    const storedNotif = JSON.parse(localStorage.getItem("new_notif"));
    const [notiArr, setNotiArr] = useState([]);

    useEffect(() => {
        setNotiArr(storedNotif)
    }, []);

    useEffect(() => {

        localStorage.setItem("new_notif", JSON.stringify(Object.values(notiArr)))

    }, [notiArr]);

    return (
        <div>
            {notiArr && notiArr.map((notiItem) => {
                return (
                    <NotificationItem
                        key={notiItem.id}
                        id={notiItem.id}
                        type={notiItem.type}
                        targetId={notiItem.targetid}
                        sourceId={notiItem.sourceid}
                        createdAt={notiItem.createdat}
                        groupId={notiItem.groupid}
                    />
                );
            })
            }
        </div>
    );
};

export default AllNotificationItems;