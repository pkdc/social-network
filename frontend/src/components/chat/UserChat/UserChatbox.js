import { useEffect, useContext, useState } from "react";
import UsersContext from "../../store/users-context";
import WebSocketContext from "../../store/websocket-context";
import UserMsgArea from "./UserMsgArea";
import UserSendMsg from "./UserSendMsg";
import styles from "./UserChatbox.module.css";

const UserChatbox = (props) => {

    const usersCtx = useContext(UsersContext);
    console.log("chatbox: ", usersCtx.users);

    const wsCtx = useContext(WebSocketContext);
    console.log("ws in UserChatbox: ",wsCtx.websocket);
    // const [msg, setMsg] = useState("");

    const sendMsgHandler = (msg) => {
        wsCtx.websocket.send(msg);
    };

    const closeChatboxHandler = () => {
        props.onCloseChatbox();
    };

    return (
        <div className={styles["container"]}>
            <button onClick={closeChatboxHandler}>&lt;-</button>
            <UserMsgArea />
            <UserSendMsg onSendMsg={sendMsgHandler}/>            
        </div>
        
    );
};

export default UserChatbox;