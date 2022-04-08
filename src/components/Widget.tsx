import React from "react";
import "./Widget.css";
import WidgetContent from "./WidgetContent";

function Widget() {
    return (
        <div className="widget md:w-3/12">
            <div className="fixed bg-white border mr-4">
                <div className="widget__header">
                    <h5>Spaces to follow</h5>
                </div>
                <div className="widget__contents">
                    <WidgetContent />
                </div>
            </div>
        </div>
    );
}

export default Widget;
