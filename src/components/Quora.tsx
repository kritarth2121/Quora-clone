import React from "react";
import Feed from "./Feed";
import QHeader from "./QHeader";
import "./Quora.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget";

function Quora() {
    return (
        <div className="quora ">
            <QHeader />

            <div className="quora__content h-[100vw] mt-3">
                <Sidebar />
                <Feed />
                <Widget />
            </div>
        </div>
    );
}

export default Quora;
