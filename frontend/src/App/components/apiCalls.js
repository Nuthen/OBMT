import { builtinModules } from 'module';
import axios from 'axios';


// PROTOtYPE FOR BACKEND CALL
export function doSomething() {
        axios.get(`/api/getList`)
          .then(res => {
            console.log(res.data)    
    })
}


let UserId = 0;

// LOGIN CALL
export function CallLogin(name, pw) {
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
export function CallRegisterLogin(name, pw, dob) {
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
export function CallRegisterBookmark(bid, t, u, p, desc, d, tag) {
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
export function CallDelete(bid) {
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
export function CalSearch(searchString) {
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