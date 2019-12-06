// import { builtinModules } from 'module';
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

// EDIT CALL
export function CallRegisterBookmark(bid, t, u, p, desc) {
    return new Promise(function (resolve, reject) {
    axios.post(`/api/editBookmark`, {
        // userId: UserId,
        BID: bid.nestedBID,
        Title: t.nestedTitle,
        URL: u.nestedURL,
        Priority: p,
        Description: desc.nestedDesc,
        // date: d,
        // tags: tag
    })
        .then(res => {
            if (res.data.success == 1) {
                //displaySuccess
                console.log('it worked');
                return resolve(true);
            }
            else {
                console.log('fail  :( edit bm)')
                //displayError
                return reject(false);
            }
        })
    });
}

//DELETE CALL
export function CallDelete(uid, bid) {
    return new Promise(function (resolve, reject) {
    axios.post(`/api/deleteBookmark`, {
        userId: uid,
        BID: bid
    })
        .then(res => {
            if (res.data.success == 1) {
                //displaySuccess
                console.log('it worked')
                return resolve(true);
            }
            else {
                //displayError
                console.log('it did not work')
                return reject(false);
            }
        })
    });
}

//SEARCH CALL
export function CallSearch(searchString) {

    return new Promise(function (resolve, reject) {
    axios.post(`/api/searchBookmarks`, {
        UID: UserId,
        SearchString: searchString
    })
        .then(res => {
            if (res.data.success == 1) {
                //handle returned here
                //console.log(res.data.bookmarks)
                //return resolve(res.data.bookmarks);
                
                var obj = res.data.bookmarks;
                var tbl = CommentBox(obj);
                return resolve(tbl);
                
            }
            else {
                //displayError
                return reject(false);
            }
        })
    });
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

export function getBookmarks(nestedModalArr) {
    return new Promise(function (resolve, reject) {
        axios.post(`/api/getBookmarks`, {
            UID: UserId
        })
            .then(res => {
                //response is the JSON object returned
                if (res.data.success == 1) {
                    //obj is just the bookmark data
                    var obj = res.data.bookmarks;
                    //commentBox returns a div we want to render
                    var tbl = CommentBox(obj,nestedModalArr);
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
