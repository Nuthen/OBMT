import { builtinModules } from 'module';
import axios from 'axios';


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
    axios.post(`/api/login`, {
        username: name,
        password: pw
    })
        .then(res => {
            if (res.data[0] == true) {
                UserId = res.data[1];
                return true;
            }
            else {
                //displayError
                return false;
            }
        })
}


// REGISTER CALL
// RESPONSE EXPECTED: res[0] = 1/0 or true/false && res[1] = UserId
export function CallRegisterLogin(name, pw, dob) {
    axios.post(`/api/register`, {
        username: name,
        password: pw,
        birthdate: dob
    })
        .then(res => {
            if (res.data[0] == true) {
                UserId = res.data[1];
                return true;
            }
            else {
                //displayError
                return false;
            }
        })
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
export function CallDelete(bid) {
    axios.post(`/api/delete`, {
        userId: UserId,
        bid: builtinModules
    })
        .then(res => {
            if (res.data[0] == true) {
                //displaySuccess
                return true;
            }
            else {
                //displayError
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

export function addBookmark(uid,title,url,description,tags) {
    axios.post(`/api/addBookmark`, {
        UID: uid,
        Title: title,
        URL: url,
        Description: description,
        Tags: tags
    })
        .then(res => {
            if (res.data.success == 1) {
                console.log('it worked');
            }
            else {
                console.log('it didn\'t work');
            }
        })
}


export function getBookmarks() {
    axios.post(`/api/getBookmarks`, {
        UID:0
    })
        .then(res => {
            if (res.data.success == 1) {
                console.log('it worked');
            }
            else {
                console.log('it didn\'t work');
            }
        })
}