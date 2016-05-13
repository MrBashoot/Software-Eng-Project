/**
 * Created by Ahmed on 5/13/2016.
 */
"use strict";
class item{

    var itemId,title,year,loaned,reserved,status;

    constructor (itemId,title,year){
        this.itemId = itemId;
        this.title = title;
        this.year = year;
        this.loaned = "no";
        this.reserved = "no";
        this.status = "available";
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

}
module.exports = new item();