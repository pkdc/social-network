import styles from './NotificationItem.module.css'
import profile from "../assets/profileSmall.svg";
import { useNavigate } from 'react-router-dom';



function EventNotif(props) {
    const navigate = useNavigate();

    function handleClick(e) {
                console.log("click")
                const id = e.target.id
                
                navigate("/groupprofile", { state: { id } })
                console.log("5678", id)
            }

    return (
    <div>
    <div className={styles.container}>
        <div className={styles.left}>
        <img className={styles.img} src={profile} alt=''/>
        </div>
        <div className={styles.mid}>
            <div id={props.groupId} onClick={handleClick} className={styles.user}>New event</div>  
            {/* <div id={props.groupId} onClick={handleClick} className={styles.user}>GroupTitle {props.groupId} added a new event: EventTitle</div>   */}
        </div>
        <div className={styles.right}>
            <div className={styles.notif}></div>
        </div>
    </div>
</div>
    )
}


export default EventNotif;