import React from 'react';

export class Comment {
    constructor(title, url, description) {
        this.title = title;
        this.url = url;
        this.description = description;
    }
}

function User(props) {
    return (
        <div>{props.title}</div>
    );
}

function TextBody(props) {
    return (
        <div>
            <p>{props.url}</p>
            <p>{props.description}</p>
        </div>
    );
}

function CommentBubble(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', border: 'solid', borderColor: 'blue', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', border: 'solid', backgroundColor: 'grey' }}>{User(props)}</div>
            <div style={{ display: 'flex', border: 'dashed' }}>{TextBody(props)}</div>
        </div>
    );
}

export function CommentBox(props) {
    return (
        <ul style={{ display: 'flex', width: '95%', flexDirection: 'column', listStyleType: 'none', overflowY: 'scroll' }}>{
            props.map(bookmark => {
                const ref = React.createRef()
                return (<li key={bookmark.id} ref={ref}>{CommentBubble(bookmark)}<br /></li>)})
        }</ul>
    );
}