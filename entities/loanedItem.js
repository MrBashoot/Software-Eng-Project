/**
 * Created by Ahmed on 5/13/2016.
 */
"use strict";

let item = require('./Item.js');

class loanedItem extends item {

    constructor(itemId,title,year,type,loanedItem){
        if(!loanedItem) 
        {
            super(itemId, title, year, type);
            this.setDates(super.getMaxLoan());
        }
        else{
            super(loanedItem.itemId, loanedItem.title , loanedItem.year ,loanedItem.type);
            this.dueDate = loanedItem.dueDate;
            this.borrowDate = loanedItem.borrowDate;
        }
    }

    setDates (MAX_LOAN){
        this.setDueDate(MAX_LOAN);
        this.setBorrowDate();
    }

    setDueDate(MAX_Loan){
        let addedDays = MAX_Loan *7;
        var date = new Date();
        date.setDate(date.getDate() + addedDays);//today date plus addedDays
        this.dueDate = this.dateFormater(date);
    }

    setBorrowDate(){
        this.borrowDate = this.dateFormater(new Date());
    }


    dateFormater(date) {
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
    }

    getDueDate(){
        return this.dueDate;
    }

    getBorrowDate(){
        return this.borrowDate;
    }

    calculateFine(returnDate){
        //Lacking Details In Use Case Specification
        //if the return date is after the due date the fine is calculated accordingly
        this.fine = 0;
    }


}
module.exports =loanedItem;