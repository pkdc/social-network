import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";

const Root = (props) => {
    return <>
    <TopNav onLogout={props.onLogout}/>
    <Outlet/>
    </>
    
};

export default Root;