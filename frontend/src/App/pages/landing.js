import React, { Component, useState, useContext, createContext } from 'react';
import { ModalProvider, Modal } from '../components/loginModal';
import axios from 'axios';
import { builtinModules } from 'module';


const converted = {
    body: { backgroundColor: "#FECB4E" },
    ".shell": { display: "flex", height: "98vh", flexDirection: "column" },
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
        backgroundSize: "contain",
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


export function Landing() {
    // const onButtonClick = useContext(ModalContext);
    const [isRegModalOpen, setRegModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    let UserId = 0;

    // PROTOtYPE FOR BACKEND CALL
    function doSomething() {
        axios.get(`/api/getList`)
          .then(res => {
            console.log(res.data)    
        })
    }

    // LOGIN CALL
    function CallLogin(name, pw) {
        axios.post(`/api/login`, {
            username: name,
            password: pw
        })
        .then(res => {
            if(res == 1){
                //successful login
                // Store user's DB ID in global variable
                UserId = res.data;
            }
            else {
                //unsuccessful login
            }    
        })
    }

    // REGISTER CALL
    function CallRegister(name, pw, dob) {
        axios.post(`/api/register`, {
            username: name,
            password: pw,
            birthdate: dob
        })
        .then(res => {
            if(res == 1){
                //successful register & login
                UserId = res.data;
            }
            else {
                //unsuccessful register (could be login exists OR some other issue)
            }    
        })
    }

    // ADD/EDIT CALL
    function CallRegister(bid, t, u, p, desc, d, tag) {
        axios.post(`/api/modify`, {
            userId: UserId,
            bid: builtinModules,
            title: t,
            url: u,
            priority: p,
            description: desc,
            date: d,
            tags: tag
        })
        .then(res => {
            if(res == 1){
                //successful creation / modification of bookmark
            }
            else {
                // something went wrong
            }    
        })
    }

    //DELETE CALL
    function CallDelete(bid) {
        axios.post(`/api/delete`, {
            userId: UserId,
            bid: builtinModules
        })
        .then(res => {
            if(res == 1){
                //successful deletion of bookmark
            }
            else {
                // something went wrong
            }    
        })
    }

    //SEARCH CALL
    function CalSearch(searchString) {
        axios.post(`/api/search`, {
            userId: UserId,
            search: searchString
        })
        .then(res => {
            if(res == 1){
                // @@@@@@@@@@@@@@ HANDLE RETURNED STUFF @@@@@@@@@@@@@@@@@
            }
            else {
                // something went wrong
            }    
        })
    }

    return (
        <ModalProvider>
            <div className="body" style={converted.body}>
                <div className="shell" style={converted[".shell"]}>
                    <div className="content-upper" style={converted[".content-upper"]} />
                    <div className="content-splitter" style={converted[".content-splitter"]} />
                    <div className="content-lower" style={converted[".content-lower"]}>
                        <div className="detail-circle" style={converted[".detail-circle"]}>detail1</div>
                        <div className="detail-circle" style={converted[".detail-circle"]}>detail2</div>
                        <div className="access-container" style={converted[".access-container"]}>

                            
                            {/* These next sections are the log in and register options */}

                            <div className="access-box" style={converted[".access-box"]}>
                                <div onClick={() => setIsModalOpen(true)}>Login</div>
                                {isModalOpen && (
                                    <Modal onClose={() => setIsModalOpen(false)} style={{ width: 400, textAlign: "center" }}>
                                        <p>Username</p>
                                        <input type="text" name="name" />
                                        <p>password</p>
                                        <input type="text" name="password" />
                                        <button name="New" onClick={() => doSomething()}>NEW</button>
                                    </Modal>
                                )}
                            </div>

                            <div className="access-box" style={converted[".access-box"]}>
                                <div onClick={() => setRegModal(true)}>Register</div>
                                {isRegModalOpen && (
                                    <Modal onClose={() => setRegModal(false)} style={{ width: 400, textAlign: "center" }}>
                                        <p>Username</p>
                                        <input type="text" name="name" />
                                        <p>password</p>
                                        <input type="text" name="password" />
                                        <p>dob</p>
                                        <input type="text" name="dob" />
                                    </Modal>
                                )}
                            </div>
                            

                        </div>
                        <div className="detail-circle" style={converted[".detail-circle"]}>detail3</div>
                        <div className="detail-circle" style={converted[".detail-circle"]}>detail4</div>
                    </div>
                </div>
            </div>
        </ModalProvider>
    )
}



