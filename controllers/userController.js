/**
 * Created by Ahmed on 5/12/2016.
 */
'use strict';
class userController {

    constructor() {
        this.userRepository = require('../repos/userRepository');
        this.itemRepository = require('../repos/itemRepository');
        this.LoanedItem = require ('../entities/loanedItem');
        this.Student = require ('../entities/student');
        this.Staff = require ('../entities/staff');
        this.Item = require ('../entities/item');
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
            console.log('getUser: Success');
            delete user.password;
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
                this.itemRepository.getItem(user.borrowed[i]).then(item => {
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
            delete userInformation.password;
            res.json(userInformation);
        }).catch(err => {
            console.log("Login: Invalid username")
            userInformation.isIn = false;
            userInformation.allert = 'Invalid username';
            res.json(userInformation);
        });
    }

    //borrowItem (req,res) {
    //    console.log("Borrow Attempt");
    //    let BItem = req.body;
    //    let itemsList = new Array();
    //
    //    this.userRepository.getUserById(BItem.userId).then(User => {
    //        this.user = User;
    //
    //        for (var i = 0; i < BItem.items.length; i++) {
    //            console.log("inside loop");
    //            this.itemRepository.getItem(BItem.items[i]).then(item => {
    //                console.log("inside promise item");
    //                let loanedItem = new this.LoanedItem(1,1,1,1,item);
    //                console.log("item created: " + JSON.stringify(loanedItem));
    //                loanedItem.loanItem();
    //                console.log("item modified: " + JSON.stringify(loanedItem));
    //                //console.log(loanedItem);
    //                itemsList.push(loanedItem);
    //            }).then(() => {
    //                //console.log('inside then');
    //                if(this.user.hasOwnProperty('memberId')){
    //                    this.user = new this.Student(1,1,1,1,1,1,1,1,User);
    //                    this.user.borrowItem(itemsList[itemsList.length-1].itemId);
    //                }
    //                else{
    //                    this.user = new this.Staff(1,1,1,1,1,1,1,1,User);
    //                    this.user.borrowItem(itemsList[itemsList.length-1].itemId);
    //                }
    //
    //                //console.log(this.user);
    //            }).then(() => {
    //                console.log("Before If");
    //                if (i == BItem.items.length) {
    //                    console.log("User: " +JSON.stringify(this.user) + "\nItemList: " + JSON.stringify(itemsList));
    //                    this.itemRepository.modifyItems(itemsList);
    //                    this.userRepository.modifyUser(this.user);
    //                    res.status(200).send("All Good");
    //                }
    //
    //            });
    //
    //
    //
    //        }
    //
    //    });
    //}

    borrowItem (req,res) {
        console.log("Borrow Attempt");
        let BItem = req.body;
        let itemsList = new Array();

        this.userRepository.getUserById(BItem.userId).then(User => {
            this.user = User;

            for (var i = 0; i < BItem.items.length; i++) {
                this.itemRepository.getItem(BItem.items[i]).then(item => {
                    let loanedItem = new this.LoanedItem(1,1,1,1,item);
                     console.log(loanedItem);
                    itemsList.push(loanedItem);
                }).then(() => {
                    //console.log('inside then');
                    if(this.user.hasOwnProperty('memberId')){
                        console.log("Heelo");
                        this.user = new this.Student(1,1,1,1,1,1,1,1,User);
                        console.log(this.user);
                        this.user.borrowItem(itemsList[itemsList.length-1].itemId);
                        console.log(this.user);
                    }
                    else{
                        this.user = new this.Staff(1,1,1,1,1,1,1,1,User);
                        this.user.borrowItem(itemsList[itemsList.length-1].itemId);
                    }

                    //console.log(this.user);
                }).then(() => {
                    console.log("Before If");
                  //  if (i == BItem.items.length) {
                        console.log("User: " +JSON.stringify(this.user) + "\nItemList: " + JSON.stringify(itemsList));
                        this.itemRepository.modifyItems(itemsList);
                        this.userRepository.modifyUser(this.user);
                        res.status(200).send("All Good");
                 //   }

                });



            }

        });
    }


    returnItem (req,res) {
        console.log("Return Attempt");
        let RItem = req.body;
        let itemsList = new Array();

        this.userRepository.getUserById(RItem.userId).then(User => {
            this.user = User;

            for (var i = 0; i < RItem.items.length; i++) {
                this.itemRepository.getItem(RItem.items[i]).then(item => {
                    let loanedItem = new this.Item(1,1,1,1,item);
                  //  console.log(loanedItem);
                    loanedItem.returnItem();
                    console.log(loanedItem);
                    itemsList.push(loanedItem);
                }).then(() => {
                    if(this.user.hasOwnProperty('memberId')){
                        this.user = new this.Student(1,1,1,1,1,1,1,1,User);
                        this.user.returnItem(itemsList[itemsList.length-1].itemId);
                        console.log(this.user);
                    }
                    else{
                        this.user = new this.Staff(1,1,1,1,1,1,1,1,User);
                        this.user.returnItem(itemsList[itemsList.length-1].itemId);
                    }
                }).then(() => {
                    if (i == RItem.items.length) {
                        console.log(itemsList);
                        console.log(this.user);

                        this.itemRepository.modifyItems(itemsList);
                        this.userRepository.modifyUser(this.user);
                        res.status(200).send("All Good");
                    }

                });
            }
        });
    }
}

module.exports= new userController()