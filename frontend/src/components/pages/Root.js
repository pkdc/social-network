import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../Navigation/MainNav";

const Root = () => {
    return <>
    <MainNav />
    <Outlet/>
    </>
    
};

export default Root;