import Card from "../../UI/Card";
import AllPrevMsgItems from "./AllPrevMsgItems";
import styles from "./ChatboxMsgArea.module.css";

const ChatboxMsgArea = (props) => {

    return (
        <Card className={styles["msg-area"]} style={{height: `${window.innerHeight-316}px`}}>
            <AllPrevMsgItems />

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

export default ChatboxMsgArea;