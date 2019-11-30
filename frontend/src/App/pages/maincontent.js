import React, { useState } from 'react'
import { ModalProvider, Modal } from '../components/loginModal';
import { CommentBox, Comment } from '../components/scrollingBox';
import { CallSearch } from '../components/apiCalls';

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
        height: "100%",
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

    ".search": { height: "100%", width: "100%", fontSize: "40px" },

    ".add-bm": { color: "white", fontFamily: '"Arial", sans-serif', fontSize: "4vh", fontWeight: 'bold', cursor: "pointer", },

    ".bookmark-modal": {
        width: 400,
        textAlign: "center",
    },

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


// some fabricated sample data just to demonstrate the scrollbox functionality
//if the scrollbox takes an argument that is a list of objects. 
//
//The objects should have key:value pairs whose key matches the name of a column in the bookmark table
var comment1 = new Comment('Fred Armisten', 'Put a bird on it', '04/21/2011');
var comment1_obj = { title: 'Fred Armisten', url: 'Put a bird on it', description: '04/21/2012' }
var comment2 = new Comment('Moses of Abraham', 'Follow \'em bitchesssssssss sssssssYYAAAAA ZZZZZZZZZZs', '09/10/-2981');
var comment3 = new Comment('Otis Orion', 'Meow meow meow', '19/91/3981');
var comment4 = new Comment('Donald Bush', 'i think ur bad', '09/10/-2981');
var comment5 = new Comment('Abraham Washington', 'popadiso pleasio', '09/10/-2981');
var comment6 = new Comment('Prndl Rni', 'drip drip drip', '09/10/-2981');
var commentsList = [comment1, comment1_obj, comment2, comment3, comment4, comment5, comment6];
//end of fabricated data


export function Main() {
    const [isBookMarkModalOpen, setBookMarkModal] = useState(false);
    return (
        <ModalProvider>
            <div className="shell" style={converted[".shell"]}>
                <div className="content-bar" style={converted[".content-bar"]}>

                    <div style={converted[".logo-box"]} ><h1 className="logo" style={converted[".logo a"]} ><a href="landing" style={converted[".logo a"]}>OBMT</a></h1></div>

                    <div style={converted[".search-box"]}><input type="search" className="search" style={converted[".search"]} placeholder="search..." /></div>

                    <div style={converted[".bookmark-box"]}>
                        <div className="add-bm" onClick={() => setBookMarkModal(true)} style={converted[".add-bm"]}>Add Bookmark</div>
                        {isBookMarkModalOpen && (
                            <Modal onClose={() => setBookMarkModal(false)} style={converted[".bookmark-modal"]} >
                                <p>title</p>
                                <input type="text" name="title" />
                                <p>url</p>
                                <input type="text" name="url" />
                                <p>priority</p>
                                <input type="text" name="priority" />
                                <p>description</p>
                                <input type="text" name="description" />
                                <p>tags</p>
                                <input type="text" name="tags" />
                            </Modal>
                        )}
                    </div>
                </div>
                <div className="content-main" style={converted[".content-main"]}>
                    <div className="bookmark-display" style={converted[".bookmark-display"]}>
                        {/* The function: CommentBox(arg) takes a list of objects in the form described in the comment above this export function */}
                        {/* For now it will only display 3 attributes but this will be modfied later in components/scrollingbox.js */}
                        <div style={{ display: 'flex', width: 'fit', height: '100%', overflowY: 'hidden', justifyContent: 'flex-start' }}>{CommentBox(commentsList)}</div>
                    </div>
                </div>
            </div>
        </ModalProvider>

    )
}