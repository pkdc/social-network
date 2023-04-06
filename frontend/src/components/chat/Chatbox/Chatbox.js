import { useEffect, useContext, useState } from "react";
import UsersContext from "../../store/users-context";
import WebSocketContext from "../../store/websocket-context";
import ChatDetailTopBar from "./ChatDetailTopBar";
import ChatboxMsgArea from "../Chatbox/ChatboxMsgArea";
import SendMsg from "./SendMsg";
import styles from "./Chatbox.module.css";

const Chatbox = (props) => {

    const userMsgUrl = "http://localhost:8080/user-message";

    const [prevMsgData, setPrevMsgData] = useState([]);
    const [newMsgsData, setNewMsgs] = useState([]);

    const selfId = +localStorage.getItem("user_id");
    const friendId = props.chatboxId;
    console.log("friendId: ", friendId);

    // const usersCtx = useContext(UsersContext);
    // console.log("chatbox: ", usersCtx.users);

    const wsCtx = useContext(WebSocketContext);
    // console.log("ws in Chatbox: ",wsCtx.websocket);
    // const [msg, setMsg] = useState("");

    wsCtx.websocket.onmessage = (e) => {
        console.log("msg event: ", e);
        const msgObj = JSON.parse(e.data);
        console.log("ws receives msgObj: ", msgObj);
        console.log("ws receives msg: ", msgObj.message);
    };

    // send msg to ws
    const sendMsgHandler = (msg) => {
        let privateChatPayloadObj = {};
        privateChatPayloadObj["label"] = "private";
        privateChatPayloadObj["targetid"] = friendId;
        privateChatPayloadObj["sourceid"] = selfId;
        privateChatPayloadObj["message"] = msg;
        wsCtx.websocket.send(JSON.stringify(privateChatPayloadObj));
        // wsCtx.websocket.send(msg);
        const newObject = [{
            targetid: friendId,
            sourceid: selfId,
            message: msg
        }]
        console.log("new msg data", newObject);
        setNewMsgs(newObject)
    };

    const closeChatboxHandler = () => {
        props.onCloseChatbox();
    };

    // get old msgsdata.data.push()
    const AllMsgsToAndFrom = [];
    useEffect(() => {
        fetch(`${userMsgUrl}?targetid=${selfId}&sourceid=${friendId}`)
        .then(resp => resp.json())
        .then(data => {
            console.log("old msg data: ", data);
            if (data) {
                const [prevMsgArr] = Object.values(data);
                prevMsgArr.sort((b, a) => Date.parse(b.createdat) - Date.parse(a.createdat));
                console.log("soreted prev msg data", prevMsgArr);
                setPrevMsgData(prevMsgArr);
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
            <ChatboxMsgArea prevMsgItems={prevMsgData} newMsgItems={newMsgsData}/>
            <SendMsg onSendMsg={sendMsgHandler}/>            
        </div>
        
    );
};

export default Chatbox;