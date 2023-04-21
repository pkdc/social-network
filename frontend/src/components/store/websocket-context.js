import React, {useState, useEffect} from "react";

export const WebSocketContext = React.createContext({
    websocket: null,
});

export const WebSocketContextProvider = (props) => {
    const [socket, setSocket] = useState(null);
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

        return () => {
            newSocket.close();
        };  
    }, []);
         
    return (
        <WebSocketContext.Provider value={{
            websocket: socket,
        }}>
            {props.children}
        </WebSocketContext.Provider>
    );
};