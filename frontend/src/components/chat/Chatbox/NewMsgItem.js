import styles from "./NewMsgItem.module.css";

const NewMsgItem = (props) => {
    const selfId = +localStorage.getItem("user_id");
    // console.log("selfId new msg", selfId);
    const self = props.sourceid === selfId;
    return (
        <div className={`${self ? styles["self-msg"] : styles["frd-msg"]}`}>
            <div className={`${self ? styles["chat-bubble-self"] : styles["chat-bubble-frd"]}`}>
            {props.msg}
            </div>
        </div>
    );
};

export default NewMsgItem;