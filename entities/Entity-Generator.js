/**
 * Created by Ahmed on 5/13/2016.
 */
    "use strict";
let ItemRepo = require('../repos/itemRepository.js');
let MemberRepo = require('../repos/userRepository.js');
let Item = require("./Item.js");
let LoanedItem = require("./loanedItem.js");
let Member = require("./member.js");
let Staff = require("./staff.js");
let Student = require("./student.js");
let StaffAdmin = require("./staffAdmin.js");
let Recipt = require ("./recipt.js");

let Items = new Array();
let Members = new Array();
//let Recipt = new Array();

generateMembers(Members);
generateItems(Items);
showMembersList();
updateDB(Members,Items);

function generateMembers(Members){

    generateStudents(Members);
    generateStaff(Members);
    generateAdmin(Members);
}

function generateStudents(Members){
    //generates a list of students then adds them to the members list
    let student1 = new Student("1","Babiker","Elnimah","66190072","b.elnimah@gmail.com","babz","password","1");
    let student2 = new Student("2","Mohammad","Yasser","77874791","cool.mada#yahoo.com","bashoot","password","2");
    student1.addItem("3");
    student1.reserveItem("1");
    Members.push(student1);
    Members.push(student2);
}

function generateStaff(Members){
    //generates staff list then adds it to the members list
    let staff1 = new Staff("3","Yousef","Attata","55967571","youssef.abdo#gmail.com","joe","password","1");

    Members.push(staff1);

}

function generateAdmin(Members){
    //generates a admin then adds it the members list

    let admin = new StaffAdmin("5","Moutaz","Saleh","*******","m.saleh#gmail.com","admin","password",3);

    Members.push(admin);
}

function generateItems(Items){
    //generates a list of items
    let item1= new Item("1","The Hello And The World","2016","book");
    item1.reserveItem();
    let item2= new Item("2","The Hello And The World 2","2016","book");
    let item3= new LoanedItem("3","Time News","2016","magazine");
    let item4= new LoanedItem("4","Inception","2016","dvd");
    Items.push(item1);
    Items.push(item2);
    Items.push(item3);
    Items.push(item4);
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

function updateDB(Members, Items){
    //updates DB files with the members and items list.
    ItemRepo.addItemTest(Items);
    MemberRepo.addMemberTest(Members);
    console.log("Database Updated");

}

