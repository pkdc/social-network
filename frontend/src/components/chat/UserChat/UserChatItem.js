import styles from "./UserChatItem.module.css";
import Avatar from "../../UI/Avatar";
import Card from "../../UI/Card";

const ChatUserItem = (props) => {
    const defaultImagePath = "default_avatar.jpg";
    return (
        <div className={styles["item"]} >
            {!props.avatar && <Avatar className={styles["chat-avatar"]} src={require("../../../images/"+`${defaultImagePath}`)} alt="" height={"30px"} width={"30px"}/>}
            {props.avatar && <Avatar className={styles["chat-avatar"]} src={props.avatar} alt="" height={"30px"} width={"30px"}/>}
            <div><p className={styles["details"]}>{`${props.fname} ${props.lname} ${props.nname}`}</p></div>
        </div>
    );
};

export default ChatUserItem;