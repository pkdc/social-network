import Card from "../../UI/Card";
import AllOldMsgItems from "./AllOldMsgItems";
import AllNewMsgItems from "./AllNewMsgItems";
import styles from "./ChatboxMsgArea.module.css";

const ChatboxMsgArea = (props) => {
    console.log("scrollY in ChatboxMsgArea", );
    return (
        <Card className={styles["msg-area"]} style={{height: `${window.innerHeight-316}px`}}>
            <AllOldMsgItems oldMsgItems={props.oldMsgItems}/>
            <AllNewMsgItems newMsgItems={props.newMsgItems}/>
        </Card>
    );
};

export default ChatboxMsgArea;