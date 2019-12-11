// import { builtinModules } from 'module';
import axios from 'axios';
import { CommentBox } from '../components/scrollingBox';

const instance = axios.create({
  baseURL: '',
  timeout: 10000,
  //headers: {'Content-Type': "application/x-www-form-urlencoded",'crossorigin': "true"}
    /*headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTION' // Try this
    }*/
    
});

// PROTOTYPE FOR BACKEND CALL
export function doSomething() {
    axios.get(`http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/getList`)
        .then(res => {
            console.log(res.data)
        })
}// END PROTOTYPE

axios.defaults.withCredentials = true;

var UserId = 0;

// LOGIN CALL
// RESPONSE EXPECTED: res[0] = 1/0 or true/false && res[1] = UserId
export function CallLogin(name, pw) {
    return new Promise(function (resolve, reject) {
        instance.post('http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/login', {
            playername: name,
            password: pw
        })
            .then(res => {
                console.log(res.data)
                    if (res.data[0].success === '1') {
                        console.log('in area 1')
                        UserId = res.data[1];
                        return resolve(res.data[0].message);
                    }
                    else {
                        console.log(res.data[0].message);
                        return reject(res.data[0].message);
                    }
            })
    });
}


// REGISTER CALL
// RESPONSE EXPECTED: res[0] = 1/0 or true/false && res[1] = UserId
export function CallRegisterLogin(name, pw, fName, lName) {
    return new Promise(function (resolve, reject) {
        instance.post('http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/CallRegisterLogin', {
            username: name,
            password: pw,
            firstname: fName,
            lastname: lName,
            
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
        instance.post('http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/editBookmark', {
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
        instance.post('http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/deleteBookmark', {
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
        instance.post('http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/searchBookmarks', {
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
        instance.post('http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/addBookmark', {
            withCredentials: "true",
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
        instance.post('http://ec2-34-209-54-130.us-west-2.compute.amazonaws.com:5000/api/getBookmarks', {
        axios.post(`/api/getBookmarks`, {
            UID: UserId
        })
            .then(res => {
                //response is the JSON object returned
                if (res.data.success == 1) {
                    //obj is just the bookmark data
                    var obj = res.data.bookmarks;
                    //commentBox returns a div we want to render
                    var tbl = CommentBox(obj, nestedModalArr);
                    //resolve ''updates'' promise in maincontent.js
                    //updates is probably the wrong word.  it gives
                    //promise a value.
                    return resolve(tbl);
                }
                else {
                    reject(res.data.message);
                }
            })
    });
}
{/* The function: CommentBox(arg) takes a list of objects in the form described in the comment above this export function */ }
{/* For now it will only display 3 attributes but this will be modfied later in components/scrollingbox.js */ }
