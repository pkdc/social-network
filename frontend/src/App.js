import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from './components/UI/Card';
import Form from './components/UI/Form';
import Homepage from './components/pages/Homepage';
import LoginForm from './components/pages/LoginForm';

function App() {
  const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "/login", element: <LoginForm />},
  ]);

  return <RouterProvider router={router}/>;
}

export default App;
