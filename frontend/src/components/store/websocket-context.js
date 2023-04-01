import React, {useState, useEffect} from "react";

const WebSocketContext = React.createContext({
    websocket: null,
    setWebSocket: () => {}
});

export default WebSocketContext;