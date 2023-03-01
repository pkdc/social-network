import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from './components/UI/Card';
import Form from './components/UI/Form';
import Landingpage from './components/pages/Landingpage';
import LoginForm from './components/pages/LoginForm';
import RegForm from './components/pages/RegForm';
import PostsPage from './components/pages/PostsPage';
import { useState } from "react";
import GroupPage from "./components/pages/GroupPage";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginURL = "http://localhost:8080/login/";
  const regURL = "http://localhost:8080/reg/";

  const loginHandler = (loginPayloadObj) => {
    console.log("app.js", loginPayloadObj);
    const reqOptions = {
      method: "POST",
      body: JSON.stringify(loginPayloadObj)
    };
    fetch(loginURL, reqOptions)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        setLoggedIn(true);
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
      body: JSON.stringify(regPayloadObj)
    };
  
    fetch(regURL, reqOptions)
      .then(resp => resp.json())
      .then(data => {
          console.log(data);
          if (data.success) {
            setLoggedIn(true);
          }
      })
      .catch(err => {
        console.log(err);
      })
  };
  
  let router = createBrowserRouter([
    {path: "/", element: <Landingpage />},
    {path: "/login", element: <LoginForm onLogin={loginHandler}/>},
    {path: "/reg", element: <RegForm onReg={regHandler}/>},
    {path: "/group", element: <GroupPage />},
  ]);

  if (loggedIn) router = createBrowserRouter([
    {path: "/", element: <PostsPage />},
    {path: "/login", element: <PostsPage />},
    {path: "/reg", element: <PostsPage />},
    {path: "/group", element: <GroupPage />},
  ]);

  return <RouterProvider router={router}/>;
}

export default App;
