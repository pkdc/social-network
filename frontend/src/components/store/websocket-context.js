import React, {useState, useEffect} from "react";

export const WebSocketContext = React.createContext({
    websocket: null,
    newMsgsObj: {},
    setNewMsgsObj: () => {},
});

export const WebSocketContextProvider = (props) => {
    const [socket, setSocket] = useState(null);
    const [newMsgsObj, setNewMsgsObj] = useState(null);
    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8080/ws")

        newSocket.onopen = () => {
            console.log("ws connected");
            setSocket(newSocket);
        };
        
        newSocket.onclose = () => {
            console.log("bye ws");
            setSocket(null);
        };

        newSocket.onerror = (err) => console.log("ws error");

        newSocket.onmessage = (e) => {
            
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
            setNewMsgsObj(newReceivedMsgObj);
        };

        return () => {
            newSocket.close();
        };  
    }, []);
         
    return (
        <WebSocketContext.Provider value={{
            websocket: socket,
            newMsgsObj: newMsgsObj,
            setNewMsgsObj: setNewMsgsObj,
        }}>
            {props.children}
        </WebSocketContext.Provider>
    );
};