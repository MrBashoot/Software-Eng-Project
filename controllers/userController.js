/**
 * Created by Ahmed on 5/12/2016.
 */
'use strict'
class userController {

    constructor() {
        this.userRepository = require('../repos/userRepository');
        this.itemRepository = require('../repos/itemRepository');
    }


    getUsers(req, res) {
        console.log("getAllUsers: Attempt");
        this.userRepository.getAllUsers().then(users => {
            console.log("getAllUsers: Success");
            res.json(users);
        }).catch(err=> res.status(404).send(err));
    }

    getUser(req,res){
        console.log('getUser:(' + req.params.username + ')Attempt');
        let username = req.params.username;
        this.userRepository.getUserByUsername(username).then(user =>{
            console.log('getUser: Success')
            res.json(user);
        }).catch(err => res.status(404).send(err));
    }

    getUserItems(req,res){
        console.log('getUserItems: Attempt')
        let username = req.params.username;
        let items = new Array();
        this.userRepository.getUserByUsername(username).then(user =>{
        if(user.borrowed.length > 0){
            for (var i =0; i<user.borrowed.length; i++){
                this.itemRepository.getItem(user.borrowed[i].itemId).then(item => {
                    items.push(item);
                    if(items.length == user.borrowed.length ){ // this if statement was placed to prevent the response from being sent before the loop exits
                        console.log('getUserItems: Success');
                        res.json(items);
                    }


                });
            }


        }
        else{
            res.status(404).send('User has no Items');
        }

        }).catch(err => res.status(500).send(err));
    }

    getAllItems(req,res){
        console.log('getAllItems: Attempt');
      this.itemRepository.getAllItems().then(items => {
          console.log('getAllItems: Success');
          res.json(items);
      }).catch(err => res.status(404).send(err));
    }

    getItemById(req,res){
        this.itemRepository.getItemsById(req.params.itemId).then(item => {
            res.json(item);
        }).catch(err =>res.status(404).send(err));
    }

    login(req,res){
        console.log("Login: Attempt")
        let username = req.body.username;
        let userInformation = req.body;
        console.log(userInformation);
        this.userRepository.getUserByUsername(username).then(user=> {
            if (user.password == req.body.password) {
                userInformation.isIn = true;
                    if(user.hasOwnProperty('isCoordinator')){
                        userInformation.goTo = '/adminHome.html';
                    }
                    else{
                        console.log('Login: Success(Member)');
                        userInformation.goTo = '/memberHome.html';
                    }
            }
            else{
                console.log("Login: Invalid password");
                userInformation = {
                    isIn : false,
                    allert : 'Invalid password'
                };
            }
            res.json(userInformation);
        }).catch(err => {
            console.log("Login: Invalid username")
            userInformation.isIn = false;
            userInformation.allert = 'Invalid username';
            res.json(userInformation);
        });
    }

}

module.exports= new userController()