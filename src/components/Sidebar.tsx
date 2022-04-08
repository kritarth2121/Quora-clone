import React from "react";
import SidebarOptions from "./SidebarOptions";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar md:w-3/12 md:block hidden  ">
            <SidebarOptions />
        </div>
    );
}

export default Sidebar;
