import styles from "./OldMsgItem.module.css";

const OldMsgItem = (props) => {
    const selfId = +localStorage.getItem("user_id");
    console.log("selfId old msg", selfId);
    return (
        <div className={`${props.sourceid === selfId ? styles["self-msg"] : styles["frd-msg"]}`}>    
        {props.msg}
        </div>
    );
};

export default OldMsgItem;