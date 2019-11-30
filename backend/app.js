const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

//const port = 3306;

//module.exports = {
//getHomePage: (req, res) => {
//app.post('/api/getHomePage', (req,res) => {
    function getHomePage() {
        let query = "SELECT * FROM `bookmark` ORDER BY BID ASC"; 

        console.log('Bookmark results');
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            console.log(result);
        });
    }
//};
//app.post('/api/login', (req,res) => {
function loginValidation(){
    //TEST DATA
    var userName = 'Jo';
    var password = '1234';
    
    //Return to front end. Contains login status and message
    var loginReport;
    
    var userQuery = "SELECT * FROM `user` WHERE Username = '" + userName + "'";
    
    db.query(userQuery, (error, userResults) => {
        //Report query error
        if (error) {
            //res.redirect('/');
            loginReport = [{
                status:false,
                message:"There are some error with query"
            //status = false;
            //console.log('There are some error with query');
            }];
        }
    
        //Check user input password against database information
        else if(userResults.length >0){
            if(password==userResults[0].Password){
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
        
        //Report nonexisting user
        else{
            //res.redirect('/');
            loginReport = [{
                status:false,
                message:"Username does not exits"
            }];
        }
        
        //Return results to front-end
        console.log(loginReport);
    });
    
    //Return results to front-end
    //ADD
    //res.json(loginReport);
}
    
//app.post('/api/register', (req,res) => {
function registrationValidation(){
    //TEST DATA- NEED FROM FRONT-END Username, Password, FName, LName, and maybe Admin?
    var Username = "sam"; 
    var Password = "secret";
    var FName = "sammy";
    var LName = "jammy";
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;
    
    var Admin = false;
    
    //To be returned to front end. Contains regisration status and message
    var registerReport;
    var UIDReport;
    var UIDDeterminer = 0;
    var userCount = 0;
    
    var UIDQuery = "SELECT * FROM `user` ORDER BY UID ASC";
    var userQuery = "SELECT * FROM `user` WHERE Username = '" + Username + "'";
    
    db.query(UIDQuery, (errorA, UIDResults) => {
        //Report query error
        if (errorA) {
            //res.redirect('/');
            UIDReport = [{
                status:false,
                message:"There are some error with query for UID"
            //status = false;
            //console.log('There are some error with query');
            }];
        }
    
        //Report ids found
        else if(UIDResults.length >0){
            console.log('Current Users');
            console.log(UIDResults);
            UIDReport = [{
                status:true,
                message:"Ids found."
            }];
            
            UIDDeterminer = 1;
            userCount = UIDResults.length;
            UID = (UIDResults[userCount - 1].UID) + 1;
        }
        
        //Create id for empty table
        else{
            UIDReport = [{
                status:true,
                message:"No current Ids found."
            }];
            
            UIDDeterminer = 1;
            UID = 1;
        }
        
        console.log(UIDReport);
        console.log('New UID');
        console.log(UID);    
        
        if (UIDDeterminer == 1){
            db.query(userQuery, (errorB, userResults) => {
                //Report query error
                if (errorB) {
                    //res.redirect('/');
                    registerReport = [{
                        status:false,
                        message:"There are some error with query"
                    //status = false;
                    //console.log('There are some error with query');
                    }];
                }
            
                //Report username already exists
                else if(userResults.length >0){
                    //console.log(userResults);
                    //if(password==userResults[0].Password){
                        //res.redirect('/');
                    registerReport = [{
                        status:false,
                        message:"User name is already taken. Please enter another username."
                    }];
                }
                    
                //Insert new user
                else{
                     //res.redirect('/');
                    var insertUser = "INSERT INTO user(UID, Username, Password, FName, LName, RegDate, Admin) VALUES (" + UID + ", '" + Username + "', '" + Password + "', '" + FName + "', '" + LName + "', '" + newdate + "', " + Admin + ")";
                    
                    console.log(insertUser);
        
                    db.query(insertUser, (err2, inserted) => {
                        //Report query error
                        if (err2) {
                            //throw err;
                            registerReport = [{
                                status:false,
                                message:"Error registering."
                            }];
                        }
                     
                        //Report user registration success
                        else{
                            registerReport = [{
                                status:true,
                                message:"Thank you! You are successfully registered."
                            }];
                        }
                        
                        console.log(registerReport);
                    });
                }
            });
        }
    });
    
    //Return results to front-end
    //ADD
    //res.json(registerReport);
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
    
    getHomePage();
    loginValidation();
    registrationValidation();
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


//TEST CONNECTION TO FRONT-END
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    
    console.log(req.username);
    if(req.username == "blue")
        {
            list = ["apple", "climb", "jump"];
        }
    
    res.json(list);
    console.log('Sent');
});
/*
// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    
    
    var list = [{Title: "Book Test",URL:"test.com" , Prioriyty:"5" , Description:"Test bookmark" , Date: "11-26"}];
    res.json(list);
    console.log('Sent list of items');
});
*/
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port2 = process.env.PORT || 5000;
app.listen(port2);

console.log('App is listening on port ' + port2);
