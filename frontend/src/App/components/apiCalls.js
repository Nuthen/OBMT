import { builtinModules } from 'module';
import axios from 'axios';
import { CommentBox, Bookmark } from '../components/scrollingBox';
import React, { useCallback } from 'react'

// PROTOTYPE FOR BACKEND CALL
export function doSomething() {
    axios.get(`/api/getList`)
        .then(res => {
            console.log(res.data)
        })
}// END PROTOTYPE

let UserId = 0;

// LOGIN CALL
// RESPONSE EXPECTED: res[0] = 1/0 or true/false && res[1] = UserId
export function CallLogin(name, pw) {
    return new Promise(function (resolve, reject) {
        axios.post(`/api/login`, {
            username: name,
            password: pw
        })
            .then(res => {
                if (res.data[0].success == 1) {
                    UserId = res.data[1];
                    return resolve(res.data[0].message);
                }
                else {
                    //displayError
                    return reject(false);
                }
            })
    });
}


// REGISTER CALL
// RESPONSE EXPECTED: res[0] = 1/0 or true/false && res[1] = UserId
export function CallRegisterLogin(name, pw, fName, lName) {
    return new Promise(function (resolve, reject) {
        axios.post(`/api/CallRegisterLogin`, {
            username: name,
            password: pw,
            firstname: fName,
            lastname: lName
        })
            .then(res => {
                if (res.data[0].success == 1) {
                    console.log('it worked');
                    UserId = res.data[0].message;
                    return resolve(UserId);
                }
                else {
                    //displayError
                    console.log('it failed');
                    return reject(false);
                }
            })
    });
}

// ADD/EDIT CALL
export function CallRegisterBookmark(bid, t, u, p, desc, d, tag) {
    console.log('good')
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
            if (res.data[0] == true) {
                //displaySuccess
                return true;
            }
            else {
                console.log('fail')
                //displayError
                return false;
            }
        })
}

//DELETE CALL
export function CallDelete(uid, bid) {
    console.log('inside calldelete:')
    console.log('UID: ', uid);
    console.log('BID: ', bid);
    axios.post(`/api/deleteBookmark`, {
        userId: uid,
        BID: bid
    })
        .then(res => {
            if (res.data.success == 1) {
                //displaySuccess
                console.log('it worked')
                return true;
            }
            else {
                //displayError
                console.log('it did not work')
                return false;
            }
        })
}

//SEARCH CALL
export function CallSearch(searchString) {
    axios.post(`/api/search`, {
        userId: UserId,
        search: searchString
    })
        .then(res => {
            if (res.data[0] == true) {
                //handle returned shit here
                return res.data; // returning data array (?) -- Might cause Issues still because 1st field is checked for true / false
            }
            else {
                //displayError
                return false;
            }
        })
}

export function addBookmark(uid, title, url, description, tags) {
    return new Promise(function (resolve, reject) {
        axios.post(`/api/addBookmark`, {
            UID: uid,
            Title: title,
            URL: url,
            Description: description,
            Tags: tags
        })
            .then(res => {
                if (res.data.success == 1) {
                    return resolve(true);
                }
                else {
                    console.log('it didn\'t work(addbookmark)');
                    return resolve(false);
                }
            })
    });
}

export function getBookmarks() {
    return new Promise(function (resolve, reject) {
        axios.post(`/api/getBookmarks`, {
            UID: 0
        })
            .then(res => {
                //response is the JSON object returned
                if (res.data.success == 1) {
                    //obj is just the bookmark data
                    var obj = res.data.bookmarks;
                    //commentBox returns a div we want to render
                    var tbl = CommentBox(obj);
                    //resolve ''updates'' promise in maincontent.js
                    //updates is probably the wrong word.  it gives
                    //promise a value.
                    return resolve(tbl);
                }
                else {
                    reject('Error loading table');
                }
            })
    });
}
{/* The function: CommentBox(arg) takes a list of objects in the form described in the comment above this export function */ }
{/* For now it will only display 3 attributes but this will be modfied later in components/scrollingbox.js */ }
