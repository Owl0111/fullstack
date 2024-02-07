import React from "react";

const Notification = ({ message, type }) => {
    if (message == "") return null;
    const add = {
        background: "grey",
        borderColor: "green",
        borderStyle: "solid",
        borderWidth: 10,
        color: "green",
        fontSize: 50,
        padding: 10,
        margin: 10,
    };
    return (<div style={add}>{message}</div>);
};
export default Notification;
