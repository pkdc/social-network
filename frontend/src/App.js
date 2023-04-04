import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/pages/Root";
import Landingpage from './components/pages/Landingpage';
import LoginForm from './components/pages/LoginForm';
import RegForm from './components/pages/RegForm';
import PostsPage from './components/pages/PostsPage';
import GroupPage from "./components/pages/GroupPage";
import GroupProfilePage from "./components/pages/GroupProfilePage";
import ProfilePage from "./components/pages/ProfilePage";
import AuthContext from "./components/store/auth-context";
// import WebSocketContext from "./components/store/websocket-context";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  
  const loginURL = "http://localhost:8080/login";
  const regURL = "http://localhost:8080/reg";
  const logoutURL = "http://localhost:8080/logout";

  //  testing
  // localStorage.setItem("user_id", 25);
  // localStorage.setItem("fname", "Pika");
  // localStorage.setItem("lname", "chu");
  // localStorage.setItem("nname", "PikaPika");
  // localStorage.setItem("avatar", "data:image/png;base64,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");

  const loginHandler = (loginPayloadObj) => {
    console.log("app.js", loginPayloadObj);
    const reqOptions = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginPayloadObj)
    };
    fetch(loginURL, reqOptions)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        setLoggedIn(true);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("fname", data.fname);
        localStorage.setItem("lname", data.lname);
        localStorage.setItem("dob", data.dob);
        data.nname && localStorage.setItem("nname", data.nname);
        data.avatar && localStorage.setItem("avatar", data.avatar);
        data.about && localStorage.setItem("about", data.about);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  const regHandler = (regPayloadObj) => {
    console.log("app.js", regPayloadObj);
    const reqOptions = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(regPayloadObj)
    };
  
    fetch(regURL, reqOptions)
      .then(resp => resp.json())
      .then(data => {
          console.log(data);
          // redirect to login
          if (data.success) {
            console.log(data.success);
            setRegSuccess(true);
          //   setLoggedIn(true);
          //   localStorage.setItem("user_id", data.user_id);
          //   localStorage.setItem("fname", data.fname);
          //   localStorage.setItem("lname", data.lname);
          //   localStorage.setItem("dob", data.dob);
          //   data.nname && localStorage.setItem("nname", data.nname);
          //   data.avatar && localStorage.setItem("avatar", data.avatar);
          //   data.about && localStorage.setItem("about", data.about);
          } else {
            setRegSuccess(false);
          }
      })
      .catch(err => {
        console.log(err);
      })
  };

  useEffect(() => {localStorage.getItem("user_id") && setLoggedIn(true)}, []);
  
  console.log("reg success", regSuccess);
  
  const logoutHandler = () => {
    localStorage.clear();
 
    const reqOptions = {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(logoutURL, reqOptions)
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    
    setLoggedIn(false);

    // in case the next user wants to reg
    setRegSuccess(false);
  };

  let router = createBrowserRouter([
    {path: "/", element: <Landingpage />},
    {path: "/login", element: <LoginForm onLogin={loginHandler}/>},
    {path: "/reg", element: <RegForm onReg={regHandler} success={regSuccess} />},
    {path: "/groupprofile", element: <GroupProfilePage />},
    {path: "/group", element: <GroupPage />},
  ]);

 if (loggedIn) router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
          {path: "/", element: <PostsPage />},
          {path: "/profile", element: <ProfilePage />},
          {path: "/group", element: <GroupPage />},
          {path: "/groupprofile", element: <GroupProfilePage />},
          // {path: "/groups", element: <GroupPage />},
          {path: "/profile/:userId"}
          // {path: "/user/:userId", element <UserProfilePage />},
      ],
    }
  

  ]);

  // websocket
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (loggedIn) {
//       const newSocket = new WebSocket("ws://localhost:8080/ws");

//       newSocket.onOpen = () => {
//           console.log("ws connected");
//           setSocket(newSocket);
//       };
      
//       newSocket.onClose = () => {
//           console.log("bye ws");
//           setSocket(null);
//       };

//       newSocket.onError = (err) => console.log("ws error");

//       return () => {
//           newSocket.close();
//       };
//     }
    
// }, [loggedIn]);

  return (
    <AuthContext.Provider value={{
      isLoggedIn: loggedIn,
      onLogout: logoutHandler
    }}>
      {/* <WebSocketContext.Provider value={{
        websocket: socket
      }}> */}
      <RouterProvider router={router}/>
      {/* </WebSocketContext.Provider> */}
    </AuthContext.Provider>
  );
}

export default App;
