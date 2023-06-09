import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";


const AllNotificationItems = (props) => {

    const storedNotif = JSON.parse(localStorage.getItem("new_notif"));
    console.log("new_notif", storedNotif);
    const [notiArr, setNotiArr] = useState([]);

    useEffect(() => {
        setNotiArr(storedNotif)
    }, []);

    useEffect(() => {
        // console.log("props.newNoti", props.notiItems);
        // console.log("notiArr", notiArr);
        props.notiItems && notiArr.length && setNotiArr(prevArr => [...new Set([props.notiItems[0], ...prevArr])]);
        props.notiItems && !notiArr.length && setNotiArr([props.notiItems[0]]);
    }, [props.notiItems]);

    useEffect(() => {
        if (notiArr.length !== 0)
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