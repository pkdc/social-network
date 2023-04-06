import Card from "../../UI/Card";
import UserMsgItem from "./UserMsgItem";
import styles from "./UserMsgArea.module.css";

const UserMsgArea = (props) => {

    return (
        <Card className={styles["msg-area"]} style={{height: `${window.innerHeight-316}px`}}>
            <UserMsgItem />

            {props.msgItems.map((msg, m) => (
                <div>
                    {msg.message}
                </div>
            ))}
            {props.newMsgs.map((msg, m) => (
                <div>
                    {msg.message}
                </div>
            ))}
        </Card>
    );
};

export default UserMsgArea;