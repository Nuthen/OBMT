import React, { Suspense, useState,useEffect  } from 'react'
import { ModalProvider, Modal } from '../components/loginModal';
import { Bookmark } from '../components/scrollingBox';
import { addBookmark, getBookmarks } from '../components/apiCalls';


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

};


// some fabricated sample data just to demonstrate the scrollbox functionality
//if the scrollbox takes an argument that is a list of objects. 
//
//The objects should have key:value pairs whose key matches the name of a column in the bookmark table
var bookmark1 = new Bookmark('Fred Armisten', 'Put a bird on it', '04/21/2011');
var bookmark1_obj = { BID: 1, Title: 'Fred Armisten', URL: 'Put a bird on it', Description: '04/21/2012' }
var bookmark2 = new Bookmark('Moses of Abraham', 'Follow \'em bitchesssssssss sssssssYYAAAAA ZZZZZZZZZZs', '09/10/-2981');
var bookmark3 = new Bookmark('Otis Orion', 'Meow meow meow', '19/91/3981');
var bookmark4 = new Bookmark('Donald Bush', 'i think ur bad', '09/10/-2981');
var bookmark5 = new Bookmark('Abraham Washington', 'popadiso pleasio', '09/10/-2981');
var bookmark6 = new Bookmark('Prndl Rni', 'drip drip drip', '09/10/-2981');
var bookmarksList = [bookmark1, bookmark1_obj, bookmark2, bookmark3, bookmark4, bookmark5, bookmark6];
// var bookmarksListnew = Object.keys(bookmarksList).map(i => bookmarksList[i]);
//end of fabricated data



export function Main() {

    //one time after pageload***
    //after post for bookmark data
    //after receiving response
    //update the page to show the bookmarks
    //*** to change when update happens,  add varriable name to list
    //*** every time that variable changes a rerender will be allowed
    //   https://stackoverflow.com/a/55481525
    useEffect(() => getBookmarks().then(updateBookmarkTable),[]);

    // Updates the state of the table with the response from 
    // the backend
    function updateBookmarkTable(bookmarks) {
        setbookmarkContainer(bookmarks);
        return;
    }
    
        
    
    
    //the following lines define state for certain dynamic page elements
    //both have the same form:
    //const [arg1, arg2] = useState(...)
    // arg1: the state being set
    // arg2: a function to update the state
    const [isBookMarkModalOpen, setBookMarkModal] = useState(false);
    // arg1: isBookMarkModalOpen  ~~>   is the bookmark pop up open?  to start-> no hence false
    // arg2: setBookMarkModal   ~~>  when the button is clicked we call setBookMarkModal(true)  which sets the state to be true (the popup is open)
    const [bookmarkContainer,setbookmarkContainer] = useState(<div>some filler</div>);
    // arg1: bookmarkContainer  ~~> the entire div surrounding the bookmarks from the DB
    // arg2: When promsie is returned we update the state of the div to be the div containing the elements from the DB
    
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
                                <input type="text" name="title" id='title' />
                                <p>url</p>
                                <input type="text" name="url" id='url' />
                                <p>priority</p>
                                <input type="text" name="priority" id='priority' />
                                <p>description</p>
                                <input type="text" name="description" id="description" />
                                <p>tags</p>
                                <input type="text" name="tags" id="tags" />
                                <button name="Addbookmark" onClick={() => addBookmark(
                                    0,
                                    document.getElementById("title").value,
                                    document.getElementById("url").value,
                                    document.getElementById("description").value,
                                    document.getElementById("tags").value,
                                )

                                }>Add bookmark</button>
                            </Modal>
                        )}
                    </div>
                </div>
                <div className="content-main" style={converted[".content-main"]}>
                    <div id='putboxhere' style={{ display: 'flex', width: '50%', height: '100%', overflowY: 'hidden', justifyContent: 'flex-start' }}>
                        <Suspense>{bookmarkContainer}</Suspense>
                        {/* once the items from the DB are returned load it */}
                    </div>
                </div>
            </div>
        </ModalProvider>

    )
}