/**
 * Created by Ahmed on 5/13/2016.
 */
    "use strict";
let ItemRepo = require('../repos/itemRepository.js');
let Item = require("./Item.js");
let LoanedItem = require("./loanedItem.js");
let Member = require("./member.js");
let Staff = require("./staff.js");
let Student = require("./student.js");
let StaffAdmin = require("./staffAdmin.js");
let Recipt = require ("./recipt.js");

let Items = new Array();
let Members = new Array();
let Recipt = new Array();

generateMembers(Members);
generateItems(Items);
showMembersList();
updateDB();

function generateMembers(Members){

    generateStudents(Members);
    generateStaff(Members);
    generateAdmin(Members);
    console.log(Members);
}

function generateStudents(Members){
    //generates a list of students then adds them to the members list
    let student1 = new Student("Babiker","Elnimah","66190072","b.elnimah@gmail.com","babz","password","1");
    let student2 = new Student("Mohammad","Yasser","77874791","cool.mada#yahoo.com","bashoot","password","2");

    Members.push(student1);
    Members.push(student2);
}

function generateStaff(Members){
    //generates staff list then adds it to the members list
    let staff1 = new Staff("Yousef","Attata","55967571","youssef.abdo#gmail.com","joe","password","1");
    let staff2 = new Staff("Ahmed","Ibrhaim","70744774","tntermiante@gmail.com","ahmed","password","2");

    Members.push(staff1);
    Members.push(staff2);
}

function generateAdmin(Members){
    //generates a admin then adds it the members list

    let admin = new StaffAdmin("Moutaz","Saleh","*******","m.saleh#gmail.com","admin","password",3);

    Members.push(admin);
}

function generateItems(Items){
    //generates a list of items
    let item1= new Item("1","Clock","2016","book");
    let item2= new Item("2","Watch","2016","book");
    let item3= new LoanedItem("3","BMW","2016","car");
    let item4= new LoanedItem("4","MERC","2016","car");
    let bItem = new LoanedItem(1,1,1,1,item1);
    Items.push(item1);
    Items.push(item2);
    Items.push(item3);
    Items.push(item4);
    Items.push(bItem);
    console.log(Items);

    generateBorrowedItems();
}

function generateBorrowedItems(){
    //changes half of the list of items to borrowed item objects then makes the necessary changes in the users
    generateReceipt();
}

function generateReceipt(){
    //checks for borrowed items inside the list of items the generates a receipt for each
}



function showMembersList(){
    //console.log(Members);
}

function updateDB(){
    //updates DB files with the members and items list.
}

