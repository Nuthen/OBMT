import React, { useState } from 'react';
import { ModalProvider, Modal } from '../components/loginModal';
import { CallLogin, CallRegisterLogin } from '../components/apiCalls'
import { withRouter,Link, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';

const converted = {
    body: { margin: "0",backgroundColor: "#FECB4E"  },
    html: { boxSizing: "border-box" },
    "*, *::before, *::after": { boxSizing: "inherit", position: "relative" },
    ".shell": { display: "flex", top: "0",left: "0", flexDirection: "column",height: "100vh",width: "100vw", },
    ".content-upper": {
        display: "flex",
        height: "70vh",
        borderStyle: "solid",
        flexDirection: "row",
        backgroundColor: "#0982AF",
        borderRadius: "25px",
        borderColor: "#707070",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundImage: 'url("./img1.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        maxWidth: "100%"
    },
    ".content-lower": {
        display: "flex",
        height: "30vh",
        borderStyle: "solid",
        flexDirection: "row",
        backgroundColor: "#0982AF",
        borderRadius: "25px",
        borderColor: "#707070",
        justifyContent: "space-around",
        alignItems: "center"
    },
    ".content-splitter": { display: "flex", height: "5vh" },
    ".detail-circle": {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "67%",
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
        color: "white"
    }
};

class Welcome extends React.Component {
    render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export function Landing() {
    const [isRegModalOpen, setRegModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function loginHelper(name, password){
        CallLogin(name, password);
        setIsModalOpen(false);
    }

    function loginRegisterHelper(name, password, fname, lname){
        CallRegisterLogin(name, password, fname, lname).then(authenticateUser);
        // setIsModalOpen(false);
    }

    const [isLoggedIn, setLoggedInTo] = useState(0);

    
    
    //both login and register "END"  at this function if they are successful.  This function SHOULD
    //redirect users to the maincontent page.
    function authenticateUser(UserID_resp){
        setLoggedInTo(UserID_resp);
        console.log('logged/registered into uid: ',UserID_resp);
        setIsModalOpen(false);
        window.location = '/maincontent';

    }

    function initiateAuthentication(uname,pw,rd){
        CallLogin(uname,pw).then(authenticateUser);
    }

    
  

    return (
        <ModalProvider>
            <div className="body" style={converted.body}>
                <div className="shell" style={converted[".shell"]}>
                    <div className="content-upper" style={converted[".content-upper"]} />
                    <div className="content-splitter" style={converted[".content-splitter"]} />
                    <div className="content-lower" style={converted[".content-lower"]}>
                        <div className="detail-circle" style={converted[".detail-circle"]}>Fun</div>
                        <div className="detail-circle" style={converted[".detail-circle"]}>Fast</div>
                        <div className="access-container" style={converted[".access-container"]}>


                            {/* These next sections are the log in and register options */}

                            <div className="access-box" style={converted[".access-box"]}>
                                <div onClick={() => setIsModalOpen(true)}>Login</div>
                                {isModalOpen && (
                                    <Modal onClose={() => setIsModalOpen(false)} style={{ width: 400, textAlign: "center" }}>
                                        <p>Username</p>
                                        <input type="text" name="uname" id='uname'/>
                                        <p>password</p>
                                        <input type="text" name="password" id='passw'/>
                                        {/* <Link to={'./maincontent'}><button>ContinueNoLogin</button></Link> */}
                                        {/* <button name="New" onClick={() => loginHelper('sam','secret')}>Login</button> */}
                                        {/* <button name="New" onClick={ () => initiateAuthentication('sam','secret')}>Login as sam</button> */}
                                        <button name="New" onClick={ () => initiateAuthentication(
                                            document.getElementById("uname").value,
                                            document.getElementById("passw").value
                                        )}>Login</button>
                                    </Modal>
                                )}
                            </div>

                            <div className="access-box" style={converted[".access-box"]}>
                                <div onClick={() => setRegModal(true)}>Register</div>
                                {isRegModalOpen && (
                                    <Modal onClose={() => setRegModal(false)} style={{ width: 400, textAlign: "center" }}>
                                        <p>Username</p>
                                        <input type="text" name="uname" id="reguname"/>
                                        <p>password</p>
                                        <input type="text" name="password" id="regpw" />
                                        <p>fname</p>
                                        <input type="text" name="fname" id="regfname" />
                                        <p>lname</p>
                                        <input type="text" name="lname"  id="reglname"/>
                                        <br/>
                                        <div id="register_response"></div>
                                        <button name="registerz" onClick={() => loginRegisterHelper(
                                            document.getElementById("reguname").value,
                                            document.getElementById("regpw").value,
                                            document.getElementById("regfname").value,
                                            document.getElementById("reglname").value
                                            // 'dum1wtfmate','dum2','dum3','dum4'
                                        )}>Register</button>
                                    </Modal>
                                )}
                            </div>
                        </div>
                        <div className="detail-circle" style={converted[".detail-circle"]}>Productivity</div>
                        <div className="detail-circle" style={converted[".detail-circle"]}>WOW</div>
                    </div>
                </div>
            </div>
        </ModalProvider>
    )
}

