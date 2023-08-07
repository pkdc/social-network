import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "./users-context";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  onReg: (regPayloadObj) => {},
  onLogin: (loginPayloadObj) => {},
  onLogout: () => {},
  regSuccess: false,
  notif: [],
  errMsg: "",
  setErrMsg: () => {},
  regIsLoading: false,
  regError: null,
  loginIsLoading: false,
  loginError:null,
});

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [notif, setNotif] = useState([])
  const [errMsg, setErrMsg] = useState("");
  const loginURL = "http://localhost:8080/login";
  const regURL = "http://localhost:8080/reg";
  const logoutURL = "http://localhost:8080/logout";

  const usersCtx = useContext(UsersContext);

  const [regIsLoading, setRegIsLoading] = useState(false);
  const [regError, setRegError] = useState(null);

  const regHandler = (regPayloadObj) => {
    setRegIsLoading(true);
    setRegError(null);

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
    setTimeout(() => {
    fetch(regURL, reqOptions)
      .then(resp => {
        if (!resp.ok) throw new Error ("Failed to Register");
        return resp.json();
      })
      .then(data => {
        console.log(data);
        // redirect to login
        if (data.success) {
          console.log(data.success);
          setRegSuccess(true);
          usersCtx.onNewUserReg();
        } else {
          setRegSuccess(false);
          // alert(data.fname)
          setErrMsg(data.fname)
        }
      })
      .catch(err => {
        // console.log(err);
        setRegError(err.message);
      })
      setRegIsLoading(false);
  }, 3000);
  };

  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

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
        console.log("login", data);
        if (data.resp.success) {
          setLoggedIn(true);
          localStorage.setItem("user_id", data.resp.user_id);
          localStorage.setItem("fname", data.resp.fname);
          localStorage.setItem("lname", data.resp.lname);
          localStorage.setItem("dob", data.resp.dob);
          data.resp.nname && localStorage.setItem("nname", data.resp.nname);
          data.resp.avatar && localStorage.setItem("avatar", data.resp.avatar);
          data.resp.about && localStorage.setItem("about", data.resp.about);
          localStorage.setItem("public", data.resp.public);
          localStorage.setItem("new_notif", "[]");

          localStorage.setItem("new_notif", JSON.stringify(Object.values(data.notif)));
          setNotif(Object.values(data.notif));

        } else {
          setLoggedIn(false)
          // alert("ERROR - Please check your credentials")
          setErrMsg("ERROR - Please check your credentials")
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  const logoutHandler = () => {
    localStorage.clear();
    localStorage.removeItem("following");

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

  useEffect(() => { localStorage.getItem("user_id") && setLoggedIn(true) }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        onReg: regHandler,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        regSuccess: regSuccess,
        notif: notif,
        errMsg: errMsg,
        setErrMsg: setErrMsg,
        regIsLoading: regIsLoading,
        regError: regError,
        loginIsLoading: loginIsLoading,
        loginError: loginError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};