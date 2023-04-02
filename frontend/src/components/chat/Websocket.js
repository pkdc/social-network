// import { useEffect, useState } from "react";

// const Websocket = () => {

//     useEffect(() => {
//         const [socket, setSocket] = useState(null);
//         const [msg, setMsg] = useState("");

//         const newSocket = new Websocket("ws://localhost:8080/ws");

//         newSocket.onOpen = () => {
//             console.log("ws connected");
//             setSocket(newSocket);
//         };
        
//         newSocket.onClose = () => {
//             console.log("bye ws");
//             setSocket(null);
//         };

//         newSocket.onError = (err) => console.log("ws error");

//         newSocket.onMessage = (resp) => {
//             console.log("ws resp:", resp);
//             const msg = JSON.parse(resp.data);
//             console.log("ws msg:", msg);
//         };

//         return () => {
//             newSocket.close();
//         };
//     }, []);
// };

// export default Websocket;