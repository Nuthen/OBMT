import React, { useState, useContext } from 'react';
import { CallDelete, CallRegisterBookmark } from './apiCalls'
import { ModalProvider, Modal } from '../components/loginModal';

const modal_style = {
    ".bookmark-modal": {
        width: 400,
        textAlign: "center",
    },
    ".add-bm": { color: "white", fontFamily: '"Arial", sans-serif', fontSize: "4vh", fontWeight: 'bold', cursor: "pointer", },
    ".bookmark-box": {
        order: "3",
        display: "flex",
        justifyContent: "flex-end",
        width: "33%",
        flexGrow: "1",
    },
}

export class Bookmark {
    constructor(Title, URL, Description) {
        this.Title = Title;
        this.URL = URL;
        this.Description = Description;
    }
}

const converted = {
    ".bookmark-modal": {
        width: 400,
        textAlign: "center",
    },
}

function User(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {props.Title}
        </div>
    );
}

function TextBody(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '90%', border: 'dashed', borderRadius: '25px' }}>
            <p>{props.URL}</p>
            <p>{props.Description}</p>
        </div>
    );
}

function CommentBubble(props, nestedModalArr) {
    function deleteBM() {
        CallDelete(props.UID, props.BID).then(afterDelResp);
        return;
    }

    function afterDelResp(resp){
        nestedModalArr[6](true);
        return;
    }

    function setParentStates(){
        nestedModalArr[1](true);
        nestedModalArr[2](props.BID);
        nestedModalArr[3](props.Title);
        nestedModalArr[4](props.URL);
        nestedModalArr[5](props.Description);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 'fit', border: 'solid', borderColor: 'blue', backgroundColor: '#ffe6d5', justifyContent: 'space-between', borderRadius: '25px' }}>
            {User(props)}
            {TextBody(props)}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => deleteBM()}>delete(no auto refresh yet)</button>
                <div style={modal_style[".bookmark-box"]}>
                        <div className="modify" onClick={() => setParentStates()} style={modal_style[".add-bm"]}>modify</div>
                </div>
            </div>
        </div>
    );
}

export function CommentBox(props, nestedModalArr) {
    return (
        <ul style={{ display: 'flex', width: '100%', flexDirection: 'column', listStyleType: 'none', overflowY: 'scroll', backgroundColor: '#629e1d', alignItems: 'center', borderRadius: '25px', scrollBehavior: 'smooth' }}>{
            props.map(itm => {
                const ref = React.createRef();
                return (<li key={itm.id} ref={ref} style={{ width: '80%' }} ><br />{CommentBubble(itm, nestedModalArr)}<br /></li>)
            })
        }</ul>
    );
}