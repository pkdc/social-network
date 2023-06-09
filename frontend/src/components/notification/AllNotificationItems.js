import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";


const AllNotificationItems = (props) => {

    const storedNotif = JSON.parse(localStorage.getItem("new_notif"));
    console.log("new_notif", storedNotif);
    const [notiArr, setNotiArr] = useState([]);

    useEffect(() => {
        console.log("first new_notif", storedNotif);
        storedNotif && setNotiArr(storedNotif.filter(notif => notif !== undefined))
    }, []);

    useEffect(() => {
        console.log("props.newNoti", props.notiItems);
        if (props.notiItems.length !== 0) {
            console.log("before the prevarr", notiArr)
            setNotiArr(prevArr => [... new Set([props.notiItems[0], ...prevArr])]);
        }
    }, [props.notiItems]);

    useEffect(() => {
        if (notiArr.length !== 0)
        console.log("just before setting ls",notiArr);
            localStorage.setItem("new_notif", JSON.stringify(Object.values(notiArr)))
    }, [notiArr]);

    console.log("last exit before bridge: ", notiArr)
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