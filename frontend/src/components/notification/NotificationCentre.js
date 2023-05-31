import { useContext, useEffect, useState } from "react";
// import { WebSocketContext } from "../store/websocket-context";
import AllNotificationItems from "./AllNotificationItems";
import styles from "./NotificationCentre.module.css";
import { AuthContext } from "../store/auth-context";

let count = 0;
const NotificationCentre = (props) => {
    console.log("localstorage: ", typeof (localStorage.getItem("new_notif")))
    const authCtx = useContext(AuthContext);
    console.log("allnotifications: ",authCtx.notif)

    // const storedNotif = JSON.parse(localStorage.getItem("new_notif"));
    // const curNotif = [...storedNotif, props.newNoti];
    // localStorage.setItem("new_notif", JSON.stringify(Object.values(curNotif)))

    const [notiArr, setNotiArr] = useState([]);
    const selfId = +localStorage.getItem("user_id");
    
    useEffect(() => {
        setNotiArr(authCtx.notif)
        // setNotiArr(storedNotif)
    }, [authCtx]);


    useEffect(() => {
        console.log("props.newNoti", props.newNoti);
        props.newNoti && setNotiArr(prevArr => [... new Set([props.newNoti, ...prevArr])]);
        // console.log("notiArr: ", notiArr)
        // localStorage.setItem("new_notif", JSON.stringify(Object.values(notiArr)))

        // props.onReceivedNewNoti();

//         const storedNotif = JSON.parse(localStorage.getItem("new_notif"));

//         let curNotif = []
//         if (storedNotif.length != 0) {
//              curNotif = [props.newNoti, ...storedNotif ];

//         }else {
//             curNotif = [props.newNoti];
//         }
//         localStorage.setItem("new_notif", JSON.stringify(Object.values(curNotif)))
// console.log("count: ", count);
// count++
    }, [props.newNoti]);

    // useEffect(() => {
    //     const storedNotif2 = JSON.parse(localStorage.getItem("new_notif"));
    //     setNotiArr(storedNotif2)
    // }, [])



    console.log("noti arr (Notification): ", notiArr);

    // const wsCtx = useContext(WebSocketContext);

    // let description = "follow request";
    return (
        // <div className={styles.overlay} onClick={props.onClose}>
        <div className={styles.modalContainer} >
            <div className={styles.label}>
                <div>Notifications</div>
                <div onClick={props.onClose} >X</div>
            </div>
            {/* <div className={styles["container"]}> */}
            <AllNotificationItems
                notiItems={notiArr}
                onClose={props.onClose}
            />
        </div>
        // </div>
    );
};

export default NotificationCentre;