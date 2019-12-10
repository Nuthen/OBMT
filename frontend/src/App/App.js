import React, { Component, useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { ModalProvider, Modal } from './components/loginModal';
import { CallLogin, CallRegisterLogin, addBookmark, getBookmarks, CallSearch, CallRegisterBookmark } from './components/apiCalls'
import { IoIosLogOut } from 'react-icons/io';


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

  ".IoIosLogOut": {
    color: "white",
    // color: "#2699FB", 
    // cursor: "pointer",
    height: '100%',
    width: '100%'
  },

  "IoIosLogOut": {
    color: "white",
    cursor: "pointer",
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
    textShaddow: "1px 1px 1px #707070",
  },

  ".search": { height: "100%", width: "100%", fontSize: "40px" },

  ".add-bm": { color: "#2699FB", border: 'solid', borderColor: '#2699FB', fontFamily: '"Arial", sans-serif', fontSize: "3vh", fontWeight: 'bold', cursor: "pointer", },

  ".add-bm-hover": { color: "white", border: 'solid', borderColor: 'white', fontFamily: '"Arial", sans-serif', fontSize: "3vh", fontWeight: 'bold', cursor: "pointer", },

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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Authenticator.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/landing' />
  )} />
)

const Authenticator = {
  isAuthenticated: false,
  authenticatedAs: null
}

export function Main(props) {

  console.log(props)

  const [isNestedModalOpen, setNestedModal] = useState(false);
  const [nestedBID, setnestedBID] = useState('');
  const [nestedTitle, setNestedTitle] = useState('');
  const [nestedURL, setnestedURL] = useState('');
  const [nestedDesc, setnestedDesc] = useState('');
  const [nestedDelete, setnestedDelete] = useState(false)
  var nestedModalArr = [isNestedModalOpen, setNestedModal, setnestedBID, setNestedTitle, setnestedURL, setnestedDesc, setnestedDelete];

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
  const [bookmarkContainer, setbookmarkContainer] = useState('');
  // arg1: bookmarkContainer  ~~> the entire div surrounding the bookmarks from the DB
  // arg2: When promsie is returned we update the state of the div to be the div containing the elements from the DB


  //part of the search functionality  -->  ***should*** just work once the backend returns lists.
  //if not it only will need minor tweaks
  function initiateSearch(str) {
    //if (str.slice(-1) == ' ') {
    //the following line may cause errors once the backend is fixxed
    //you can comment out the .then() part to make any errors stop
    CallSearch(str).then(updateBookmarkTable);
    //}
  }

  //after a bookmark is added to backend and we receive response: close modal and refresh bookmark list
  /*async function addBookmarkHelper(resp) {
    
    setBookMarkModal(false);
    const bookmarks = await getBookmarks(nestedModalArr);
    //getBookmarks(nestedModalArr).then(updateBookmarkTable)
      console.log("nestedModalArr");
      console.log(nestedModalArr);
    return updateBookmarkTable(bookmarks);
  }*/

  async function editBMHelper(resp) {
    setNestedModal(false);

    const bookmarks = await getBookmarks(nestedModalArr);
    return updateBookmarkTable(bookmarks);
  }

  async function editSearch(resp) {
    setNestedModal(false);
    document.getElementById('searchWord').value = '';
    const bookmarks = await getBookmarks(nestedModalArr);
    return updateBookmarkTable(bookmarks);
  }

  function delBMHelper() {
    setnestedDelete(false);
    return getBookmarks(nestedModalArr).then(updateBookmarkTable);
  }

  function logOutHelper(props) {
    Authenticator.isAuthenticated = false;
    Authenticator.authenticatedAs = null;
  }

  const [hoveredadd, setHoveredadd] = useState(".add-bm");
  const toggleHoveradd = () => setHoveredadd(".add-bm-hover");
  const toggleUnHoveradd = () => setHoveredadd(".add-bm");

  const [hoveredlogout, setHoveredlogout] = useState(26);
  const toggleHoverlogout = () => setHoveredlogout(24);
  const toggleUnHoverlogout = () => setHoveredlogout(26);


  return (
    <ModalProvider>
      <div className="shell" style={converted_main[".shell"]}>
        <div className="content-bar" style={converted_main[".content-bar"]}>
          <div style={converted_main[".logo-box"]} ><h1 className="logo" style={converted_main[".logo a"]} ><a href="landing" style={converted_main[".logo a"]}>OBMT</a></h1></div>
          <div style={converted_main[".search-box"]}><input type="search" id="searchWord" className="search" style={converted_main[".search"]} placeholder="search..." />
            <button name="mod_searchbookmarksbutton" onClick={() => initiateSearch(document.getElementById('searchWord').value)}>Search</button>
            <button name="mod_clearsearchbookmarksbutton" onClick={() => editSearch()}>Clear Search</button></div>
          <div style={converted_main[".bookmark-box"]}>
            <div className="add-bm" onClick={() => setBookMarkModal(true)} style={converted_main[hoveredadd]} onMouseEnter={toggleHoveradd} onMouseLeave={toggleUnHoveradd}>Add Bookmark</div>
            <div style={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hide' }}><a href="landing"><IoIosLogOut size={hoveredlogout} onMouseEnter={toggleHoverlogout} onMouseLeave={toggleUnHoverlogout} onClick={() => logOutHelper(props)} /></a></div>
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
                ).then(addBookmarkHelper).then(editBMHelper)//.then(updateBookmarkTable)
                }>Add Bookmark</button>&nbsp;
                                <button name="add_close" onClick={() => setBookMarkModal(false)}>Close</button>
              </Modal>
            )}
          </div>
        </div>
        <div className="content-main" style={converted_main[".content-main"]}>
          <div id='putboxhere' style={{ display: 'flex', width: '50%', height: '100%', overflowY: 'hidden', justifyContent: 'flex-start' }}>
            <div id='putboxhere' style={{ display: 'flex', width: '100%', flexDirection: 'column', overflowX: 'hidden', listStyleType: 'none', backgroundColor: '#F1F9FF', alignItems: 'stretch', }}>
              <Suspense>{bookmarkContainer}</Suspense></div>
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
            <p><button name="mod_bookmark" onClick={() => CallRegisterBookmark({ nestedBID }, { nestedTitle }, { nestedURL }, 1, { nestedDesc }).then(editBMHelper)}>Submit</button>&nbsp;
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





const converted = {
  body: { margin: "0", backgroundColor: "#FECB4E" },
  html: { boxSizing: "border-box" },
  "*, *::before, *::after": { boxSizing: "inherit", position: "relative" },
  ".shell": { display: "flex", top: "0", left: "0", flexDirection: "column", height: "100vh", width: "100vw", },
  ".content-upper": {
    display: "flex",
    height: "70%",
    width: "100%",
    flexDirection: "column",
    borderRadius: "20px",
    borderColor: "#707070",
    alignItems: "center",
    backgroundImage: 'url("./img1.png")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    maxWidth: "100%"
  },
  ".content-lower": {
    display: "flex",
    height: "30%",
    borderStyle: "solid",
    flexDirection: "row",
    backgroundColor: "#0982AF",
    borderRadius: "25px",
    borderColor: "#707070",
    borderWidth: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  ".content-splitter": { display: "flex", height: "2vh" },
  ".detail-circle": {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "70%",
    width: "10%",
    borderStyle: "solid",
    borderRadius: "50%",
    borderColor: "#707070",
    backgroundColor: "#93C8DC",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "large",
    color: "seashell"
  },
  ".access-container": {
    display: "flex",
    height: "80%",
    width: "20vw",
    borderStyle: "solid",
    borderRadius: "25px",
    borderColor: "#707070",
    backgroundColor: "#93C8DC",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  ".access-box": {
    display: "flex",
    height: "40%",
    width: "70%",
    justifyContent: "space-around",
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: "25px",
    borderColor: "#707070",
    backgroundColor: "#2699FB",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "xx-large",
    color: "white",
    cursor: "pointer",
  },
  ".access-box-hover": {
    backgroundColor: "white",
    color: "#2699FB",
    display: "flex",
    height: "40%",
    width: "70%",
    justifyContent: "space-around",
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: "25px",
    borderColor: "#707070",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "xx-large",
    cursor: "pointer",
  }

};




export function Landing(props) {


  const [isRegModalOpen, setRegModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function loginHelper(name, password) {
    CallLogin(name, password);
    setIsModalOpen(false);
  }

  function loginRegisterHelper(name, password, fname, lname) {
    CallRegisterLogin(name, password, fname, lname).then(authenticateUser);
  }

  //both login and register "END"  at this function if they are successful.  This function SHOULD
  //redirect users to the maincontent page.
  function authenticateUser(UserID_resp) {
    setIsModalOpen(false);
    Authenticator.isAuthenticated = true;
    Authenticator.authenticatedAs = UserID_resp;
    console.log(props)
    props.history.push('/protected');
  }

  function initiateAuthentication(uname, pw, rd) {
    CallLogin(uname, pw).then(authenticateUser, (e) => { alert(e) });
  }

  const [hoveredLogin, setHoveredLogin] = useState(".access-box");
  const toggleHoverLogin = () => setHoveredLogin(".access-box-hover");
  const toggleUnHoverLogin = () => setHoveredLogin(".access-box");

  const [hoveredRegister, setHoveredRegister] = useState(".access-box");
  const toggleHoverRegister = () => setHoveredRegister(".access-box-hover");
  const toggleUnHoverRegister = () => setHoveredRegister(".access-box");

  return (
    <ModalProvider>
      <div>
        <div className="body" style={converted.body}>
          <div className="shell" style={converted[".shell"]}>
            <div className="content-upper" style={converted[".content-upper"]}></div>
            <div className="content-splitter" style={converted[".content-splitter"]} />
            <div className="content-lower" style={converted[".content-lower"]}>
              <div className="detail-circle" style={converted[".detail-circle"]}>Fun</div>
              <div className="detail-circle" style={converted[".detail-circle"]}>Fast</div>
              <div className="access-container" style={converted[".access-container"]}>
                {/* These next sections are the log in and register options */}
                <div className="access-box" style={converted[hoveredLogin]} onMouseEnter={toggleHoverLogin} onMouseLeave={toggleUnHoverLogin}>
                  <div onClick={() => setIsModalOpen(true)}>Login</div>
                  {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)} style={{ width: 400, textAlign: "center" }}>
                      <p>Username: &nbsp; &nbsp;
                    <input type="text" name="uname" id='uname' /></p>
                      <p>Password:   &nbsp; &nbsp;&nbsp;
                    <input type="password" name="password" id='passw' /></p>
                      <p>
                        <button name="New" onClick={() => initiateAuthentication(document.getElementById("uname").value, document.getElementById("passw").value)}>Login</button>&nbsp;
                    <button onClick={() => setIsModalOpen(false)}>Exit</button>
                      </p>
                    </Modal>
                  )}
                </div>
                <div className="access-box" style={converted[hoveredRegister]} onMouseEnter={toggleHoverRegister} onMouseLeave={toggleUnHoverRegister}>
                  <div onClick={() => setRegModal(true)}>Register</div>
                  {isRegModalOpen && (
                    <Modal onClose={() => setRegModal(false)} style={{ width: 400, textAlign: "center" }}>
                      <p>Username: &nbsp;&nbsp;
                                      <input type="text" name="uname" id="reguname" /></p>
                      <p>Password: &nbsp;&nbsp;&nbsp;
                                      <input type="password" name="password" id="regpw" /></p>
                      <p>First Name: &nbsp;
                                      <input type="text" name="fname" id="regfname" /></p>
                      <p>Last Name: &nbsp;
                                      <input type="text" name="lname" id="reglname" /></p>
                      <br />
                      <div id="register_response"></div>
                      <p><button name="registerz" onClick={() => loginRegisterHelper(
                        document.getElementById("reguname").value,
                        document.getElementById("regpw").value,
                        document.getElementById("regfname").value,
                        document.getElementById("reglname").value
                      )}>Register</button>&nbsp;<button onClick={() => setRegModal(false)}>Exit</button></p>
                    </Modal>
                  )}
                </div>
              </div>
              <div className="detail-circle" style={converted[".detail-circle"]}>Productivity</div>
              <div className="detail-circle" style={converted[".detail-circle"]}>WOW</div>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  )
}



export default function App() {
  return (
    <Router>
      <div>
        <Route path='/landing' component={Landing} />
        <PrivateRoute path='/protected' component={Main} />
      </div>
    </Router>
  );
}