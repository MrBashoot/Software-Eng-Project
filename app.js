"use strict";

let express = require('express');
let userController = require("./controllers/userController.js");
let bodyParser = require('body-parser');
let app = express();
let port = 9090;
//Allow serving static files
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//---------------------------------------------------------------------------------

app.get('/',(req,res)=>{
    res.send("Welcome!!!");
});

//---------------------------------------------------------------------------------

app.post('/api/users/login', (req, res) => {
    console.log('Event:(post)=> login attempt');
    userController.login(req,res);
});

//---------------------------------------------------------------------------------

app.get('/api/users', (req,res) =>{
    console.log('Event:(get)=> getAllUsers');
    userController.getUsers(req,res);
});

app.get('/api/users/:username', (req,res)=>{
    console.log('Event:(get)=> userByUsername(' + req.params.username + ")");
    userController.getUser(req,res);
});

//---------------------------------------------------------------------------------

app.get('/api/items', (req,res) => {
    console.log('Event:(get)=> all items');
    userController.getAllItems(req,res);
});

app.get('/api/items/:username', (req,res) =>{ //gets all items that are burrowed by a particular username
    console.log('Event:(get)=> itemByUsername('+ req.params.username +')');
    userController.getUserItems(req,res);
});

//---------------------------------------------------------------------------------

app.listen(port, function(){
    console.log('Library App is running my app on http://localhost:' + port);
    //open('http://localhost:' + port);
});

