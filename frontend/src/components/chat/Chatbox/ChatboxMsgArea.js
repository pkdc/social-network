import { useEffect, useRef, useState } from "react";
import Card from "../../UI/Card";
import AllOldMsgItems from "./AllOldMsgItems";
import AllNewMsgItems from "./AllNewMsgItems";
import styles from "./ChatboxMsgArea.module.css";
import GroupChatDetailTopBar from "../GroupChat/GroupChatDetailTopBar";

const ChatboxMsgArea = (props) => {
    const msgAreaRef = useRef();
    // const [areaScrollTop, setAreaScrollTop] = useState();  

    const scrollBottom = () => {
        if (msgAreaRef.current) {
            setTimeout(() => msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight - msgAreaRef.current.clientHeight, 1000)
        }
    };
    // useEffect(() => { scrollBottom(); }, []);
    useEffect(() => { scrollBottom(); }, [props.justUpdated]);

    // props.justUpdated && msgAreaRef.current && scrollBottom();

    return (
        <div
            className={styles["msg-area"]}
            style={{ height: `${window.innerHeight - 370}px` }}
            ref={msgAreaRef}
        // scrolltop={}
        // onScroll={scrollHandler}
        >
            {/* <GroupChatDetailTopBar/> */}
            <AllOldMsgItems oldMsgItems={props.oldMsgItems} />
            <AllNewMsgItems newMsgItems={props.newMsgItems} />
        </div>
    );
};

export default ChatboxMsgArea;