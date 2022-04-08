import React from "react";
import DarkMode from "./DarkMode";
import Feed from "./Feed";
import QHeader from "./QHeader";
import "./Quora.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget";

function Quora() {
    return (
        <div className="quora ">
            <QHeader />
            <DarkMode />

            <div className="quora__content h-[100vw] mt-3">
                <Sidebar />
                <Feed />
                <Widget />
            </div>
        </div>
    );
}

export default Quora;
