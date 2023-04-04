import { useEffect, useContext, useState } from "react";
import UsersContext from "../../store/users-context";
import WebSocketContext from "../../store/websocket-context";
import ChatDetailTopBar from "./ChatDetailTopBar";
import UserMsgArea from "./UserMsgArea";
import SendMsg from "../SendMsg";
import styles from "./UserChatbox.module.css";

const UserChatbox = (props) => {

    const userMsgUrl = "http://localhost:8080/user-message";

    const [userMsgData, setUserMsgData] = useState([]);

    const selfId = localStorage.getItem("user_id");
    const buddyId = props.chatboxId;

    // const usersCtx = useContext(UsersContext);
    // console.log("chatbox: ", usersCtx.users);

    const wsCtx = useContext(WebSocketContext);
    console.log("ws in UserChatbox: ",wsCtx.websocket);
    // const [msg, setMsg] = useState("");

    // send msg to ws
    const sendMsgHandler = (msg) => {
        let privateChatPayloadObj = {};
        privateChatPayloadObj["label"] = "private-chat";
        privateChatPayloadObj["targetid"] = selfId;
        privateChatPayloadObj["sourceid"] = buddyId;
        privateChatPayloadObj["message"] = msg;
        wsCtx.websocket.send(JSON.stringify(privateChatPayloadObj));
        // wsCtx.websocket.send(msg);
    };

    const closeChatboxHandler = () => {
        props.onCloseChatbox();
    };

    // get old msgs
    const AllMsgsToAndFrom = [];
    useEffect(() => {
        fetch(`${userMsgUrl}?targetid=${selfId}&sourceid=${buddyId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data) {
                data.sort((a, b) => Date.parse(b.createdat) - Date.parse(a.createdat));
                setUserMsgData(data);
            }
        })
        .catch(
            err => console.log(err)
        );
    }, []);

    return (
        <div className={styles["container"]}>
            <button onClick={closeChatboxHandler} className={styles["close-btn"]}>X</button>
            <ChatDetailTopBar />
            <UserMsgArea msgItems={userMsgData}/>
            <SendMsg onSendMsg={sendMsgHandler}/>            
        </div>
        
    );
};

export default UserChatbox;