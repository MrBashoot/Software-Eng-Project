/**
 * Created by Ahmed on 5/13/2016.
 */
    "use strict"
let ItemRepo = require('../repos/itemRepository.js');
let Item = require("./Item.js");
let LoanedItem = require("./loanedItem.js");
let Member = require("./member.js");
let Staff = require("./staff.js");
let Student = require("./student.js");
let StaffAdmin = require("./staffAdmin.js");
let Recipt = require ("./recipt.js");

function generateMembers(){
    //generateStudents
    //generateStaff
    //generateAdmin
}

function generateStudents(){
    //generates a list of students then adds them to the members list
}

function generateStaff(){
    //generates staff list then adds it to the members list
}

function generateAdmin(){
    //generates a admin then adds it the members list
}

function generateItems(){
    //generates a list of items
    //generateBorrowedItems
}

function generateBorrowedItems(){
    //changes half of the list of items to borrowed item objects then makes the necessary changes in the users
    //generateReceipt
}

function generateReceipt(){
    //checks for borrowed items inside the list of items the generates a receipt for each
}