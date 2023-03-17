import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../Navigation/MainNav";
import TopNav from "../Navigation/TopNav";

const Root = (props) => {
    return <>
    <TopNav onLogout={props.onLogout}/>
    {/* <MainNav /> */}
    <Outlet/>
    </>
    
};

export default Root;