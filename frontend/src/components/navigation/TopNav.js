
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TopNav.module.css";
import logout from "../assets/logout.svg";
import profile from "../assets/profileSmall.svg";
import notif from "../assets/notifications5.svg";
import chatIcon from "../assets/chat5.svg";
import Avatar from "../UI/Avatar";
// import AuthContext from "../store/auth-context";
// import Modal from "../group/modal";
// import NotifModal from "./NotifModal";
import { AuthContext } from "../store/auth-context";
import { WebSocketContext } from "../store/websocket-context";
import NotificationCentre from "../notification/NotificationCentre";

const TopNav = () => {
    const [showNoti, setShowNoti] = useState(false);
    const [newNoti, setNewNoti] = useState([]);
    const [showNotiBadge , setShowNotiBadge] = useState(false)

    const navigate = useNavigate();

    const currUserId = localStorage.getItem("user_id");

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        console.log("auth notif", authCtx.notif)
        if (authCtx.notif.length != 0) {
            setShowNotiBadge(true)
        }
    // }, []);

    // const storedNotif = JSON.parse(localStorage.getItem("new_notif"));

    // // useEffect(() => {
    // //     // console.log("auth notif", authCtx.notif)
    // //     if (storedNotif.length != 0) {
    // //         setShowNotiBadge(true)
    // //     }
    }, [authCtx]);

    const onClickingLogout = () => {
        // props.onLogout();
        authCtx.onLogout();
        navigate("/", {replace: true});
    };

    const wsCtx = useContext(WebSocketContext);
console.log("checkingwebsocket: ",wsCtx.newNotiObj);
    useEffect(() => {
        if (wsCtx.websocket !== null && wsCtx.newNotiObj !== null) {
            console.log("ws receives notiObj (TopNav): ", typeof(wsCtx.newNotiObj));
            console.log("ws receives noti type (TopNav): ", wsCtx.newNotiObj.type);
            console.log("before the overwrite: ", newNoti); 
            const lastcurrentnotifarr = localStorage.getItem("new_notif");
            console.log("lastcurrentnotifarr empty ", (lastcurrentnotifarr))
            if (lastcurrentnotifarr != "[]"){  
                console.log("new notif not empty1")
                
                setNewNoti(JSON.parse(lastcurrentnotifarr))
                // console.log("lastcurrentnotifarr empty ", JSON.parse(lastcurrentnotifarr), "len ", JSON.parse(lastcurrentnotifarr).length)
                console.log("empty new noti", newNoti)
            }else {
                console.log("new notif empty1")
                setNewNoti([]);     
            }
            // console.log("empty console: ", newNoti, "---",newNoti.length)
            // if (newNoti) {
            //     console.log("new notif not empty2")
            //     // setNewNoti(prevNotifications => [...prevNotifications, wsCtx.newNotiObj]);
            //     let newarr = [wsCtx.newNotiObj, ...newNoti]
            //     // setNewNoti(newarr)

            //     console.log("newnotthing2 :", newNoti , "lastcurrentnotifarr newarr empty: ", newarr);

            //     localStorage.setItem("new_notif", JSON.stringify(Object.values(newarr)))
            // }
            // else{
            //     console.log("new notif empty2")

            //     // setNewNoti([wsCtx.newNotiObj])
            //    let x = [];
            //    x[0]= (wsCtx.newNotiObj)
            //    console.log("another exit: ", x)
            //         localStorage.setItem("new_notif",JSON.stringify(x) )
                
            // }

            // setNewNoti(wsCtx.newNotiObj);
            // let onlineNotif =localStorage.getItem("new_notif")
            // if (onlineNotif ==""){
                // localStorage.setItem("new_notif", JSON.stringify(Object.values(wsCtx.newNotiObj)))

            // } else{
            //     // onlineNotif
            // }
            setShowNotiBadge(true)
            // wsCtx.setNewNotiObj(null);
        }
    } ,[wsCtx.newNotiObj]);


    useEffect(() => {
        if (newNoti) {
            console.log("new notif not empty2")
            // setNewNoti(prevNotifications => [...prevNotifications, wsCtx.newNotiObj]);
            let newarr = [wsCtx.newNotiObj, ...newNoti]
            // setNewNoti(newarr)

            console.log("newnotthing2 :", newNoti , "lastcurrentnotifarr newarr empty: ", newarr);
        if (newarr[0] != null) {

            localStorage.setItem("new_notif", JSON.stringify(Object.values(newarr)))
        }
        }
    }, [newNoti])

    console.log("wsCtx.setNewNotiObj before and after getting (TopNav outside): ", wsCtx.newNotiObj);
    console.log("newNoti (TopNav outside): ", newNoti);
    
    const onShowNoti = () => {
        console.log("noti toggled!");
        setShowNoti(prev => !prev);
        // setOpen(true)
        setShowNotiBadge(false)
        };
    // const ReceivedNewNotiHandler = () => setNewNoti(null);

    console.log("show noti centre", showNoti);
    
    return (
        <nav>
            <div className={styles["top-nav"]}>
                <div className={styles.leftContainer}>
                <Link to={"/"} className={styles.logo}>notFacebook</Link>
                <div className={styles.menu}>
                    <Link className={styles.lnk} to="/">Home</Link>
                    <Link className={styles.lnk} to="/group">Groups</Link>
                    <Link className={styles.lnk} to="/messanger">Messenger</Link>
                    <Link className={styles.lnk} to={`/profile/${currUserId}`}>Profile</Link>
                </div>

                </div>

                <div className={styles.icons}>
                    <div className={styles.notif}>
                        <div className={styles.btn} onClick={onShowNoti}>
                            <img src={notif} alt=""></img>
                            {showNotiBadge && 
                            <span className={styles.badge}></span>
                            }
                        </div>
                        {/* showNoti &&  */}
                        {newNoti&&showNoti && <NotificationCentre 
                            newNoti={newNoti}
                            // onReceivedNewNoti={ReceivedNewNotiHandler}
                            onClose={() => setShowNoti(false)}
                            />
                        }
                        <button className={styles.btn}>
                            <img src={chatIcon} alt=""></img>
                            {/* <div className={styles.badge}></div> */}
                        </button>
                    </div>
                    <div className={styles.logout} onClick={onClickingLogout}><img src={logout} alt=""/></div>
                </div>
            </div>
            {/* <div>
                <NotifModal open={open} onClose={() => setOpen(false)}></NotifModal>
            </div> */}
        </nav>
    );
};

export default TopNav;

// {!showNoti && <div className={styles.btn} onClick={onShowNoti}>
//                             <img src={notif} alt=""></img>
//                             </div>}
//                             {showNoti && <NotificationCentre 
//                             newNoti={newNoti}
//                             onReceivedNewNoti={ReceivedNewNotiHandler}
//                             onRepliedToNoti={RepliedToNotiHandler}
//                             />}
                        
//                         {showNoti && <div className={styles.btn} onClick={onHideNoti} style={{zIndex: "1001"}}>
//                             <img src={notif} alt=""></img>
//                         </div>}