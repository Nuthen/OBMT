import React from 'react';
import { CallDelete } from './apiCalls'

const modal_style = {
    ".bookmark-modal": {
        width: 400,
        textAlign: "center",
    },
    ".add-bm": { color: "#0982AF", fontFamily: '"Arial", sans-serif', fontSize: "2vh", fontWeight: 'bold', cursor: "pointer", },
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
        <div style={{ display: 'flex', justifyContent: 'flex-start', }}>
            <div style={{width:'5%'}}></div>
            <div style={{ display: 'flex', justifyContent: 'start', color: '#2699FB',  }}>
                <h3>{props.Title}</h3>
            </div>
        </div>
    );
}

function TextBody(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '90%', color: "#2699FB" }}>
            <p><a href={props.URL} style={{textDecoration: "none",color: "#2699FB"}}>{props.URL}</a></p>
            <p>{props.Description}</p>
        </div>
    );
}

function CommentBubble(props, nestedModalArr) {
    function deleteBM() {
        CallDelete(props.UID, props.BID).then(afterDelResp);
        return;
    }

    function afterDelResp(resp) {
        nestedModalArr[6](true);
        return;
    }

    function setParentStates() {
        nestedModalArr[1](true);
        nestedModalArr[2](props.BID);
        nestedModalArr[3](props.Title);
        nestedModalArr[4](props.URL);
        nestedModalArr[5](props.Description);

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 'fit', backgroundColor: '#FFFFFF', justifyContent: 'center' }}>
            <div>{User(props)}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>{TextBody(props)}</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', }}>
                <div style={modal_style[".add-bm"]} onClick={() => deleteBM()}>delete</div>
                <div className="modify" onClick={() => setParentStates()} style={modal_style[".add-bm"]}>modify</div>
            </div>
        </div>
    );
}

export function CommentBox(props, nestedModalArr) {
    return (
        <ul style={{ display: 'flex', width: '100%', flexDirection: 'column', listStyleType: 'none', overflowY: 'scroll', backgroundColor: '#F1F9FF', alignItems: 'center', borderRadius: '25px', scrollBehavior: 'smooth' }}>{
            props.map(itm => {
                const ref = React.createRef();
                return (<li key={itm.id} ref={ref} style={{ width: '80%' }} ><br />{CommentBubble(itm, nestedModalArr)}<br /></li>)//#F1F9FF#629e1d
            })
        }</ul>
    );
}