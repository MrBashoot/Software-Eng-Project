/**
 * Created by Ahmed on 5/13/2016.
 */
    "use strict"
let item = require("./Item.js");
var item1 = new item("1","12","12","12");

let itemRepo = require('../repos/itemRepository.js');

let loanedItem = require("./loanedItem.js");
let item2 = new loanedItem(1,1,1,1);


itemRepo.addItemTest(item2);
itemRepo.getItemTest().then(item3 => {
    let item4 = new item(2,2,2,"book");
    console.log(item4.getMaxLoan());
});
console.log("borrowDate: " + item2.getBorrowDate());

