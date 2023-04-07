import styles from "./PrevMsgItem.module.css";

const PrevMsgItem = (props) => {
    const selfId = +localStorage.getItem("user_id");
    console.log("selfId prev msg", selfId);
    let classes;
    if (props.sourceid === selfId) {
        classes = "self-msg";
     } else {
        classes = "frd-msg";
     }
    return (
        // <div className={`${props.sourceid === selfId ? styles["self-msg"] : styles["frd-msg"]}`}>
        <div className={`${props.sourceid === selfId ? styles["self-msg"] : styles["frd-msg"]}`}>    
        {props.msg}
        </div>
    );
};

export default PrevMsgItem;