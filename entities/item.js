/**
 * Created by Ahmed on 5/13/2016.
 */
"use strict";
class Item{
    constructor (itemId,title,year,type,item) {
        if (!item) { // this if statement is put there to check if the caller wants to initiate the values from an object that came from a json file;
            this.itemId = itemId;
            this.title = title;
            this.year = year;
            this.loaned = "no";
            this.reserved = "no";
            this.status = "available";
            this.type = type;
            this.setMaxLoan(type);
        }

        else {
            this.itemId = item.itemId;
            this.title = item.title;
            this.year = item.year;
            this.loaned = item.loaned;
            this.reserved = item.reserved;
            this.status = item.status;
            this.type = item.type;
            this.MAX_LOAN = item.MAX_LOAN;
        }
    }

    setMaxLoan(type){
        if(type === "book"){
            this.MAX_LOAN = 4;
        }
        else {
            if (type == 'magazine') {
                this.MAX_LOAN = 2;
            }
            else {
                this.MAX_LOAN = 1;
            }
        }
    }

    getStatus(){
        return this.status;
    }

    changeStatus(status){
        this.status = status;
    }

    isLoaned (){
        return this.loaned;
    }

    loanItem (){
        this.status = 'unavailable';
        this.loaned = 'yes'
    }

    returnItem (){
        this.status = 'available';
        this.loaned = 'no'
    }

    reserveItem(){
        this.status = 'reserved';
        this.reserved = 'yes';
    }

    unreserveItem(){
        this.status = 'available';
        this.reserved = 'no';
    }

    isReserved(){
        return this.reserved;
    }

    getMaxLoan (){
        return this.MAX_LOAN;
    }

}
module.exports = Item;