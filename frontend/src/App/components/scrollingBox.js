import React, {useState, useContext} from 'react';
import {CallDelete, CallRegisterBookmark} from './apiCalls'
// import { ModalProvider, Modal } from '../components/loginModal';


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
        <div style={{ display: 'flex',justifyContent:'space-evenly'}}>
        {props.Title}
        </div>
    );
}

function TextBody(props) {
    return (
        <div style={{ display: 'flex',flexDirection:'column', width:'90%',border: 'dashed',borderRadius:'25px' }}>
            <p>{props.URL}</p>
            <p>{props.Description}</p>
        </div>
    );
}



function CommentBubble(props) {
    function deleteBM(){
        CallDelete(props.UID,props.BID);
    }

    function modifyBM(){
        console.log(props);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width:'fit', border: 'solid', borderColor: 'blue',backgroundColor:'#ffe6d5', justifyContent: 'space-between',borderRadius:'25px' }}>
            {User(props)}
            {TextBody(props)}
            <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={() => deleteBM()}>delete(no auto refresh yet)</button>
                <div><button onClick={() => modifyBM()}>modify(not functional)</button></div>
            </div>
        </div>
    );
}

export function CommentBox(props) {

    return (
        <ul style={{ display: 'flex', width: '100%', flexDirection: 'column', listStyleType: 'none', overflowY: 'scroll',backgroundColor:'#629e1d',alignItems:'center',borderRadius:'25px',scrollBehavior:'smooth'}}>{
            props.map(itm => {
                const ref = React.createRef();
                return (<li key={itm.id} ref={ref} style={{width:'80%'}} ><br/>{CommentBubble(itm)}<br /></li>)})
        }</ul>
    );
}