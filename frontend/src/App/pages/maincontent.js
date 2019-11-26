import React from 'react'

const converted = {
    body: { margin: "0" },
    html: { boxSizing: "border-box" },
    "*, *::before, *::after": { boxSizing: "inherit", position: "relative" },
    ".shell": {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#FECB4E",
        top: "0",
        left: "0"
    },
    ".content-bar": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "8vh",
        backgroundColor: "#0982AF"
    },
    ".logo a": {
        color: "white",
        textDecoration: "none",
        letterSpacing: ".45rem",
        fontFamily: '"Bauhaus 93", "Arial", sans-serif',
        fontSize: "80px"
    },
    ".search": { height: "100%", width:"45vw"},
    ".add-bm": { color: "#0982AF", fontFamily: '"Arial", sans-serif', fontSize: "20px",fontWeight: 'bold' },
    ".circle": { borderColor: "#FECB4E", backgroundColor: "white", },
    ".content-main": {
        display: "flex",
        height: "100%",
        justifyContent: "space-around",
        alignItems: "center"
    },
    ".bookmark-display": {
        backgroundColor: "#F1F9FF",
        borderRadius: "25px",
        width: "45%",
        height: "90%",
        border: "solid"
    }
};


export function Main() {

    return (
        <div className="shell" style={converted[".shell"]}>

            <div className="content-bar" style={converted[".content-bar"]}>
                <h1 className="logo" style={converted[".logo a"]} ><a href="#" style={converted[".logo a"]}>OBMT</a></h1>
                <div className="search" style={converted[".search"]}>
                    <input type="search" className="search" style={converted[".search"]} placeholder="search..." />
                </div>
                <div className="circle" style={converted[".circle"]}>
                    <div className="add-bm" style={converted[".add-bm"]}><p>Add Bookmark</p></div>
                </div>
            </div>

            <div className="content-main" style={converted[".content-main"]}>
                <div className="bookmark-display" style={converted[".bookmark-display"]}></div>
            </div>
        </div>

    )
}