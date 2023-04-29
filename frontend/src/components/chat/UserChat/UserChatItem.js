import styles from "./UserChatItem.module.css";
import Avatar from "../../UI/Avatar";
import Card from "../../UI/Card";

const ChatUserItem = (props) => {
    const defaultImagePath = "default_avatar.jpg";
    // const onlineStatus = false;
    const openChatboxHandler = () => {
        console.log("user chat item clicked");
        props.onOpenChatbox(props.id);
    };
    
    return (
        <div className={styles["item"]} onClick={openChatboxHandler}>
            <Avatar className={styles["chat-avatar"]} src={props.avatar} alt="" height={"50px"} width={"50px"}/>
            <div><p className={styles["details"]}>{`${props.fname} ${props.lname} ${props.nname}`}</p></div>
        </div>
    );
};

export default ChatUserItem;