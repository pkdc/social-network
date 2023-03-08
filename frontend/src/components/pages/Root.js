import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../Navigation/MainNav";
import TopMenu from "../Navigation/TopMenu";

const Root = () => {
    return <>
    <TopMenu/>
    <MainNav />
    <Outlet/>
    </>
    
};

export default Root;