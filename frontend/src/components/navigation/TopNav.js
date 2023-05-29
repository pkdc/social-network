// import { Link, NavLink, useNavigate } from "react-router-dom";
// import LogoutButton from "../UI/LogoutButton";
// import NotificationBtn from "../UI/NotificationBtn";
// import styles from "./TopNav.module.css";
// import logout from "../assets/logout.svg";
// import profile from "../assets/profileSmall.svg";

// const TopMenu = (props) => {
//     let nickname;
//     let avatar;
//     const defaultImagePath = "default_avatar.jpg";
//     const userId = +localStorage.getItem("user_id");
//     const first = localStorage.getItem("fname");
//     const last = localStorage.getItem("lname");
//     nickname = localStorage.getItem("nname");
//     avatar = localStorage.getItem("avatar");
//     let details;

//     const navigate = useNavigate();

//     const onClickingLogout = () => {
//         props.onLogout();
//         navigate("/", {replace: true});
//     };
    
//     return (
//         <nav>
//             <div className={styles["top-nav"]}>
//                 <Link to={"/"} className={styles.logo}>notFacebook</Link>
//                 <div className={styles.menu}>
//                     <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/" end>Home</NavLink>
//                     <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/group" end>Groups</NavLink>
//                     <NavLink className={({isActive}) => isActive ? styles["active"] : undefined} to="/messanger" end>Messenger</NavLink>
//                     <div className={styles.profile}>
//                     {/* <img src={profile} alt=""/> */}
//                     <Link className={styles.profile} to={`/profile/${userId}`}>
//                     {!avatar && <img className={styles["avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"35px"}/>}
//                     {avatar && <img src={avatar} alt="" width={"35px"}/>}
//                     {nickname ? `${first} ${last} (${nickname})` : `${first} ${last}`}
//                     </Link>
//                     </div>
//                 </div>
//                 <LogoutButton onClick={onClickingLogout}><img src={logout} alt=""/></LogoutButton>
//             </div>
//         </nav>
        
//     );
// };

// export default TopMenu;



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
    const [newNoti, setNewNoti] = useState(null);

    const navigate = useNavigate();

    const currUserId = localStorage.getItem("user_id");

    // function handleClick(e) {
    //     const id = e.target.id
    //     console.log("profile id", id);

    //     navigate("/profile", { state: { id } })
    // }

    const authCtx = useContext(AuthContext);

    const [ open, setOpen ] = useState(false)

    const onClickingLogout = () => {
        // props.onLogout();
        authCtx.onLogout();
        navigate("/", {replace: true});
    };

    // function handleClick() {
    //     setOpen(true)
    // }
    const wsCtx = useContext(WebSocketContext);

    useEffect(() => {
        if (wsCtx.websocket !== null && wsCtx.newNotiObj !== null) {
            console.log("ws receives notiObj (TopNav): ", wsCtx.newNotiObj);
            console.log("ws receives noti type (TopNav): ", wsCtx.newNotiObj.type);
            setNewNoti(wsCtx.newNotiObj);
            wsCtx.setNewNotiObj(null);
        }
    } ,[wsCtx.newNotiObj]);
    console.log("wsCtx.setNewNotiObj before and after getting (TopNav outside): ", wsCtx.newNotiObj);
    console.log("newNoti (TopNav outside): ", newNoti);
    
    const onShowNoti = () => {
        console.log("noti toggled!");
        setShowNoti(prev => !prev);
        // setOpen(true)
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
                    {/* <Link className={styles.lnk} to="/profile" id={currUserId} onClick={handleClick}>Profile</Link> */}
                    {/* <div id={currUserId} className={styles.lnk} onClick={handleClick}> */}
                    {/* <img src={profile} alt=""/> */}
                    {/* Profile */}
                    {/* <Link className={styles.profile} to={`/profile/${userId}`}>
                    {!avatar && <img className={styles["avatar"]} src={require("../../images/"+`${defaultImagePath}`)} alt="" width={"35px"}/>}
                    {avatar && <Avatar src={avatar} alt="" width={"35px"}/>}
                    {nickname ? `${first} ${last} (${nickname})` : `${first} ${last}`}
                    </Link> */}
                    {/* </div> */}
                    <Link className={styles.lnk} to={`/profile/${currUserId}`}>Profile</Link>
                </div>

                </div>
          
                     {/* <div id={currUserId} className={styles.profile} onClick={handleClick}>
                    <img src={profile} alt=""/>
                    MaddieWesst
                    </div> */}

                <div className={styles.icons}>
                    <div className={styles.notif}>
                        <div className={styles.btn} onClick={onShowNoti}>
                            <img src={notif} alt=""></img>
                            <span className={styles.badge}></span>
                        </div>
                        {/* showNoti &&  */}
                        {showNoti && <NotificationCentre 
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