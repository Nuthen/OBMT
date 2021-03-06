import React, { Suspense, useState, useEffect } from 'react'
import { ModalProvider, Modal } from '../components/loginModal';
import { addBookmark, getBookmarks, CallSearch, CallRegisterBookmark } from '../components/apiCalls';


const converted_main = {
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

    ".logout":{
        order:"3",
    },

    ".bookmark-box": {
        order: "4",
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

    ".bookmark_modal": {
        width: 300,
        textAlign: "center",
    },

    ".content-main": {
        display: "flex",
        height: "100%",
        justifyContent: "space-around",
        alignItems: "center"
    },

};



export function Main(props) {

    console.log(props)

    const [isNestedModalOpen, setNestedModal] = useState(false);
    const [nestedBID, setnestedBID] = useState('');
    const [nestedTitle, setNestedTitle] = useState('');
    const [nestedURL, setnestedURL] = useState('');
    const [nestedDesc, setnestedDesc] = useState('');
    const [nestedDelete, setnestedDelete] = useState(false)
    var nestedModalArr = [isNestedModalOpen, setNestedModal, setnestedBID, setNestedTitle, setnestedURL, setnestedDesc,setnestedDelete];

    //one time after pageload***
    //after post for bookmark data
    //after receiving response
    //update the page to show the bookmarks
    //*** to change when update happens,  add varriable name to list
    //*** every time that variable changes a rerender will be allowed
    //   https://stackoverflow.com/a/55481525
    useEffect(() => getBookmarks(nestedModalArr, (e) => alert(e)).then(updateBookmarkTable), []);



    // Updates the state of the table with the response from 
    // the backend
    function updateBookmarkTable(bookmarks) {
        setbookmarkContainer(bookmarks);
        return;
    }

    //after a bookmark is added to backend and we receive response: close modal and refresh bookmark list
    function addBookmarkHelper(resp) {
        setBookMarkModal(false);
        return getBookmarks();
    }

    //the following lines define state for certain dynamic page elements
    //both have the same form:
    //const [arg1, arg2] = useState(...)
    // arg1: the state being set
    // arg2: a function to update the state
    const [isBookMarkModalOpen, setBookMarkModal] = useState(false);
    // arg1: isBookMarkModalOpen  ~~>   is the bookmark pop up open?  to start-> no hence false
    // arg2: setBookMarkModal   ~~>  when the button is clicked we call setBookMarkModal(true)  which sets the state to be true (the popup is open)
    const [bookmarkContainer, setbookmarkContainer] = useState(<div>some filler</div>);
    // arg1: bookmarkContainer  ~~> the entire div surrounding the bookmarks from the DB
    // arg2: When promsie is returned we update the state of the div to be the div containing the elements from the DB


    //part of the search functionality  -->  ***should*** just work once the backend returns lists.
    //if not it only will need minor tweaks
    function initiateSearch(str) {
        if (str.slice(-1) == ' ') {
            //the following line may cause errors once the backend is fixxed
            //you can comment out the .then() part to make any errors stop
            CallSearch(str).then(updateBookmarkTable);
        }
    }

    async function editBMHelper(resp){
        setNestedModal(false);
        const bookmarks = await getBookmarks(nestedModalArr);
        return updateBookmarkTable(bookmarks);
    }

    function delBMHelper(){
        setnestedDelete(false);
        return getBookmarks(nestedModalArr).then(updateBookmarkTable);
    }

    function logOutHelper(props){
        // props.Authenticator.isAuthenticated = false;
        // props.Authenticator.authenticatedAs = null;
    }

    
    return (
        <ModalProvider>
            <div className="shell" style={converted_main[".shell"]}>
                <div className="content-bar" style={converted_main[".content-bar"]}>
                    <div style={converted_main[".logo-box"]} ><h1 className="logo" style={converted_main[".logo a"]} ><a href="landing" style={converted_main[".logo a"]}>OBMT</a></h1></div>
                    <div style={converted_main[".search-box"]}><input type="search" onChange={e => initiateSearch(e.target.value)} className="search" style={converted_main[".search"]} placeholder="search..." /></div>
                    <div style={converted_main[".logout"]} onClick={() => logOutHelper(props)} >logout</div>
                    <div style={converted_main[".bookmark-box"]}>
                        <div className="add-bm" onClick={() => setBookMarkModal(true)} style={converted_main[".add-bm"]}>Add Bookmark1</div>
                        {isBookMarkModalOpen && (
                            <Modal onClose={() => setBookMarkModal(false)} style={converted_main[".bookmark-modal"]} >
                                <p>Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="title" id='title' /></p>
                                <p>URL:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="url" id='url' /></p>
                                <p>Priority:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="priority" id='priority' /></p>
                                <p>Description:&nbsp;
                                <input type="text" name="description" id="description" /></p>
                                <p>Tags:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="text" name="tags" id="tags" /></p>
                                <button name="Addbookmark" onClick={() => addBookmark(
                                    0,
                                    document.getElementById("title").value,
                                    document.getElementById("url").value,
                                    document.getElementById("description").value,
                                    document.getElementById("tags").value,
                                ).then(addBookmarkHelper).then(updateBookmarkTable)
                                }>Add New Bookmark</button>&nbsp;
                                <button name="add_close" onClick={() => setBookMarkModal(false)}>Closeit</button>
                            </Modal>
                        )}
                    </div>
                </div>
                <div className="content-main" style={converted_main[".content-main"]}>
                    <div id='putboxhere' style={{ display: 'flex', width: '50%', height: '100%', overflowY: 'hidden', justifyContent: 'flex-start' }}>
                        <Suspense>{bookmarkContainer}</Suspense>
                    </div>
                </div>
                {isNestedModalOpen && (
                        <Modal onClose={() => setNestedModal(false)} style={converted_main[".bookmark_modal"]}>
                            <form>
                            <p>Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="text" id="mod_title" value={nestedTitle} onChange={(e) => setNestedTitle(e.target.value)} /></p>
                            <p>URL:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="text" id="mod_url" value={nestedURL} onChange={(e) => setnestedURL(e.target.value)} /></p>
                            <p>Description:&nbsp;
                            <input type="text" id="mod_desc" value={nestedDesc} onChange={(e) => setnestedDesc(e.target.value)} /></p>
                            </form>
                            <p><button name="mod_bookmark" onClick={() => CallRegisterBookmark({nestedBID},{nestedTitle},{nestedURL},1,{nestedDesc}).then(editBMHelper)}>Submit</button>&nbsp;
                            <button name="mod_close" onClick={() => setNestedModal(false)}>Cancel</button></p>
                        </Modal>
                        )
                }
                {nestedDelete && (
                    delBMHelper()
                )
                }
            </div>
        </ModalProvider>

    )
}


