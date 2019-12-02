import React from 'react';

export class Bookmark {
    constructor(title, url, description) {
        this.title = title;
        this.url = url;
        this.description = description;
    }
}

function User(props) {
    return (
        <div style={{ display: 'flex',justifyContent:'space-evenly'}}>{props.title}</div>
    );
}

function TextBody(props) {
    return (
        <div style={{ display: 'flex',flexDirection:'column', width:'90%',border: 'dashed',borderRadius:'25px' }}>
            <p>{props.url}</p>
            <p>{props.description}</p>
        </div>
    );
}

function CommentBubble(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width:'fit', border: 'solid', borderColor: 'blue',backgroundColor:'#ffe6d5', justifyContent: 'space-between',borderRadius:'25px' }}>
            {User(props)}
            {TextBody(props)}
        </div>
    );
}

export function CommentBox(props) {
    return (
        <ul style={{ display: 'flex', width: '100%', flexDirection: 'column', listStyleType: 'none', overflowY: 'scroll',backgroundColor:'#629e1d',alignItems:'center',borderRadius:'25px',scrollBehavior:'smooth'}}>{
            props.map(bookmark => {
                const ref = React.createRef()
                return (<li key={bookmark.id} ref={ref} style={{width:'80%'}} ><br/>{CommentBubble(bookmark)}<br /></li>)})
        }</ul>
    );
}