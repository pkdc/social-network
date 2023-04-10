import Card from "../../UI/Card";
import AllOldMsgItems from "./AllOldMsgItems";
import AllNewMsgItems from "./AllNewMsgItems";
import styles from "./ChatboxMsgArea.module.css";

const ChatboxMsgArea = (props) => {

    return (
        <Card className={styles["msg-area"]} style={{height: `${window.innerHeight-316}px`}}>
            <AllOldMsgItems oldMsgItems={props.oldMsgItems}/>
            <AllNewMsgItems newMsgItems={props.newMsgItems}/>
            {/* {props.msgItems.map((msg, m) => (
                <div>
                    {msg.message}
                </div>
            ))}
            {props.newMsgs.map((msg, m) => (
                <div>
                    {msg.message}
                </div>
            ))} */}
        </Card>
    );
};

export default ChatboxMsgArea;