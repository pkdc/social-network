import { useEffect, useContext, useState } from "react";
import UsersContext from "../../store/users-context";
import WebSocketContext from "../../store/websocket-context";
import ChatDetailTopBar from "./ChatDetailTopBar";
import ChatboxMsgArea from "../Chatbox/ChatboxMsgArea";
import SendMsg from "./SendMsg";
import styles from "./Chatbox.module.css";

const Chatbox = (props) => {

    const userMsgUrl = "http://localhost:8080/user-message";

    const [oldMsgData, setOldMsgData] = useState([]);
    const [newMsgsData, setNewMsgs] = useState([]);
    const [nextMsgId, setNextMsgId] = useState(0);

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
        const newReceivedMsgObj = {
            id: msgObj.id,
            targetid: msgObj.targetid,
            sourceid: msgObj.sourceid,
            message: msgObj.message,
            createdat: msgObj.createdat,
        };
        console.log("new Received msg data", newReceivedMsgObj);
        setNewMsgs((prevNewMsgs) => [...prevNewMsgs, newReceivedMsgObj]);
    };

    // send msg to ws
    const sendMsgHandler = (msg) => {
        let privateChatPayloadObj = {};
        privateChatPayloadObj["label"] = "private";
        privateChatPayloadObj["id"] = Date.now(); // temp
        privateChatPayloadObj["targetid"] = friendId;
        privateChatPayloadObj["sourceid"] = selfId;
        privateChatPayloadObj["message"] = msg;

        const createdatObj = new Date();
        const selfNewMsgObject = {
            // id: Date.now(), // id is assigned by autoincrement
            targetid: friendId,
            sourceid: selfId,
            message: msg,
            createdat: createdatObj.toString(),
        }

        console.log("new self msg data", selfNewMsgObject);
        setNewMsgs((prevNewMsgs) => [...prevNewMsgs, selfNewMsgObject]);

        wsCtx.websocket.send(JSON.stringify(privateChatPayloadObj));
        // wsCtx.websocket.send(msg);
    };

    console.log("new msg data (outside)", newMsgsData);

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
            if (data.data) {
                const [oldMsgArr] = Object.values(data);
                oldMsgArr.sort((b, a) => Date.parse(b.createdat) - Date.parse(a.createdat));
                console.log("soreted old msg data", oldMsgArr);
                setOldMsgData(oldMsgArr);
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
            <ChatboxMsgArea oldMsgItems={oldMsgData} newMsgItems={newMsgsData}/>
            <SendMsg onSendMsg={sendMsgHandler}/>            
        </div>
    );
};

export default Chatbox;