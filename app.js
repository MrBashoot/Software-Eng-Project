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
    console.log('EVENT:---(post)=> login attempt');
    userController.login(req,res);
});

//---------------------------------------------------------------------------------

app.get('/api/users', (req,res) =>{
    console.log('EVENT:---(get)=> getAllUsers');
    userController.getUsers(req,res);
});

app.get('/api/users/:username', (req,res)=>{
    console.log('EVENT:---(get)=> userByUsername(' + req.params.username + ")");
    userController.getUser(req,res);
});

//---------------------------------------------------------------------------------

app.get('/api/items', (req,res) => {
    console.log('EVENT:---(get)=> all items');
    userController.getAllItems(req,res);
});

app.get('/api/items/:username', (req,res) =>{ //gets all items that are burrowed by a particular username
    console.log('EVENT:---(get)=> itemByUsername('+ req.params.username +')');
    userController.getUserItems(req,res);
});

app.put('/api/items/borrow', (req,res) =>{
   console.log('EVENT:---(put)=> Borrow Item');
    userController.borrowItem(req,res);
});

app.put('/api/items/return', (req,res) =>{
    console.log('EVENT:---(put)=> Return Item');
    userController.returnItem(req,res);
});

//---------------------------------------------------------------------------------

app.listen(port, function(){
    console.log('Library App is running my app on http://localhost:' + port);
   // open('http://192.168.100.9:' + port);
});

