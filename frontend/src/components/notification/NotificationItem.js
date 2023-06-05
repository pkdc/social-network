import { useContext } from "react";
import { UsersContext } from "../store/users-context";
import FollowReqNotiItem from "./FollowReqNotiItem";
import Avatar from "../UI/Avatar";
import SmallButton from "../UI/SmallButton";
import { useNavigate } from "react-router-dom";
import styles from './NotificationItem.module.css'
import profile from "../assets/profileSmall.svg";
import JoinGroupReqNotiItem from "./JoinGroupReqNotiItem";
import InviteToJoinGroupNotiItem from "./InviteToJoinGroupNotiItem";
import EventNotif from "./eventNotif";

const NotificationItem = (props) => {
    const navigate = useNavigate();
    const usersCtx = useContext(UsersContext);
    const sourceUser = usersCtx.users.find((user) => user.id === props.sourceId);
    console.log("src", sourceUser);
    console.log("props.groupid (item)", props.groupId);

    // if (props.type == "follow-req") {
        
    //     return (
    //         <div>
    //             {props.type === "follow-req" && <FollowReqNotiItem 
    //             srcUser={sourceUser}
    //             targetId={props.targetId}
    //             />}
    //         </div>
    //     );

    // } else if (props.type == "event-notif") {
    //     console.log("PROPS: ,", props)

    //     function handleClick(e) {
    //         console.log("click")
    //         const id = e.target.id
            
    //         navigate("/groupprofile", { state: { id } })
    //     }

    //     return (
    //         <div>
    //         <div className={styles.container}>
    //             <div className={styles.left}>
    //             <img className={styles.img} src={profile} alt=''/>
    //             </div>
    //             <div className={styles.mid}>
    //                 <div id={props.sourceId} onClick={handleClick} className={styles.user}>GroupTitle {props.sourceId} added a new event: EventTitle</div>  
    //             </div>
    //             <div className={styles.right}>
    //                 <div className={styles.notif}></div>
    //             </div>
    //         </div>
    // </div>
    //         // <div>
    //         // <div onClick={handleClick} id={props.sourceId}>{`new event on ${props.sourceId}, check the group`}</div>  
    //         // </div>
            
    //     );
    // }
    console.log("props.grouptitle (item)", props);
    return (
        <div>
 
            {props.type === "follow-req" && <FollowReqNotiItem 
            srcUser={sourceUser}
            targetId={props.targetId}
            />}
            {props.type === "join-req" && <JoinGroupReqNotiItem 
            srcUser={sourceUser}
            targetId={props.targetId}
            groupId={props.groupId}
            />}
            {props.type === "invitation" && <InviteToJoinGroupNotiItem 
            srcUser={sourceUser}
            targetId={props.targetId}
            groupId={props.groupId}
            />}

            {props.type && props.type.includes("event-notif")  && <EventNotif
            groupId={props.groupId}
            type = {props.type}
            />}
        
        </div>
    );
};

export default NotificationItem;