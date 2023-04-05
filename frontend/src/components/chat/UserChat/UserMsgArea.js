import Card from "../../UI/Card";
import styles from "./UserMsgArea.module.css";

const UserMsgArea = (props) => {

    return (
        <Card className={styles["msg-area"]} style={{height: `${window.innerHeight-316}px`}}>
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