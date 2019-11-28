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
    ".logo-box": {
        order: "1",
        display: "flex",
        width: "33%",
        height: "100%",
        alignItems: "center",
    },

    ".search-box": {
        order: "2",
        display: "flex",
        width: "33%",
        flexGrow: "1",
        height:"100%",
        justifyContent: "center",
    },

    ".bookmark-box": {
        order: "3",
        display: "flex",
        justifyContent: "flex-end",
        width: "33%",
        flexGrow: "1",
    },

    ".logo a": {
        order: "1",
        color: "white",
        textDecoration: "none",
        letterSpacing: ".45rem",
        fontFamily: '"Bauhaus 93", "Arial", sans-serif',
        fontSize: "8vh",
    },
    
    ".search": {height: "100%", width: "100%", fontSize: "40px"},
    
    ".add-bm": {color: "white", fontFamily: '"Arial", sans-serif', fontSize: "4vh", fontWeight: 'bold' },

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

                <div style={converted[".logo-box"]} ><h1 className="logo" style={converted[".logo a"]} ><a href="landing" style={converted[".logo a"]}>OBMT</a></h1></div>
                
                <div style={converted[".search-box"]}><input type="search" className="search" style={converted[".search"]} placeholder="search..." /></div>
                
                <div style={converted[".bookmark-box"]}><div className="add-bm" style={converted[".add-bm"]}><p>Add Bookmark</p></div></div>

            </div>
            <div className="content-main" style={converted[".content-main"]}>
                <div className="bookmark-display" style={converted[".bookmark-display"]}></div>
            </div>
        </div>

    )
}