import Card from "../../UI/Card";
import AllPrevMsgItems from "./AllPrevMsgItems";
import AllNewMsgItems from "./AllNewMsgItems";
import styles from "./ChatboxMsgArea.module.css";

const ChatboxMsgArea = (props) => {

    return (
        <Card className={styles["msg-area"]} style={{height: `${window.innerHeight-316}px`}}>
            <AllPrevMsgItems prevMsgItems={props.prevMsgItems}/>
            {/* <AllNewMsgItems newMsgItems={props.newMsgItems}/> */}
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