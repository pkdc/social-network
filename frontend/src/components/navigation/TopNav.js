
import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "../UI/LogoutButton";
import NotificationBtn from "../UI/NotificationBtn";
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

    useEffect(() => {
        if (wsCtx.websocket !== null && wsCtx.newNotiObj !== null) {
            console.log("ws receives notiObj (TopNav): ", wsCtx.newNotiObj);
            console.log("ws receives noti type (TopNav): ", wsCtx.newNotiObj.type);
            console.log("before the overwrite: ", newNoti); 
            if (newNoti){
                setNewNoti(prevFollowing => [...prevFollowing, wsCtx.newNotiObj]);
            }else{setNewNoti(wsCtx.newNotiObj)}
            // setNewNoti(wsCtx.newNotiObj);
            // let onlineNotif =localStorage.getItem("new_notif")
            // if (onlineNotif ==""){
            //     // localStorage.setItem("new_notif", JSON.stringify(Object.values(wsCtx.newNotiObj)))

            // } else{
            //     // onlineNotif
            // }
            setShowNotiBadge(true)
            // wsCtx.setNewNotiObj(null);
        }
    } ,[wsCtx.newNotiObj]);

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