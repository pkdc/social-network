import styles from "./OldMsgItem.module.css";

const OldMsgItem = (props) => {
    const selfId = +localStorage.getItem("user_id");
    console.log("selfId old msg", selfId);
    return (
        <div className={`${props.sourceid === selfId ? styles["self-msg"] : styles["frd-msg"]}`}>
            <div className={`${props.sourceid === selfId ? styles["chat-bubble-self"] : styles["chat-bubble-frd"]}`}>
            {props.msg}
            </div>
        </div>
    );
};

export default OldMsgItem;