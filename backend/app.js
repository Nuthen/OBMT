const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

//const port = 3306;

//module.exports = {
     //getHomePage: (req, res) => {
     function getHomePage() {
        let query = "SELECT * FROM `bookmark` ORDER BY BID ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            console.log(result);
        });
    }
//};

function loginValidation(){
    var userName = 'Jo';
    var password = '1234';
    
    var loginReport;
    
    var userQuery = "SELECT * FROM `user` WHERE Username = '" + userName + "'";
    
    db.query(userQuery, (error, results) => {
        if (error) {
            //res.redirect('/');
            loginReport = [{
            status:false,
                  message:"There are some error with query"
            //status = false;
            //console.log('There are some error with query');
            }];
        }
    
        else if(results.length >0){
            //console.log(results);
            if(password==results[0].Password){
                //res.redirect('/');
                loginReport = [{
                    status:true,
                    message:"Successfully authenticated"
                }];
            }
                
            else{
                //res.redirect('/');
                loginReport = [{
                    status:false,
                      message:"Username and password does not match"
                
                }]; 
            }
        }
        
        else{
            //res.redirect('/');
            loginReport = [{
                status:false,
                message:"Username does not exits"
            }];
        }
        
        console.log(loginReport);
    });
}
    
function registrationValidation(){
    var UID = 111;
    var Username = "nicetry"; 
    var Password = "test";
    var FName = "joke";
    var LName = "ster";
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    var newdate = year + "/" + month + "/" + day;
    
    //var RegDate = new Date();
    var Admin = true;
    
    var registerReport;
    
    var userQuery = "SELECT * FROM `user` WHERE Username = '" + Username + "'";
    
    db.query(userQuery, (error, results) => {
        if (error) {
            //res.redirect('/');
            registerReport = [{
                status:false,
                message:"There are some error with query"
            //status = false;
            //console.log('There are some error with query');
            }];
        }
    
        else if(results.length >0){
            console.log(results);
            //if(password==results[0].Password){
                //res.redirect('/');
            registerReport = [{
                status:false,
                message:"User name is already taken. Please enter another username."
            }];
        //} 
        }
            
        else{
             //res.redirect('/');
            
            //var myobj = { UID: 111, Username: "nicetry", Password: "test", FName: "joke", LName: "ster", RegDate: 2019-11-04, Admin: 3};
            
            //var myobj2 = [ '111', 'nicetry', 'test', 'joke', 'ster', '2019-11-04', '3'];
             
            var insertUser = "INSERT INTO user(UID, Username, Password, FName, LName, RegDate, Admin) VALUES (" + UID + ", '" + Username + "', '" + Password + "', '" + FName + "', '" + LName + "', " + newdate + ", " + Admin + ")";
            
            //var insertUser = "INSERT INTO `user` SET "; 
            
            console.log(insertUser);
            //db.collection("user").insertOne(myobj, (err, res) {    
            //db.query(insertUser, (err2, inserted) => {
            db.query(insertUser, (err2, inserted) => {
                if (err2) {
                    //throw err;
                    registerReport = [{
                        status:false,
                        message:"Error registering."
                    }];
                }
             
                else{
                    registerReport = [{
                        status:true,
                        message:"Thank you! You are successfully registered."
                    }];
                }
    
                
            });
        }
        console.log(registerReport);
     });
}


function addBookmark(){
    var UID = 111;
    //var BID = ???
    // new BID determined by max BID + 1 
    
    var Title = "mytitle2"; 
    var URL = "umdearborn.edu";
    var Priority = 1;
    var Description = "My cool website2.";
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    var newdate = year + "/" + month + "/" + day;
    
    var bookmarkQuery = "SELECT * FROM `bookmark` WHERE URL = '" + URL + "'";
    var maxQuery = "SELECT MAX(BID) as BID FROM `bookmark`";
    
    var bookmarkReport;
    
    // Query to find new BID
    db.query(maxQuery, (error, result, fields) => {
        if (error) {
            //res.redirect('/');
            bookmarkReport = [{
                status:false,
                message:"There are some error with query"
            }];
            console.log(bookmarkReport);
        }  
        else{
            console.log("BID: " + JSON.stringify(result[0].BID));
            
            var newBID = 0;
            
            if (result[0].BID != null) {            
                newBID = result[0].BID + 1;
            }
            
            // Query to find if BID already created
            db.query(bookmarkQuery, (error, results) => {
                if (error) {
                    //res.redirect('/');
                    bookmarkReport = [{
                        status:false,
                        message:"There are some error with query"
                    }];
                }

                else if(results.length >0){
                    console.log(results);
                    bookmarkReport = [{
                        status:false,
                        message:"Bookmark is already created."
                    }];
                }

                else{
                    var insertBookmark = "INSERT INTO bookmark(BID, UID, Title, URL, Priority, Description, Date) VALUES (" + newBID + ", " + UID + ", '" + Title + "', '" + URL + "', '" + Priority + "', '" + Description + "', " + newdate + ")";

                    console.log(insertBookmark);
                    db.query(insertBookmark, (err2, inserted) => {
                        if (err2) {
                            //throw err;
                            bookmarkReport = [{
                                status:false,
                                message:"Error creating bookmark."
                            }];
                        }

                        else{
                            bookmarkReport = [{
                                status:true,
                                message:"Bookmark added."
                            }];
                        }


                    });
                }
                console.log(bookmarkReport);
            });
        }
    });
    
    
}

function addTagsToBookmark(){
    var BID = 112;
    // new BID determined by max BID + 1 
    
    var TagName = 'Ceesharp';
    //var bookmarkQuery = "SELECT * FROM `bookmark` WHERE URL = '" + URL + "'";
    var maxQuery = "SELECT MAX(TID) as TID FROM `bkhastag`";
    
    var tagReport;
    
    // Query to find new TID in bkhastag
    db.query(maxQuery, (error, result, fields) => {
        if (error) {
            //res.redirect('/');
            tagReport = [{
                status:false,
                message:"There are some error with query"
            }];
            console.log(tagReport);
        }  
        else{
            
            var newTID = 0;
            if (result[0].TID != null) {
                newTID = result[0].TID + 1;
            }
            
            console.log("TID: " + newTID);
            
            // Insert new TID
            var insertTag = "INSERT INTO bkhastag(BID, TID) VALUES (" + BID + ", " + newTID + ")";

            console.log(insertTag);
            db.query(insertTag, (err2, inserted) => {
                if (err2) {
                    //throw err;
                    tagReport = [{
                        status:false,
                        message:"Error creating Tag."
                    }];
                }

                else{
                    // Also add Tag Name to tag table
                    var insertTagName = "INSERT INTO tag(TID, TagName) VALUES (" + newTID + ", '" + TagName + "')";

                    console.log(insertTagName);
                    db.query(insertTagName, (err2, inserted) => {
                        if (err2) {
                            //throw err;
                            console.log(err2);
                            tagReport = [{
                                status:false,
                                message:"Error creating Tag Name."
                            }];
                        }

                        else{
                            console.log("hello1");
                            tagReport = [{
                                status:true,
                                message:"Tag Name added."
                            }];
                        }
                    });
                    console.log(tagReport);
                    
                    
                    tagReport = [{
                        status:true,
                        message:"Tag added."
                    }];
                }
            });
            console.log(tagReport);
        }
    });
    
    
}



// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookmarkmanager'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
    
    //getHomePage();
    //loginValidation();
    //registrationValidation();
    //addBookmark();
    addTagsToBookmark();
});

global.db = db;

// configure middleware
//app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
/*
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/

// set the app to listen on the port
//app.listen(port, () => {
  //  console.log(`Server running on port: ${port}`);
//});




// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
/*app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});
*/

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    
    
    var list = [{Title: "Book Test",URL:"test.com" , Prioriyty:"5" , Description:"Test bookmark" , Date: "11-26"}];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port2 = process.env.PORT || 5000;
app.listen(port2);

console.log('App is listening on port ' + port2);
