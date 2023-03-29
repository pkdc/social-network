import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";
import ChatSidebar from "../Navigation/ChatSidebar";

const Root = (props) => {
    return <>
    <TopNav onLogout={props.onLogout}/>
    <ChatSidebar />
    <Outlet/>
    </>
    
};

export default Root;