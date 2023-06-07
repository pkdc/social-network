import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";


const AllNotificationItems = (props) => {

    const storedNotif = JSON.parse(localStorage.getItem("new_notif"));
    const [notiArr, setNotiArr] = useState([]);

    useEffect(() => {
        setNotiArr(storedNotif)
    }, []);

    // useEffect(() => {
    //     console.log("props.newNoti", props.notiItems);
    //     if (props.notiItems.length != 0) {
    //         console.log("before the error msg; ", JSON.parse(localStorage.getItem("new_notif")))
    //         let lastlocal = JSON.parse(localStorage.getItem("new_notif"));
    //         console.log("lastlocal: ", lastlocal[0], "lastprops; ", props.notiItems[0])
    //         if (lastlocal != undefined && lastlocal.length != 0) {
    //             if (lastlocal[0].id != props.notiItems[0].createdat){
    //                 console.log("before the prevarr", notiArr)
    //                 setNotiArr(prevArr => [... new Set([props.notiItems[0], ...prevArr])]);
    //             }
    //         }
    //     }

    // }, [props.notiItems]);

    useEffect(() => {

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