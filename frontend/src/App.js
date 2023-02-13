import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from './components/UI/Card';
import Form from './components/UI/Form';
import Landingpage from './components/pages/Landingpage';
import LoginForm from './components/pages/LoginForm';
import RegForm from './components/pages/RegForm';
import PostsPage from './components/pages/PostsPage';
import { useState } from "react";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  let router = createBrowserRouter([
    {path: "/", element: <Landingpage />},
    {path: "/login", element: <LoginForm />},
    {path: "/reg", element: <RegForm />},
  ]);

  if (loggedIn) router = createBrowserRouter([
    {path: "/", element: <PostsPage />},
  ]);

  return <RouterProvider router={router}/>;
}

export default App;
